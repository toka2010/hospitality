import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
const firebaseAdmin = require("firebase-admin");
const { v4: uuidv4 } = require("uuid");
//importing our creditions.json file,
import * as serviceAccount from "../hospitality-d2417-firebase-adminsdk-fqypq-da24887b14.json";
const admin = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});
import { format } from "url";
import * as sharp from "sharp";

//#create-a-storage-refrence
const storageRef = admin.storage().bucket(`gs://hospitality-d2417.appspot.com`);
@Injectable()
export class ImageInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler) {
    const http = context.switchToHttp();
    const request = http.getRequest<Request>();
    const originalUrl = await this.uploadImageToStorage(request["file"]);

    const sharpObject = sharp(request["file"].buffer).resize({
      width: 140,
      height: 140,
      withoutEnlargement: true,
      fit: "inside",
    });
    //
    const thumbnailUrl = await this.uploadImageToStorage(
      sharpObject.options.input
    );
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
        // The public URL can be used to directly access the file via HTTP.
        const url = format(
          `https://storage.googleapis.com/${storageRef.name}/${fileUpload.name}`
        );
        resolve(url);
      });

      blobStream.end(file.buffer);
    });
  }
}
