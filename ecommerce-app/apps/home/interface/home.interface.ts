/* eslint-disable prettier/prettier */
// home.interface.ts
import { Document } from 'mongoose';

export interface Favorite extends Document {
  userId: string;
  productId: string;
  createdAt: Date;
}

export interface TopOfferProduct extends Document {
  // Define the properties you need for top offer products
}
