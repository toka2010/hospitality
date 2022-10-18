"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhoneRegistrationModule = void 0;
const common_1 = require("@nestjs/common");
const phone_registration_service_1 = require("./phone-registration.service");
const phone_registration_controller_1 = require("./phone-registration.controller");
const mongoose_1 = require("@nestjs/mongoose");
const constants_1 = require("../shared/constants");
const phone_registration_schema_1 = require("./schemas/phone-registration.schema");
const mongoose_plugin_autoinc_fix_1 = require("mongoose-plugin-autoinc-fix");
let PhoneRegistrationModule = class PhoneRegistrationModule {
};
PhoneRegistrationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeatureAsync([
                {
                    name: constants_1.DataBaeModelName.PHONE_REGISTRATIONS,
                    useFactory: () => {
                        const Schema = phone_registration_schema_1.PhoneRegistrationSchema;
                        Schema.plugin(mongoose_plugin_autoinc_fix_1.autoIncrement, {
                            field: "_id",
                            startAt: 1,
                            model: constants_1.DataBaeModelName.PHONE_REGISTRATIONS,
                        });
                        return Schema;
                    },
                },
            ]),
        ],
        providers: [phone_registration_service_1.PhoneRegistrationService],
        controllers: [phone_registration_controller_1.PhoneRegistrationController],
        exports: [phone_registration_service_1.PhoneRegistrationService],
    })
], PhoneRegistrationModule);
exports.PhoneRegistrationModule = PhoneRegistrationModule;
//# sourceMappingURL=phone-registration.module.js.map