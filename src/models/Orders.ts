import mongoose, { Schema, Document, Model } from "mongoose";

export interface OrderItem {
  _id: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface OrderDoc extends Document {
  items: OrderItem[];
  total: number;
  customer: {
    name: string;
    email?: string;
    phone?: string;
    address?: string;
  };
  status: "pending" | "paid" | "Approved" | "shipped" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<OrderItem>(
  {
    _id: { type: String, required: true },
    title: String,
    price: Number,
    quantity: Number,
    image: String,
  },
  { _id: false }
);

const OrderSchema = new Schema<OrderDoc>(
  {
    items: { type: [OrderItemSchema], required: true },
    total: { type: Number, required: true },
    customer: {
      name: { type: String, required: true },
      email: String,
      phone: String,
      address: String,
    },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

const Order: Model<OrderDoc> = mongoose.models.Order || mongoose.model<OrderDoc>("Order", OrderSchema);
export default Order;