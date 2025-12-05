import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import Payment from "@/models/Payment";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    let status = searchParams.get("status");
    const invoice_number = searchParams.get("invoice_number") || searchParams.get("tran_id");
    const trx_id = searchParams.get("trx_id") || `trx_${Date.now()}`;
    const amount = Number(searchParams.get("amount")) || 0;

    if (!invoice_number) {
      return NextResponse.json({
        success: false,
        message: "Missing invoice number / tran_id",
      });
    }

    status = status !== null? status.toUpperCase(): status ;

    if (status === "SUCCESS" || status === "SUCCESSFUL") {
      // Mark order as paid
      const order = await Order.findOneAndUpdate(
        { orderID: invoice_number },
        { status: "paid" },
        { new: true }
      );

      if (!order) {
        console.error("Order not found for invoice:", invoice_number);
        return NextResponse.json({ success: false, message: "Order not found" });
      }

      // Create payment record
      await Payment.create({
        trx_id,
        invoice_number,
        status: "SUCCESS",
        amount: order.total,
        method: "PayStation",
        customer_email: order.customer.email || "unknown",
      });

      console.log("Payment recorded for order:", order.orderID);

      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/payment-status?status=success&orderId=${invoice_number}`
      );
    }

    // FAILED / CANCELED
    await Order.findOneAndUpdate(
      { orderID: invoice_number },
      { status: status === "FAILED" ? "cancelled" : "cancelled" }
    );

    await Payment.create({
      trx_id,
      invoice_number,
      status: status === "FAILED" ? "FAILED" : "CANCELLED",
      amount,
      method: "PayStation",
    });

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/cart?status=${status}`
    );
  } catch (error) {
    console.error("Payment callback error:", error);
    return NextResponse.json({ success: false, message: "Payment callback failed" });
  }
}
