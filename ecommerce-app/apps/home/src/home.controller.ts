/* eslint-disable prettier/prettier */
// home.controller.ts
import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { HomeService } from './home.service';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Post('add-to-favorites')
  async addToFavorites(@Body() body: { userId: string; productId: string }): Promise<any> {
    const { userId, productId } = body;
    return await this.homeService.addToFavorites(userId, productId);
  }

  @Get('offers')
  async getTopOffers(): Promise<any[]> {
    return await this.homeService.getTopOffers();
  }
  
  @Get('products')
  async getProducts(): Promise<any[]> {
    return await this.homeService.getProducts();
  }

  @Post('products-categories')
  async getProductsCategories(@Body() body: { category: string }): Promise<any[]> {
    const { category } = body;
    return await this.homeService.getProductsByCategory(category);
  }
}

