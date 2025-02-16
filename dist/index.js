"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const signup_1 = require("./Routes/signup");
const signin_1 = require("./Routes/signin");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use('/api', signup_1.userRouter);
app.use('/api', signin_1.signinroute);
app.listen(port, () => {
    console.log(`Server started on ${port} `);
});
