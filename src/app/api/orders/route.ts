import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { verifyFirebaseToken } from "@/lib/verifyToken";

// handle POST for creating a new order
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
      { message: "Order created successfully", orderId: newOrder._id, order: newOrder },
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

// handle GET for fetching orders
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { valid, message } = await verifyFirebaseToken(req);
    if (!valid) {
      return NextResponse.json({ success: false, message }, { status: 401 });
    }

    const orders = await Order.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: orders }, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

//handle PATCH for status update
export async function PATCH(req: Request) {
  await connectDB();
  try {
    const { orderId, status } = await req.json();
    const updatedOrder = await Order.findOneAndUpdate({ orderID: orderId }, { status }, { new: true });
    return NextResponse.json(updatedOrder);
  } catch (error) {
    return NextResponse.json({ message: "Failed to update order", error }, { status: 500 });
  }
}