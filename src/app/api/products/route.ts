import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    
    const products = await Product.find();
    return NextResponse.json({ success: true, data: products }, { status: 200 });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : "Unknown error";
    console.error("GET /products error:", errMsg);
    return NextResponse.json(
      { success: false, message: "Failed to fetch products", error: errMsg },
      { status: 500 }
    );
  }
}