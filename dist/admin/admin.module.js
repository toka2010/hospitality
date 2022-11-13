"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_plugin_autoinc_fix_1 = require("mongoose-plugin-autoinc-fix");
const constants_1 = require("../shared/constants");
const admin_controller_1 = require("./admin.controller");
const admin_service_1 = require("./admin.service");
const admin_schema_1 = require("./schemas/admin.schema");
let AdminModule = class AdminModule {
};
AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeatureAsync([
                {
                    name: constants_1.DataBaeModelName.ADMIN_MODEL,
                    useFactory: () => {
                        const Schema = admin_schema_1.AdminSchema;
                        Schema.plugin(mongoose_plugin_autoinc_fix_1.autoIncrement, {
                            field: "_id",
                            startAt: 1,
                            model: constants_1.DataBaeModelName.ADMIN_MODEL,
                        });
                        return Schema;
                    },
                },
            ]),
        ],
        controllers: [admin_controller_1.AdminController],
        providers: [admin_service_1.AdminMService],
        exports: [admin_service_1.AdminMService],
    })
], AdminModule);
exports.AdminModule = AdminModule;
//# sourceMappingURL=admin.module.js.map