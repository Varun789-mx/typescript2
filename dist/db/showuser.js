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
Object.defineProperty(exports, "__esModule", { value: true });
exports.showusers = showusers;
const config_1 = require("./config");
function showusers() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield (0, config_1.getclient)();
        const showquery = `SELECT * FROM paytmuser`;
        try {
            const showres = yield client.query(showquery);
            console.log("Show user working");
            for (let user of showres.rows) {
                console.log(`Email : ${user.email} Name: ${user.firstname} Mobile: ${user.mobile} `);
            }
        }
        catch (error) {
            console.error("Error in showing all the users");
        }
    });
}
showusers();
