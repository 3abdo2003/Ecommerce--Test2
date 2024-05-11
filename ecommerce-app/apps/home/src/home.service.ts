/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Favorite } from '../interface/home.interface';
import { Product } from 'apps/product/interfaces/product.interface';
import { ProducerService } from '../../../libs/common/src/kafka/producer.service'; // Adjust the path as per your project structure

@Injectable()
export class HomeService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
    @InjectModel('Favorite') private readonly favoriteModel: Model<Favorite>,
    private readonly producerService: ProducerService,
  ) {}

  async getProducts(): Promise<Product[]> {
    return this.productModel.find().exec();
  }


  async getProductsByCategory(category: string): Promise<Product[]> {
    if (!category) {
      throw new BadRequestException('Category parameter is required.');
    }
    return this.productModel.find({ category }).exec();
  }

  async addToFavorites(userId: string, productId: string): Promise<Favorite> {
    const favorite = new this.favoriteModel({ userId, productId });
    return await favorite.save();
  }

  async getTopOffers(): Promise<Product[]> {
    return await this.productModel.find({ topOffer: true }).exec();
  }
}
