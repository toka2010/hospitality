import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/user/dtos/create-user.dto";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {
  constructor(private readonly _userService: UserService) {}

  async signup(body: CreateUserDto) {
    return await this._userService.create(body);
  }
}
