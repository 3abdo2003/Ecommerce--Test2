/* eslint-disable prettier/prettier */
// Product DTO

export class ProductDTO {
  readonly category: 'Standard Plastic Pallets' | 'Heavy-Duty Plastic Pallets' | 'Hygienic Plastic Pallets' | 'Nestable Plastic Pallets';
  readonly name: string;
  readonly description: string;
  readonly images: string[];
  readonly price: number;
  readonly originalPrice?: number;
  readonly discount?: number;
  readonly availability: boolean;
  readonly specifications: Map<string, string>;
  readonly customizableOptions: { label: string, options: string[] }[];
  topOffer: boolean;
}

  // DTO for adding a review to a product
  export class AddReviewDTO {
    readonly rating: number;
    readonly comment: string;
  }
  