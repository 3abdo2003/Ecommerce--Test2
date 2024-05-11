/* eslint-disable prettier/prettier */
import { HomeModule } from './home.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(HomeModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3002);
}
bootstrap().then(() => {
  console.log('Home service started');
});
