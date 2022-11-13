import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { autoIncrement } from "mongoose-plugin-autoinc-fix";
import { DataBaeModelName } from "src/shared/constants";
import { AdminController } from "./admin.controller";
import { AdminMService } from "./admin.service";
import { AdminSchema } from "./schemas/admin.schema";

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: DataBaeModelName.ADMIN_MODEL,
        useFactory: () => {
          const Schema = AdminSchema;
          Schema.plugin(autoIncrement, {
            field: "_id",
            startAt: 1,
            model: DataBaeModelName.ADMIN_MODEL,
          });
          return Schema;
        },
      },
    ]),
    // ConfigModule
  ],

  controllers: [AdminController],
  providers: [AdminMService],
  exports: [AdminMService],
})
export class AdminModule {}
