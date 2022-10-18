import { Module } from "@nestjs/common";
import { APP_FILTER, APP_PIPE } from "@nestjs/core";
import { MongooseModule } from "@nestjs/mongoose";
import { Mongoose } from "mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PhoneRegistrationModule } from "./phone-regesteration/phone-registration.module";
import { AllExceptionsFilter } from "./shared/filter-exceptions";
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DefaultValidationPipe } from "./shared/default-validation";

@Module({
  imports: [
    MongooseModule.forRoot(
      "mongodb+srv://toqa:vDhZG3RgoBPLcHZR@cluster0.hlmg7.mongodb.net/hospitality?retryWrites=true&w=majority"
    ),
    PhoneRegistrationModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: AllExceptionsFilter }, //custom provider registration.
    { provide: APP_PIPE, useClass: DefaultValidationPipe },
  ],
})
export class AppModule {}
