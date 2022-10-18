import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PhoneRegistrationService } from "src/phone-regesteration/phone-registration.service";
import { ApiErrors } from "src/shared/api-error";
import { DataBaeModelName } from "src/shared/constants";
import { CreateUserDto } from "./dtos/create-user.dto";
import { User } from "./schemas/user.schema";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(DataBaeModelName.USER_MODEL) private _userModel: Model<User>,
    private readonly _phoneService: PhoneRegistrationService
  ) {}

  async create(body: CreateUserDto) {
    if (body.phone) {
      await this.checkPhone(body.phone);
    }
    if (body.email) {
      await this.checkEmailDuplication(body.email);
    }

    const user = await this._userModel.create({ ...body });
    return user;
  }
  async checkPhone(phone: string) {
    const phoneRegistration = await this._phoneService.findOne(phone);
    if (!phoneRegistration.verified) {
      throw ApiErrors.Conflict({ message: "this phone is not verified" });
    }
  }
  async checkEmailDuplication(email: string) {
    const user = await this._userModel.findOne({ email: email });

    if (user) {
      throw ApiErrors.BadRequest({ message: "this email already in use" });
    }
  }
}
