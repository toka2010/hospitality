"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiErrors = void 0;
const class_validator_1 = require("class-validator");
const constants_1 = require("./constants");
class ApiErrors extends Error {
    constructor({ errorType, message = [], param = [] }) {
        super();
        if (!(0, class_validator_1.isArray)(message))
            message = [message];
        if (!Array.isArray(param))
            param = [param];
        this.status = +constants_1.HttpErrors[errorType];
        this.param = param;
        this.message = message;
        this.name = this.name;
    }
    handle(req, res) {
        console.log(this.message);
        const errors = this.message.map((message) => {
            const result = { message };
            result.message = message;
            return result;
        });
        console.log(this.status);
        res.status(this.status || 500).json({
            error: {
                errors,
            },
        });
    }
}
exports.ApiErrors = ApiErrors;
ApiErrors.NotFound = (args) => new ApiErrors(Object.assign({ errorType: constants_1.Errors.NotFound }, args));
ApiErrors.BadRequest = (args) => new ApiErrors(Object.assign({ errorType: constants_1.Errors.BadRequest }, args));
ApiErrors.Conflict = (args) => new ApiErrors(Object.assign({ errorType: constants_1.Errors.Conflict }, args));
ApiErrors.Unauthenticated = (args) => new ApiErrors(Object.assign({ errorType: constants_1.Errors.Unauthenticated }, args));
ApiErrors.Forbidden = (args) => new ApiErrors(Object.assign({ errorType: constants_1.Errors.Forbidden }, args));
ApiErrors.UnProcessableEntity = (args) => new ApiErrors(Object.assign({ errorType: constants_1.Errors.UnProcessableEntity }, args));
//# sourceMappingURL=api-error.js.map