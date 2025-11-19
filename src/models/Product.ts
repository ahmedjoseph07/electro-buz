import mongoose, { Schema, Document, models } from "mongoose";

export interface ProductDoc extends Document {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  featured: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  features?: string[];
  diagrams?: string[];
}

const ProductSchema = new Schema<ProductDoc>(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    image: { type: String },
    category: { type: String },
    stock: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    features: [{ type: String }], // list of product features
    diagrams: [{ type: String }], // list of image URLs for diagrams
  },
  { timestamps: true }
);

const Product =
  models.Product || mongoose.model<ProductDoc>("Product", ProductSchema);

export default Product;
