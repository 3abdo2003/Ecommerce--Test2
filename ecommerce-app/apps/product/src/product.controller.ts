/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDTO, AddReviewDTO } from '../dto/product.dto';
import { Product } from '../interfaces/product.interface';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() productDTO: ProductDTO): Promise<Product> {
    return await this.productService.create(productDTO);
  }

  @Get('top-offers') // Define 'top-offers' route before any route with dynamic parameters
  async findTopOffers(): Promise<Product[]> {
      return await this.productService.findTopOffers();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    return await this.productService.findOne(id);
  }

  @Post(':id/reviews')
  async addReview(@Param('id') id: string, @Body() addReviewDTO: AddReviewDTO): Promise<Product> {
    return await this.productService.addReview(id, addReviewDTO);
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return await this.productService.findAll();
  }
}

