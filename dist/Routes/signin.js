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
exports.signinroute = void 0;
const express_1 = require("express");
const zod_1 = __importDefault(require("zod"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../db/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWTSECRET = "securepass";
const Status_code_1 = require("./Status_code");
exports.signinroute = (0, express_1.Router)();
const signinbody = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string(),
});
function Checkuser(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const findres = yield finduser(email);
        if (!findres || findres === null || findres.rows.length === 0) {
            return false;
        }
        const hash = (_a = findres.rows[0]) === null || _a === void 0 ? void 0 : _a.password;
        if (!hash) {
            return false;
        }
        const match = yield bcrypt_1.default.compare(password, hash);
        if (!match) {
            return false;
        }
        return true;
    });
}
function finduser(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield (0, config_1.getclient)();
        try {
            const findquery = `SELECT password FROM paytmuser WHERE email = $1`;
            const findres = yield client.query(findquery, [email]);
            return findres;
        }
        catch (error) {
            console.error("An error occurred while fetching the user");
            return null;
        }
        finally {
            // No need to close the client as we are using a connection pool
        }
    });
}
exports.signinroute.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const safedata = signinbody.safeParse(userData);
        if (!safedata.success) {
            return res.status(Status_code_1.status_code.Bad_Request).json({
                msg: "Incorrect inputs",
                error: safedata.error,
            });
        }
        let verifyuser;
        try {
            verifyuser = yield Checkuser(safedata.data.email, safedata.data.password);
        }
        catch (error) {
            return res.status(Status_code_1.status_code.Internal_Server_Error).json({
                msg: "Error verifying user",
            });
        }
        if (!verifyuser) {
            return res.status(Status_code_1.status_code.Bad_Request).json({
                msg: "Incorrect email or password",
            });
        }
        if (safedata.success && safedata.data) {
            let token = jsonwebtoken_1.default.sign({ email: safedata.data.email }, JWTSECRET, { expiresIn: '1h' });
            return res.status(Status_code_1.status_code.Success).json({
                msg: "User logged in successfully",
                token: `Bearer ${token}`
            });
        }
        else {
            return res.status(Status_code_1.status_code.Bad_Request).json({
                msg: "Incorrect inputs",
                error: safedata
            });
        }
    }
    catch (error) {
        return res.status(Status_code_1.status_code.Internal_Server_Error).json({
            msg: "Request failed",
            error: error
        });
    }
}));
