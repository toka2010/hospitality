import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { SendOtpDto } from "./dtos/send-otp.dto";
import { VerifyOtpDto } from "./dtos/verify-otp.dto";
import { PhoneRegistrationService } from "./phone-registration.service";

@Controller("phone-registration")
@ApiTags("phone registration")
export class PhoneRegistrationController {
  constructor(private _phoneRegistrationService: PhoneRegistrationService) {}
  @Post("send/otp")
  async sendOtp(@Body() body: SendOtpDto) {
    return await this._phoneRegistrationService.sendOtp(body);
  }
  @Post("verify/otp")
  async verify(@Body() body: VerifyOtpDto) {
   return await this._phoneRegistrationService.verify(body)
  }
}
