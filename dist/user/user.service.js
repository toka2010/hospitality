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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const phone_registration_service_1 = require("../phone-regesteration/phone-registration.service");
const api_error_1 = require("../shared/api-error");
const constants_1 = require("../shared/constants");
const bycrbt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
let UserService = class UserService {
    constructor(_userModel, _phoneService, jwtService) {
        this._userModel = _userModel;
        this._phoneService = _phoneService;
        this.jwtService = jwtService;
    }
    async create(body) {
        if (body.phone) {
            await this.checkPhone(body.phone);
        }
        if (body.email) {
            await this.checkEmailDuplication(body.email);
        }
        body.password = await bycrbt.hash(body.password, 12);
        const user = await this._userModel.create(Object.assign({}, body));
        const token = this.jwtService.sign({
            name: user.name,
            _id: user._id,
            loginAs: constants_1.AppRoles.USER
        });
        return { user, accessToken: token };
    }
    async checkPhone(phone) {
        const phoneRegistration = await this._phoneService.findOne(phone);
        if (!phoneRegistration.verified) {
            throw api_error_1.ApiErrors.Conflict({ message: "this phone is not verified" });
        }
    }
    async checkEmailDuplication(email) {
        const user = await this._userModel.findOne({ email: email });
        if (user) {
            throw api_error_1.ApiErrors.BadRequest({ message: "this email already in use" });
        }
    }
    async findOne(query) {
        console.log(query);
        const user = await this._userModel.findOne(query);
        console.log("🚀 ~ file: user.service.ts ~ line 48 ~ UserService ~ findOne ~ user", user);
        return user;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(constants_1.DataBaeModelName.USER_MODEL)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        phone_registration_service_1.PhoneRegistrationService,
        jwt_1.JwtService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map