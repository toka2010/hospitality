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
exports.PhoneRegistrationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const api_error_1 = require("../shared/api-error");
const constants_1 = require("../shared/constants");
const generator = require("password-generator");
const MY_SLACK_WEBHOOK_URL = "https://hooks.slack.com/services/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";
let slack = require("slack-notify")(MY_SLACK_WEBHOOK_URL);
let PhoneRegistrationService = class PhoneRegistrationService {
    constructor(_PhoneRegistrationModel) {
        this._PhoneRegistrationModel = _PhoneRegistrationModel;
    }
    async sendOtp(body) {
        const phone = await this._PhoneRegistrationModel.findOne({
            phone: body.phone,
            verified: true,
        });
        if (phone) {
            throw api_error_1.ApiErrors.Conflict({ message: "this phone is already verified" });
        }
        const otp = generator(4, false, /\d/);
        await this._slackNotifier(body.phone, otp);
        await this._PhoneRegistrationModel.updateOne({ phone: body.phone }, { otp: otp }, { upsert: true });
    }
    async _slackNotifier(parsedPhone, code) {
        await slack.send({
            channel: "#hospitality-message",
            text: ` user with phone : ${parsedPhone} , verifyCode is ${code}`,
            username: "hospitality Messaging Service",
        });
    }
    async verify(body) {
        const phoneRegistration = await this._PhoneRegistrationModel.findOne({
            phone: body.phone,
        });
        if (!phoneRegistration) {
            throw api_error_1.ApiErrors.NotFound({ message: "phone not found" });
        }
        if (phoneRegistration.verified) {
            throw api_error_1.ApiErrors.NotFound({ message: "this phone already verified" });
        }
        if (phoneRegistration.otp != body.otp) {
            throw api_error_1.ApiErrors.BadRequest({ message: "wrong otp " });
        }
        await this._PhoneRegistrationModel.findOneAndUpdate({
            phone: body.phone,
        }, {
            verified: true,
        }, { new: true });
    }
    async findOne(phone) {
        const phoneRegistration = await this._PhoneRegistrationModel.findOne({
            phone: phone,
        });
        if (!phoneRegistration) {
            throw api_error_1.ApiErrors.NotFound({ message: "phone not verified" });
        }
        return phoneRegistration;
    }
};
PhoneRegistrationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(constants_1.DataBaeModelName.PHONE_REGISTRATIONS)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PhoneRegistrationService);
exports.PhoneRegistrationService = PhoneRegistrationService;
//# sourceMappingURL=phone-registration.service.js.map