import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { database } from "firebase-admin";
import { FilterQuery, Model } from "mongoose";
import { DataBaeModelName } from "src/shared/constants";
import { Admin } from "./schemas/admin.schema";
import * as bycrtpt from "bcryptjs";
import { ConfigService } from "@nestjs/config";
@Injectable()
export class AdminMService implements OnModuleInit {
  constructor(
    @InjectModel(DataBaeModelName.ADMIN_MODEL)
    private _adminModel: Model<Admin>,
    private configService: ConfigService
  ) {}
  async onModuleInit() {
    const admin:Admin = this.configService.get("admin", { infer: true });
    const adminExist = await this._adminModel.findOne({
      email: "admin@gmail.com",
    });
    if (!adminExist) {
      const hashPassword = await bycrtpt.hash(admin.password, 12);

      await this._adminModel.create({
        ...admin,
        password: hashPassword,
      });
    }
  }
  async findOne(query:FilterQuery<Admin>){
    const admin = await this._adminModel.findOne(query);
    return admin ;
  }
}
