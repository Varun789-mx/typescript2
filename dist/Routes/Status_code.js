"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.status_code = void 0;
var status_code;
(function (status_code) {
    status_code[status_code["Success"] = 200] = "Success";
    status_code[status_code["Failed"] = 500] = "Failed";
    status_code[status_code["Not_Found"] = 404] = "Not_Found";
    status_code[status_code["Forbidden"] = 403] = "Forbidden";
    status_code[status_code["Bad_Request"] = 400] = "Bad_Request";
    status_code[status_code["Method_Not_Allowed"] = 405] = "Method_Not_Allowed";
    status_code[status_code["Request_timeout"] = 408] = "Request_timeout";
    status_code[status_code["Unauthorized"] = 401] = "Unauthorized";
    status_code[status_code["Internal_Server_Error"] = 401] = "Internal_Server_Error";
})(status_code || (exports.status_code = status_code = {}));
