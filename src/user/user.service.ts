import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { PhoneRegistrationService } from "src/phone-regesteration/phone-registration.service";
import { ApiErrors } from "src/shared/api-error";
import { AppRoles, DataBaeModelName } from "src/shared/constants";
import { CreateUserDto } from "./dtos/create-user.dto";
import { User } from "./schemas/user.schema";
import * as bycrbt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(DataBaeModelName.USER_MODEL) private _userModel: Model<User>,
    private readonly _phoneService: PhoneRegistrationService,
    private jwtService: JwtService
  ) {}

  async create(body: CreateUserDto) {
    if (body.phone) {
      await this.checkPhone(body.phone);
    }
    if (body.email) {
      await this.checkEmailDuplication(body.email);
    }
    body.password = await bycrbt.hash(body.password, 12);
    const user = await this._userModel.create({ ...body });
    const token = this.jwtService.sign({
      name: user.name,
      _id: user._id,
      loginAs: AppRoles.USER
    });
    return { user, accessToken: token };
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

  async findOne(query: FilterQuery<User>) {
    console.log(query);

    const user = await this._userModel.findOne(query);
    console.log(
      "🚀 ~ file: user.service.ts ~ line 48 ~ UserService ~ findOne ~ user",
      user
    );
    return user;
  }
}
