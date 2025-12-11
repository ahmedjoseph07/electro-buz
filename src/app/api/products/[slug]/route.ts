import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { verifyFirebaseToken } from "@/lib/verifyToken";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  try {
    await connectDB();

    const { valid, message } = await verifyFirebaseToken(req);
    if (!valid)
      return NextResponse.json({ success: false, message }, { status: 401 });

    const product = await Product.findOne({ slug }).lean();

    if (!product)
      return NextResponse.json({ message: "Product not found" }, { status: 404 });

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ message: "Failed to fetch product" }, { status: 500 });
  }
}
