/* eslint-disable prettier/prettier */
// home.schema.ts
/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const FavoriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  createdAt: { type: Date, default: Date.now }
});
