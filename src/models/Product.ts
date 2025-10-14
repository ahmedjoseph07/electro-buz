import mongoose, { Schema, Document, models } from "mongoose";

export interface ProductDoc extends Document {
  _id: string; 
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

const ProductSchema = new Schema<ProductDoc>({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  category: { type: String },
}, { timestamps: true });

const Product = models.Product || mongoose.model<ProductDoc>("Product", ProductSchema);

export default Product;
