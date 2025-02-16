"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const zod_1 = __importDefault(require("zod"));
const config_1 = require("../db/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Status_code_1 = require("./Status_code");
const Insertuser_1 = require("../db/Insertuser");
exports.userRouter = (0, express_1.Router)();
const jwtsecret = "samplestring";
const signupbody = zod_1.default.object({
    firstname: zod_1.default.string(),
    lastname: zod_1.default.string(),
    email: zod_1.default.string(),
    mobile: zod_1.default.string(),
    password: zod_1.default.string()
});
function ExistingUser(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const findquery = `SELECT EXISTS(SELECT 1 FROM paytmuser WHERE email = $1)`;
            const client = yield (0, config_1.getclient)();
            if (!client) {
                throw new Error("failed to get db client");
            }
            const result = yield client.query(findquery, [email]);
            return result.rows[0].exists;
        }
        catch (error) {
            console.error("Error in checking the email", error);
        }
    });
}
exports.userRouter.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ruff = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            mobile: req.body.mobile,
            password: req.body.password
        };
        const data = signupbody.safeParse(ruff);
        if (!data.success) {
            return res.status(Status_code_1.status_code.Bad_Request).json({
                msg: "Incorrect inputs",
                error: data.error.issues
            });
        }
        const prevuser = yield ExistingUser(ruff.email);
        if (prevuser.rows[0].exists) {
            return res.status(Status_code_1.status_code.Bad_Request).json({
                message: "User already exists",
            });
        }
        const userId = yield (0, Insertuser_1.createuser)(ruff);
        if (userId === undefined || userId === null) {
            return res.status(Status_code_1.status_code.Internal_Server_Error).json({
                msg: "Error in creating user"
            });
        }
        const token = jsonwebtoken_1.default.sign({ email: ruff.email }, jwtsecret);
        return res.status(Status_code_1.status_code.Success).json({
            msg: "user successfully created",
            userId: userId,
            token: `Bearer ${token}`
        });
    }
    catch (error) {
        console.error("Error in creating user", error);
        return res.status(Status_code_1.status_code.Internal_Server_Error).json({
            msg: "Error in creating user",
            error: error.message
        });
    }
}));
