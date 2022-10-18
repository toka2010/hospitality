"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("./shared/swagger");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    swagger_1.Swagger.setupSwagger(app);
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.listen(4200);
}
bootstrap();
//# sourceMappingURL=main.js.map