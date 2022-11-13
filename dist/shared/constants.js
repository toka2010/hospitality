"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConstants = exports.AppRoles = exports.HttpErrors = exports.Errors = exports.DataBaeModelName = void 0;
var DataBaeModelName;
(function (DataBaeModelName) {
    DataBaeModelName["PHONE_REGISTRATIONS"] = "phone-registrations";
    DataBaeModelName["USER_MODEL"] = "users";
    DataBaeModelName["ADMIN_MODEL"] = "admins";
})(DataBaeModelName = exports.DataBaeModelName || (exports.DataBaeModelName = {}));
var Errors;
(function (Errors) {
    Errors["BadRequest"] = "BadRequest";
    Errors["Unauthenticated"] = "Unauthenticated";
    Errors["NotFound"] = "NotFound";
    Errors["InternalServerError"] = "InternalServerError";
    Errors["Conflict"] = "Conflict";
    Errors["UnProcessableEntity"] = "UnProcessableEntity";
    Errors["Forbidden"] = "Forbidden";
    Errors["TooManyRequests"] = "TooManyRequests";
})(Errors = exports.Errors || (exports.Errors = {}));
var HttpErrors;
(function (HttpErrors) {
    HttpErrors[HttpErrors["BadRequest"] = 400] = "BadRequest";
    HttpErrors[HttpErrors["Unauthenticated"] = 401] = "Unauthenticated";
    HttpErrors[HttpErrors["Forbidden"] = 403] = "Forbidden";
    HttpErrors[HttpErrors["NotFound"] = 404] = "NotFound";
    HttpErrors[HttpErrors["Conflict"] = 409] = "Conflict";
    HttpErrors[HttpErrors["UnProcessableEntity"] = 422] = "UnProcessableEntity";
    HttpErrors[HttpErrors["InternalServerError"] = 500] = "InternalServerError";
    HttpErrors[HttpErrors["TooManyRequests"] = 429] = "TooManyRequests";
})(HttpErrors = exports.HttpErrors || (exports.HttpErrors = {}));
var AppRoles;
(function (AppRoles) {
    AppRoles["ADMIN"] = "ADMIN";
    AppRoles["USER"] = "USER";
})(AppRoles = exports.AppRoles || (exports.AppRoles = {}));
exports.jwtConstants = {
    secret: 'secretKey',
};
//# sourceMappingURL=constants.js.map