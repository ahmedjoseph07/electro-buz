import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product, { ProductDoc } from "@/models/Product";

export const GET = async (
  req: NextRequest,
  context: { params: { id: string } }
): Promise<NextResponse> => {
  try {
    await connectDB();

    const { id } = context.params;
    const product = await Product.findById(id).lean<ProductDoc & { _id: string }>();

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ message: "Failed to fetch product" }, { status: 500 });
  }
};
