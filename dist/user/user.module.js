"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_controller_1 = require("./user.controller");
const mongoose_1 = require("@nestjs/mongoose");
const constants_1 = require("../shared/constants");
const user_schema_1 = require("./schemas/user.schema");
const mongoose_plugin_autoinc_fix_1 = require("mongoose-plugin-autoinc-fix");
const phone_registration_module_1 = require("../phone-regesteration/phone-registration.module");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeatureAsync([
                {
                    name: constants_1.DataBaeModelName.USER_MODEL,
                    useFactory: () => {
                        const schema = user_schema_1.UserSchema;
                        schema.plugin(mongoose_plugin_autoinc_fix_1.autoIncrement, {
                            field: "_id",
                            startAt: 1,
                            model: constants_1.DataBaeModelName.USER_MODEL,
                        });
                        return schema;
                    },
                },
            ]),
            phone_registration_module_1.PhoneRegistrationModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: constants_1.jwtConstants.secret,
                signOptions: { expiresIn: "6000s" },
            }),
        ],
        providers: [user_service_1.UserService],
        controllers: [user_controller_1.UserController],
        exports: [user_service_1.UserService],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map