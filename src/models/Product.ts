import mongoose, { Schema, Document, models } from "mongoose";
import slugify from "slugify";

export interface ProductDoc extends Document {
  _id: string;
  title: string;
  slug: string;
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
    slug: { type: String, required: true, unique: true },
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

ProductSchema.pre("validate", function (next) {
  if (this.title && !this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

const Product =
  models.Product || mongoose.model<ProductDoc>("Product", ProductSchema);

export default Product;
