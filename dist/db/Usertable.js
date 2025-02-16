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
const config_1 = require("./config");
function createtable() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield (0, config_1.getclient)();
        const createusertable = `
   CREATE TABLE IF NOT EXISTS paytmuser (
     id SERIAL PRIMARY KEY,
     firstname VARCHAR(255) NOT NULL,
     lastname VARCHAR(255) NOT NULL,
     email VARCHAR(255) UNIQUE NOT NULL,
     mobile VARCHAR(12) NOT NULL,
     password VARCHAR(255) NOT NULL
   );`;
        try {
            yield client.query(createusertable);
            console.log("Table succesfully created");
        }
        catch (error) {
            console.error("Error in creating the table", error);
        }
    });
}
createtable();
