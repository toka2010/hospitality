/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { FilterQuery, Model } from "mongoose";
import { PhoneRegistrationService } from "src/phone-regesteration/phone-registration.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { User } from "./schemas/user.schema";
import { JwtService } from "@nestjs/jwt";
export declare class UserService {
    private _userModel;
    private readonly _phoneService;
    private jwtService;
    constructor(_userModel: Model<User>, _phoneService: PhoneRegistrationService, jwtService: JwtService);
    create(body: CreateUserDto): Promise<{
        user: import("mongoose").Document<unknown, any, User> & User & Required<{
            _id: number;
        }>;
        accessToken: string;
    }>;
    checkPhone(phone: string): Promise<void>;
    checkEmailDuplication(email: string): Promise<void>;
    findOne(query: FilterQuery<User>): Promise<import("mongoose").Document<unknown, any, User> & User & Required<{
        _id: number;
    }>>;
}
