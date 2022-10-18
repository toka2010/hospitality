"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhoneRegistrationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const send_otp_dto_1 = require("./dtos/send-otp.dto");
const verify_otp_dto_1 = require("./dtos/verify-otp.dto");
const phone_registration_service_1 = require("./phone-registration.service");
let PhoneRegistrationController = class PhoneRegistrationController {
    constructor(_phoneRegistrationService) {
        this._phoneRegistrationService = _phoneRegistrationService;
    }
    async sendOtp(body) {
        return await this._phoneRegistrationService.sendOtp(body);
    }
    async verify(body) {
        return await this._phoneRegistrationService.verify(body);
    }
};
__decorate([
    (0, common_1.Post)("send/otp"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [send_otp_dto_1.SendOtpDto]),
    __metadata("design:returntype", Promise)
], PhoneRegistrationController.prototype, "sendOtp", null);
__decorate([
    (0, common_1.Post)("verify/otp"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verify_otp_dto_1.VerifyOtpDto]),
    __metadata("design:returntype", Promise)
], PhoneRegistrationController.prototype, "verify", null);
PhoneRegistrationController = __decorate([
    (0, common_1.Controller)("phone-registration"),
    (0, swagger_1.ApiTags)("phone registration"),
    __metadata("design:paramtypes", [phone_registration_service_1.PhoneRegistrationService])
], PhoneRegistrationController);
exports.PhoneRegistrationController = PhoneRegistrationController;
//# sourceMappingURL=phone-registration.controller.js.map