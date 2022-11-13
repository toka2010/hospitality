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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../shared/constants");
const user_service_1 = require("../user/user.service");
const admin_service_1 = require("../admin/admin.service");
const bycrpt = require("bcryptjs");
const api_error_1 = require("../shared/api-error");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(_userService, _adminService, jwtService) {
        this._userService = _userService;
        this._adminService = _adminService;
        this.jwtService = jwtService;
    }
    async signup(body) {
        return await this._userService.create(body);
    }
    async login(dto) {
        const user = dto.loginAs == constants_1.AppRoles.USER
            ? await this._userService.findOne({
                $or: [{ phone: dto.userName }, { email: dto.userName }],
            })
            : await this._adminService.findOne({
                $or: [{ phone: dto.userName }, { email: dto.userName }],
            });
        if (user) {
            const isMatch = await bycrpt.compare(dto.password, user.password);
            if (!isMatch) {
                throw api_error_1.ApiErrors.Unauthenticated({
                    message: "Invalid username or password",
                });
            }
            const token = this.jwtService.sign({
                name: user.name,
                _id: user._id,
                loginAs: dto.loginAs,
            });
            return { user, accessToken: token };
        }
        else {
            throw api_error_1.ApiErrors.Unauthenticated({
                message: "Invalid username or password",
            });
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        admin_service_1.AdminMService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map