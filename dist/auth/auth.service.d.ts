import { CreateUserDto } from "src/user/dtos/create-user.dto";
import { UserService } from "src/user/user.service";
import { AdminMService } from "../admin/admin.service";
import { LoginDto } from "./dtos/login.dto";
import { JwtService } from "@nestjs/jwt";
export declare class AuthService {
    private readonly _userService;
    private readonly _adminService;
    private jwtService;
    constructor(_userService: UserService, _adminService: AdminMService, jwtService: JwtService);
    signup(body: CreateUserDto): Promise<{
        user: import("mongoose").Document<unknown, any, import("../user/schemas/user.schema").User> & import("../user/schemas/user.schema").User & Required<{
            _id: number;
        }>;
        accessToken: string;
    }>;
    login(dto: LoginDto): Promise<{
        user: (import("mongoose").Document<unknown, any, import("../user/schemas/user.schema").User> & import("../user/schemas/user.schema").User & Required<{
            _id: number;
        }>) | (import("mongoose").Document<unknown, any, import("../admin/schemas/admin.schema").Admin> & import("../admin/schemas/admin.schema").Admin & {
            _id: import("mongoose").Types.ObjectId;
        });
        accessToken: string;
    }>;
}
