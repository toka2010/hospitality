import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsPhoneNumber, IsString } from "class-validator";
import { AppRoles } from "src/shared/constants";

export class LoginDto{
    @ApiProperty()
    @IsString()
    userName:string;

    @ApiProperty()
    @IsString()
    password:string;


    @ApiProperty()
    @IsEnum(AppRoles)
    loginAs:string;
}