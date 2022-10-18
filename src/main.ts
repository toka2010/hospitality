import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { Swagger } from "./shared/swagger";
import { ValidationPipe } from "@nestjs/common";
import { useContainer } from "class-validator";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  Swagger.setupSwagger(app);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(4200);
}
bootstrap();
