/* eslint-disable prettier/prettier */
// home.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';
import { FavoriteSchema } from '../schema/home.schema';
import { KafkaModule } from '@app/common/kafka/kafka.module';
import { HomeConsumer} from '../../test.home';
import {ProductSchema} from 'apps/product/schema/product.schema'
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://mohamed:mohamed@cluster0.7jkva8p.mongodb.net/authentication-db?retryWrites=true&w=majority&appName=Cluster0',
    ),
    MongooseModule.forFeature([
      { name: 'Favorite', schema: FavoriteSchema },
      {name: 'Product', schema: ProductSchema}
      ]),
    KafkaModule,
  ],
  controllers: [HomeController],
  providers: [HomeService,HomeConsumer],
})
export class HomeModule {}

