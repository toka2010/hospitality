import { Module } from "@nestjs/common";
import { PhoneRegistrationService } from "./phone-registration.service";
import { PhoneRegistrationController } from "./phone-registration.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { DataBaeModelName } from "src/shared/constants";
import { PhoneRegistrationSchema } from "./schemas/phone-registration.schema";
import { autoIncrement } from "mongoose-plugin-autoinc-fix";

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: DataBaeModelName.PHONE_REGISTRATIONS,
        useFactory: () => {
          const Schema = PhoneRegistrationSchema;
          Schema.plugin(autoIncrement, {
            field: "_id",
            startAt: 1,
            model: DataBaeModelName.PHONE_REGISTRATIONS,
          });
          return Schema;
        },
      },
    ]),
  ],
  providers: [PhoneRegistrationService],
  controllers: [PhoneRegistrationController],
  exports: [PhoneRegistrationService],
})
export class PhoneRegistrationModule {}
