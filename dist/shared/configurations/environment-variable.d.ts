import { ConfigService } from "@nestjs/config";
export interface EnvironmentVariable {
    admin: {
        name: string;
        email: string;
        phone: string;
        password: string;
    };
}
export declare type customConfig = ConfigService<EnvironmentVariable>;
