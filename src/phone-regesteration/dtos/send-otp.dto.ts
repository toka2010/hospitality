import { ApiProperty } from "@nestjs/swagger";
import { IsMobilePhone } from "class-validator";

export class SendOtpDto {
  @ApiProperty()
  @IsMobilePhone()
  phone: string;
}
