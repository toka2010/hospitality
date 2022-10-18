export declare type ApiErrorsArgs = {
    param?: string | Array<string>;
    message?: string | Array<string>;
};
export declare type ApiArgs = {
    param?: string | Array<string>;
    message?: string | Array<string>;
    errorType: string;
};
export declare class ApiErrors extends Error {
    message: string[] | any;
    param: Array<string>;
    name: string;
    status: number;
    constructor({ errorType, message, param }: ApiArgs);
    static NotFound: (args: ApiErrorsArgs) => ApiErrors;
    static BadRequest: (args: ApiErrorsArgs) => ApiErrors;
    static Conflict: (args: ApiErrorsArgs) => ApiErrors;
    static Unauthenticated: (args: ApiErrorsArgs) => ApiErrors;
    static Forbidden: (args: ApiErrorsArgs) => ApiErrors;
    static UnProcessableEntity: (args: ApiErrorsArgs) => ApiErrors;
    handle(req: any, res: any): void;
}
