export declare enum DataBaeModelName {
    PHONE_REGISTRATIONS = "phone-registrations",
    USER_MODEL = "users",
    ADMIN_MODEL = "admins"
}
export declare enum Errors {
    BadRequest = "BadRequest",
    Unauthenticated = "Unauthenticated",
    NotFound = "NotFound",
    InternalServerError = "InternalServerError",
    Conflict = "Conflict",
    UnProcessableEntity = "UnProcessableEntity",
    Forbidden = "Forbidden",
    TooManyRequests = "TooManyRequests"
}
export declare enum HttpErrors {
    BadRequest = 400,
    Unauthenticated = 401,
    Forbidden = 403,
    NotFound = 404,
    Conflict = 409,
    UnProcessableEntity = 422,
    InternalServerError = 500,
    TooManyRequests = 429
}
export declare enum AppRoles {
    ADMIN = "ADMIN",
    USER = "USER"
}
export declare const APP_FILTER = "APP_FILTER";
export declare const jwtConstants: {
    secret: string;
};
