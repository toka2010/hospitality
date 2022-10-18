"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageInterceptor = void 0;
const common_1 = require("@nestjs/common");
const firebaseAdmin = require("firebase-admin");
const { v4: uuidv4 } = require("uuid");
const serviceAccount = require("../hospitality-d2417-firebase-adminsdk-fqypq-da24887b14.json");
const admin = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
});
const url_1 = require("url");
const sharp = require("sharp");
const storageRef = admin.storage().bucket(`gs://hospitality-d2417.appspot.com`);
let ImageInterceptor = class ImageInterceptor {
    async intercept(context, next) {
        const http = context.switchToHttp();
        const request = http.getRequest();
        const originalUrl = await this.uploadImageToStorage(request["file"]);
        const sharpObject = sharp(request["file"].buffer).resize({
            width: 140,
            height: 140,
            withoutEnlargement: true,
            fit: "inside",
        });
        const thumbnailUrl = await this.uploadImageToStorage(sharpObject.options.input);
        request.body["profileImage"] = {
            original: originalUrl,
            thumbnail: thumbnailUrl,
        };
        return next.handle().pipe();
    }
    uploadImageToStorage(file) {
        return new Promise((resolve, reject) => {
            if (!file) {
                reject("No image file");
            }
            let newFileName = uuidv4();
            let fileUpload = storageRef.file(newFileName);
            const blobStream = fileUpload.createWriteStream({
                metadata: {
                    contentType: file.mimetype,
                },
            });
            blobStream.on("error", (error) => {
                reject("Something is wrong! Unable to upload at the moment.");
            });
            blobStream.on("finish", () => {
                const url = (0, url_1.format)(`https://storage.googleapis.com/${storageRef.name}/${fileUpload.name}`);
                resolve(url);
            });
            blobStream.end(file.buffer);
        });
    }
};
ImageInterceptor = __decorate([
    (0, common_1.Injectable)()
], ImageInterceptor);
exports.ImageInterceptor = ImageInterceptor;
//# sourceMappingURL=image-interceptor.js.map