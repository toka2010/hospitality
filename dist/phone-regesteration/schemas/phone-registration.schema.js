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
exports.PhoneRegistrationSchema = exports.PhoneRegistration = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let PhoneRegistration = class PhoneRegistration {
};
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], PhoneRegistration.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], PhoneRegistration.prototype, "otp", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], PhoneRegistration.prototype, "verified", void 0);
PhoneRegistration = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: {
            transform: (doc, ret, option) => {
                ret.id = ret._id;
                delete ret._id;
                delete ret.deleted;
                delete ret.__v;
            },
        },
    })
], PhoneRegistration);
exports.PhoneRegistration = PhoneRegistration;
exports.PhoneRegistrationSchema = mongoose_1.SchemaFactory.createForClass(PhoneRegistration);
//# sourceMappingURL=phone-registration.schema.js.map