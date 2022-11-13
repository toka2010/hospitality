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
import { OnModuleInit } from "@nestjs/common";
import { FilterQuery, Model } from "mongoose";
import { Admin } from "./schemas/admin.schema";
import { ConfigService } from "@nestjs/config";
export declare class AdminMService implements OnModuleInit {
    private _adminModel;
    private configService;
    constructor(_adminModel: Model<Admin>, configService: ConfigService);
    onModuleInit(): Promise<void>;
    findOne(query: FilterQuery<Admin>): Promise<import("mongoose").Document<unknown, any, Admin> & Admin & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
