import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Orders";


export const POST = async (req: NextRequest) => {
  try {
    await connectDB();
    const body = await req.json();

    const { items, total, customer } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { message: "No items in order" },
        { status: 400 }
      );
    }

    if (!customer?.name || !customer?.address) {
      return NextResponse.json(
        { message: "Customer name and address are required" },
        { status: 400 }
      );
    }

    const newOrder = await Order.create({
      items,
      total,
      customer,
      status: "pending",
    });

    return NextResponse.json(
      { message: "Order created successfully", orderId: newOrder._id, order:newOrder },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { message: "Failed to create order" },
      { status: 500 }
    );
  }
};
