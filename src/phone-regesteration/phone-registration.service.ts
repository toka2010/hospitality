import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Send } from "express";
import { Model } from "mongoose";
import { ApiErrors } from "src/shared/api-error";
import { DataBaeModelName } from "src/shared/constants";
import { SendOtpDto } from "./dtos/send-otp.dto";
import { PhoneRegistration } from "./schemas/phone-registration.schema";
import * as generator from "password-generator";
import * as slackNotify from "slack-notify";
import { VerifyOtpDto } from "./dtos/verify-otp.dto";
const MY_SLACK_WEBHOOK_URL =
  "https://hooks.slack.com/services/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";
let slack = require("slack-notify")(MY_SLACK_WEBHOOK_URL);

@Injectable()
export class PhoneRegistrationService {
  constructor(
    @InjectModel(DataBaeModelName.PHONE_REGISTRATIONS)
    private _PhoneRegistrationModel: Model<PhoneRegistration>
  ) {}
  async sendOtp(body: SendOtpDto) {
    const phone = await this._PhoneRegistrationModel.findOne({
      phone: body.phone,
      verified: true,
    });
    if (phone) {
      throw ApiErrors.Conflict({ message: "this phone is already verified" });
    }
    const otp = generator(4, false, /\d/);
  
      await this._slackNotifier(body.phone, otp);
 
    await this._PhoneRegistrationModel.updateOne(
      { phone: body.phone },
      { otp: otp },
      { upsert: true }
    );
  }

  private async _slackNotifier(parsedPhone: string, code: string) {
    await slack.send({
      channel: "#hospitality-message",
      text: ` user with phone : ${parsedPhone} , verifyCode is ${code}`,
      username: "hospitality Messaging Service",
    });
  }

  async verify(body: VerifyOtpDto) {
    const phoneRegistration = await this._PhoneRegistrationModel.findOne({
      phone: body.phone,
    });
    if (!phoneRegistration) {
      throw ApiErrors.NotFound({ message: "phone not found" });
    }
    if (phoneRegistration.verified) {
      throw ApiErrors.NotFound({ message: "this phone already verified" });
    }

    if (phoneRegistration.otp != body.otp) {
      throw ApiErrors.BadRequest({ message: "wrong otp " });
    }
    await this._PhoneRegistrationModel.findOneAndUpdate(
      {
        phone: body.phone,
      },
      {
        verified: true,
      },
      { new: true }
    );
  }

  async findOne(phone: string) {
    const phoneRegistration = await this._PhoneRegistrationModel.findOne({
      phone: phone,
    });
    if (!phoneRegistration) {
      throw ApiErrors.NotFound({ message: "phone not verified" });
    }
    return phoneRegistration;
  }
}
