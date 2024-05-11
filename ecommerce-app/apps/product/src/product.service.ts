/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../interfaces/product.interface';
import { ProductDTO, AddReviewDTO } from '../dto/product.dto';
import { Review } from '../interfaces/product.interface';
import { ProducerService } from '../../../libs/common/src/kafka/producer.service'; // Adjust the path as per your project structure

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
    private readonly producerService: ProducerService, // Inject the ProducerService
  ) {}

  async create(productDTO: ProductDTO): Promise<Product> {
    const { price, discount } = productDTO;
    
    // Calculate discounted price and percentage off
    let discountedPrice: number;
    let percentageOff: number;

    if (discount && discount > 0) {
        discountedPrice = price - (price * discount) / 100;
        percentageOff = discount;
    } else {
        discountedPrice = price;
        percentageOff = 0;
    }

    const createdProduct = new this.productModel({
        ...productDTO,
        discountedPrice,
        percentageOff,
        topOffer: discount && discount > 0 // Set topOffer based on discount
    });

    const savedProduct = await createdProduct.save();
    
    // Produce a Kafka message for product creation
    await this.producerService.produce({
        topic: 'product-created',
        messages: [{ value: JSON.stringify(savedProduct) }],
    });

    return savedProduct;
}

  async findAll(): Promise<Product[]> {
    return await this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Product> {
    return await this.productModel.findById(id).exec();
  }

  async addReview(id: string, addReviewDTO: AddReviewDTO): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    const review: Review = {
      user: '663ac91d34dd636bf56a3aa0', // You may need to replace 'userId' with the actual ID of the user
      rating: addReviewDTO.rating,
      comment: addReviewDTO.comment,
      createdAt: new Date()
    };
    product.reviews.push(review);
    const savedProduct = await product.save();
    
    // Produce a Kafka message for adding a review to the product
    await this.producerService.produce({
      topic: 'product-updated', // Assuming adding a review is considered an update
      messages: [{ value: JSON.stringify(savedProduct) }],
    });

    return savedProduct;
  }

  async findTopOffers(): Promise<Product[]> {
    const topOfferProducts = await this.productModel.find({ discount: { $exists: true, $ne: null, $gt: 0 } }).exec();
    for (const product of topOfferProducts) {
      product.topOffer = true; // Set topOffer as true
      await product.save();
    }
    return topOfferProducts;
  }
  
}
