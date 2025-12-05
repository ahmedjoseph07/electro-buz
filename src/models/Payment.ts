import mongoose, { Schema, Document, Model } from "mongoose";

export interface PaymentDoc extends Document {
  trx_id: string;
  invoice_number: string;
  status: "SUCCESS" | "FAILED" | "CANCELLED";
  amount: number;
  method: string;
  customer_email?: string;
  createdAt: Date;
}

const PaymentSchema = new Schema<PaymentDoc>(
  {
    trx_id: { type: String, required: true, unique: true },
    invoice_number: { type: String, required: true },
    status: { type: String, enum: ["SUCCESS", "FAILED", "CANCELLED"], required: true },
    amount: { type: Number },
    method: { type: String, default: "PayStation" },
    customer_email: String,
  },
  { timestamps: true }
);

const Payment: Model<PaymentDoc> = mongoose.models.Payment || mongoose.model<PaymentDoc>("Payment", PaymentSchema);
export default Payment;
