import { CreateUserDto } from "src/user/dtos/create-user.dto";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dtos/login.dto";
export declare class AuthController {
    private _authService;
    constructor(_authService: AuthService);
    signUp(body: CreateUserDto): Promise<{
        user: import("mongoose").Document<unknown, any, import("../user/schemas/user.schema").User> & import("../user/schemas/user.schema").User & Required<{
            _id: number;
        }>;
        accessToken: string;
    }>;
    signIn(body: LoginDto): Promise<{
        user: (import("mongoose").Document<unknown, any, import("../user/schemas/user.schema").User> & import("../user/schemas/user.schema").User & Required<{
            _id: number;
        }>) | (import("mongoose").Document<unknown, any, import("../admin/schemas/admin.schema").Admin> & import("../admin/schemas/admin.schema").Admin & {
            _id: import("mongoose").Types.ObjectId;
        });
        accessToken: string;
    }>;
}
