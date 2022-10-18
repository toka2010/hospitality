import { isArray } from "class-validator";
import { Errors, HttpErrors } from "./constants";

export type ApiErrorsArgs = {
  param?: string | Array<string>;
  message?: string | Array<string>;
};
export type ApiArgs = {
  param?: string | Array<string>;
  message?: string | Array<string>;
  errorType: string;
};
export class ApiErrors extends Error {
  message: string[] | any;
  param: Array<string>;
  name: string;
  status: number;

  constructor({ errorType, message = [], param = [] }: ApiArgs) {
    super();

    if (!isArray(message)) message = [message as string];
    if (!Array.isArray(param)) param = [param];
    this.status = +HttpErrors[errorType];
    this.param = param;
    this.message = message;
    this.name = this.name;
  }
  static NotFound = (args: ApiErrorsArgs) =>
    new ApiErrors({ errorType: Errors.NotFound, ...args });

  static BadRequest = (args: ApiErrorsArgs) =>
    new ApiErrors({ errorType: Errors.BadRequest, ...args });

  static Conflict = (args: ApiErrorsArgs) =>
    new ApiErrors({ errorType: Errors.Conflict, ...args });

  static Unauthenticated = (args: ApiErrorsArgs) =>
    new ApiErrors({ errorType: Errors.Unauthenticated, ...args });

  static Forbidden = (args: ApiErrorsArgs) =>
    new ApiErrors({ errorType: Errors.Forbidden, ...args });

  static UnProcessableEntity = (args: ApiErrorsArgs) =>
    new ApiErrors({ errorType: Errors.UnProcessableEntity, ...args });

  handle(req, res) {
    console.log(this.message);
    const errors = this.message.map((message: string) => {
      const result: any = { message };
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
