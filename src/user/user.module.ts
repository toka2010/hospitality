import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { DataBaeModelName } from "src/shared/constants";
import { UserSchema } from "./schemas/user.schema";
import { autoIncrement } from "mongoose-plugin-autoinc-fix";
import { PhoneRegistrationModule } from "src/phone-regesteration/phone-registration.module";

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
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
