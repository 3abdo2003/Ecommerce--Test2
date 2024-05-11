/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductSchema } from '../schema/product.schema';
import { KafkaModule } from '@app/common/kafka/kafka.module';
import { ProductConsumer} from '../../test.product';
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://mohamed:mohamed@cluster0.7jkva8p.mongodb.net/authentication-db?retryWrites=true&w=majority&appName=Cluster0',
    ),
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    KafkaModule,
  ],
  controllers: [ProductController],
  providers: [ProductService,ProductConsumer],
})
export class ProductModule {}
