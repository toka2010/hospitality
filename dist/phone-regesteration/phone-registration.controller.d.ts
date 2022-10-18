import { SendOtpDto } from "./dtos/send-otp.dto";
import { VerifyOtpDto } from "./dtos/verify-otp.dto";
import { PhoneRegistrationService } from "./phone-registration.service";
export declare class PhoneRegistrationController {
    private _phoneRegistrationService;
    constructor(_phoneRegistrationService: PhoneRegistrationService);
    sendOtp(body: SendOtpDto): Promise<void>;
    verify(body: VerifyOtpDto): Promise<void>;
}
