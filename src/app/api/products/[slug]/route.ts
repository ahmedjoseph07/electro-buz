import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product, { ProductDoc } from "@/models/Product";
import { verifyFirebaseToken } from "@/lib/verifyToken";

export const GET = async (
  req: NextRequest,
  context: { params: { slug: string } }
): Promise<NextResponse> => {
  try {
    await connectDB();
    // Verify token
    const { valid, message } = await verifyFirebaseToken(req);
    if (!valid) return NextResponse.json({ success: false, message: message! }, { status: 401 });

    const { slug } = context.params; 

    const product = await Product.findOne({ slug }).lean();

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ message: "Failed to fetch product" }, { status: 500 });
  }
};