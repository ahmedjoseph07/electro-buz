import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product, { ProductDoc } from "@/models/Product";

interface Params {
  params: { id: string };
}

export const GET = async (
  req: NextRequest,
  context: Params
): Promise<NextResponse> => {
  try {
    await connectDB();

    const { id } = context.params;
    const product = await Product.findById<ProductDoc>(id).lean();

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    const productWithIdString = { ...product, _id: product._id.toString() };

    return NextResponse.json(productWithIdString);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ message: "Failed to fetch product" }, { status: 500 });
  }
};
