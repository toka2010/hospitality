import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { DataBaeModelName, jwtConstants } from "src/shared/constants";
import { UserSchema } from "./schemas/user.schema";
import { autoIncrement } from "mongoose-plugin-autoinc-fix";
import { PhoneRegistrationModule } from "src/phone-regesteration/phone-registration.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: DataBaeModelName.USER_MODEL,
        useFactory: () => {
          const schema = UserSchema;
          schema.plugin(autoIncrement, {
            field: "_id",
            startAt: 1,
            model: DataBaeModelName.USER_MODEL,
          });
          return schema;
        },
      },
    ]),
    PhoneRegistrationModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "6000s" },
    }),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
