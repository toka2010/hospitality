"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Swagger = void 0;
const swagger_1 = require("@nestjs/swagger");
class Swagger {
    static setupSwagger(app) {
        const options = new swagger_1.DocumentBuilder()
            .setTitle("hospitality")
            .setDescription("")
            .setVersion("1.0")
            .addTag("hospitality")
            .addBearerAuth()
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, options, {
            ignoreGlobalPrefix: true,
        });
        swagger_1.SwaggerModule.setup("/api", app, document, {});
    }
}
exports.Swagger = Swagger;
//# sourceMappingURL=swagger.js.map