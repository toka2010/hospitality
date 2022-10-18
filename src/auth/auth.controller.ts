import { Body, Controller, Post, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { ImageInterceptor } from "src/shared/interceptors/image-interceptor";
import { CreateUserDto } from "src/user/dtos/create-user.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
@ApiTags("Auth")
export class AuthController {
  constructor(private _authService: AuthService) {}

  @Post("/signUp")
  @UseInterceptors(ImageInterceptor)
  @UseInterceptors(FileInterceptor("profileImage"))
  @ApiConsumes("multipart/form-data")
  async signUp(@Body() body: CreateUserDto) {
    return await this._authService.signup(body);
  }
}
