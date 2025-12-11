import { connectDB } from "@/lib/mongodb";
import { verifySafeRequest } from "@/lib/secureRoute";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    
    const notAllowed = verifySafeRequest(req);
    if (notAllowed) return notAllowed;

    const products = await Product.find({}, null, { lean: true });

    return NextResponse.json(
      { success: true, data: products },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : "Unknown error";
    console.error("GET /products error:", errMsg);
    return NextResponse.json(
      { success: false, message: "Failed to fetch products", error: errMsg },
      { status: 500 }
    );
  }
}
