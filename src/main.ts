import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  const logger = new Logger();
  const port = 3001;
  await app.listen(port);
  logger.log(`Server Start Port ${port}`);
}
bootstrap();
