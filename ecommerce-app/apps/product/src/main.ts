/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { ProductModule } from './product.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ProductModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3003);
}
bootstrap().then(() => {
  console.log('Product service started');
});
