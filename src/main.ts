import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { OpenSocketIoAdapter } from "./websocketAdapter";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "*",
  });
  app.useWebSocketAdapter(new OpenSocketIoAdapter(app))
  await app.listen(1000);
}
bootstrap();
