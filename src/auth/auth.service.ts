import { Injectable } from "@nestjs/common";
import { AppRoles } from "src/shared/constants";
import { CreateUserDto } from "src/user/dtos/create-user.dto";
import { UserService } from "src/user/user.service";
import { AdminMService } from "../admin/admin.service";
import { LoginDto } from "./dtos/login.dto";
import * as bycrpt from "bcryptjs";
import { ApiErrors } from "src/shared/api-error";
import { JwtService } from "@nestjs/jwt";
import { use } from "passport";

@Injectable()
export class AuthService {
  constructor(
    private readonly _userService: UserService,
    private readonly _adminService: AdminMService,
    private jwtService: JwtService
  ) {}

  async signup(body: CreateUserDto) {
    return await this._userService.create(body);
  }

  async login(dto: LoginDto) {

    const user =
      dto.loginAs == AppRoles.USER
        ? await this._userService.findOne({
            $or: [{ phone: dto.userName }, { email: dto.userName }],
          })
        : await this._adminService.findOne({
            $or: [{ phone: dto.userName }, { email: dto.userName }],
          });


    if (user) {
      const isMatch = await bycrpt.compare(dto.password, user.password);
  
      if (!isMatch) {
        throw ApiErrors.Unauthenticated({
          message: "Invalid username or password",
        });
      }
  
      const token = this.jwtService.sign({
        name: user.name,
        _id: user._id,
        loginAs: dto.loginAs,
      });
      return { user, accessToken: token };
    } else {
      throw ApiErrors.Unauthenticated({
        message: "Invalid username or password",
      });
    }
  }
}
