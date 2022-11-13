import { ConfigService } from "@nestjs/config";
import { type } from "os";

export interface EnvironmentVariable {
  admin: {
    name: string;
    email: string;
    phone: string;
    password: string;
  };
}
export type customConfig = ConfigService<EnvironmentVariable>;
