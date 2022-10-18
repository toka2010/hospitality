"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const api_error_1 = require("./api-error");
class DefaultValidationPipe extends common_1.ValidationPipe {
    constructor(overwriteDefaultOptions = {}) {
        super(Object.assign({ transform: true, forbidUnknownValues: true, whitelist: true, validationError: { target: false }, transformOptions: { enableImplicitConversion: true }, exceptionFactory: (errors) => {
                const args = { param: [], message: [] };
                transformErrors(args, errors);
                return api_error_1.ApiErrors.UnProcessableEntity(args);
            } }, overwriteDefaultOptions));
    }
    async transform(value, metadata) {
        if (metadata.metatype && metadata.metatype.transformer) {
            value = metadata.metatype.transformer(value);
        }
        return await super.transform(value, metadata);
    }
}
exports.DefaultValidationPipe = DefaultValidationPipe;
function transformErrors(args, errors, parentProperty = '') {
    for (const error of errors) {
        const property = parentProperty
            ? `${parentProperty}.${error.property}`
            : error.property;
        if (error.constraints) {
            args.message.push(error.constraints);
            args.param.push(property);
        }
        if (error.children && error.children.length > 0) {
            transformErrors(args, error.children, property);
        }
    }
}
//# sourceMappingURL=default-validation.js.map