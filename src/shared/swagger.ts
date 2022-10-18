import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
export class Swagger {
  static setupSwagger(app: INestApplication) {
    const options = new DocumentBuilder()
      .setTitle("hospitality")
      .setDescription("")
      .setVersion("1.0")
      .addTag("hospitality")
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options, {
      ignoreGlobalPrefix: true,
    });
    SwaggerModule.setup("/api", app, document, {
      // swaggerOptions: {
      //   displayRequestDuration: true,
      // },
    });
  }
}
