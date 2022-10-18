"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
const api_error_1 = require("./api-error");
let AllExceptionsFilter = class AllExceptionsFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        let message = "", status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        if (exception instanceof api_error_1.ApiErrors) {
            return exception.handle(request, response);
        }
        else if (exception instanceof common_1.HttpException) {
            message += exception.message;
            status = exception.getStatus();
        }
        else if (exception.name === "AccessControlError") {
            message += "Forbidden Resource";
            status = common_1.HttpStatus.FORBIDDEN;
        }
        else {
            message += exception.message;
        }
        response.status(status).json({
            error: {
                errors: [
                    {
                        message,
                    },
                ],
            },
        });
        if (process.env.NODE_ENV !== "testing") {
            console.log("Server Response With An Error:\n", exception);
        }
    }
};
AllExceptionsFilter = __decorate([
    (0, common_1.Catch)()
], AllExceptionsFilter);
exports.AllExceptionsFilter = AllExceptionsFilter;
//# sourceMappingURL=filter-exceptions.js.map