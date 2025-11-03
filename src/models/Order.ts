import mongoose, { Schema, Document, Model } from "mongoose";

export interface OrderItem {
  _id: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface OrderDoc extends Document {
  orderID: string;
  items: OrderItem[];
  total: number;
  customer: {
    name: string;
    email?: string;
    phone?: string;
    address?: string;
  };
  status: "pending" | "paid" | "approved" | "shipped" | "cancelled";
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
    orderID: { type: String, unique: true },
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

// Pre-save hook to generate orderID
OrderSchema.pre<OrderDoc>("save", function (next) {
  if (!this.isNew) return next();

  const randomLetters = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  };

  const randomNumbers = () => Math.floor(1000 + Math.random() * 9000); // 4 digits

  this.orderID = `${randomLetters()}${randomNumbers()}`;
  next();
});

const Order: Model<OrderDoc> = mongoose.models.Order || mongoose.model<OrderDoc>("Order", OrderSchema);
export default Order;