import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

     // Detect if user is directly visiting the API (not XHR/fetch)
    const fetchMode = req.headers.get("sec-fetch-mode");
    const acceptHeader = req.headers.get("accept") || "";

    if (fetchMode !== "cors" && !acceptHeader.includes("application/json")) {
      // In case of direct visit in the browser or Postman
      return NextResponse.redirect(new URL("/", req.url)); // redirect to homepage
    }

    const allowedOrigins = [
      "http://localhost:3000",
      "https://www.electrobuz.com",
    ];
    const origin = req.headers.get("origin");

    // Allow same-origin (no Origin header)
    if (origin && !allowedOrigins.includes(origin)) {
      return NextResponse.json(
        { success: false, message: "Unauthorized origin" },
        { status: 403 }
      );
    }

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