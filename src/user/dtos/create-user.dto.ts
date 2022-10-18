import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";
import { Image } from "../schemas/image-schema";

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiPropertyOptional()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({ type: String })
  @IsString()
  password: string;

  @ApiProperty({ type: "file" })
  @IsNotEmpty()
  profileImage: Image;

  static transformer(dto: CreateUserDto) {
    console.log(dto);
    return dto;
  }
}
