"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminMService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const constants_1 = require("../shared/constants");
const bycrtpt = require("bcryptjs");
const config_1 = require("@nestjs/config");
let AdminMService = class AdminMService {
    constructor(_adminModel, configService) {
        this._adminModel = _adminModel;
        this.configService = configService;
    }
    async onModuleInit() {
        const admin = this.configService.get("admin", { infer: true });
        const adminExist = await this._adminModel.findOne({
            email: "admin@gmail.com",
        });
        if (!adminExist) {
            const hashPassword = await bycrtpt.hash(admin.password, 12);
            await this._adminModel.create(Object.assign(Object.assign({}, admin), { password: hashPassword }));
        }
    }
    async findOne(query) {
        const admin = await this._adminModel.findOne(query);
        return admin;
    }
};
AdminMService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(constants_1.DataBaeModelName.ADMIN_MODEL)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        config_1.ConfigService])
], AdminMService);
exports.AdminMService = AdminMService;
//# sourceMappingURL=admin.service.js.map