import { NextResponse } from "next/server";
import Product from "@/models/Product";
import { connectDB } from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const {
      title,
      description,
      price,
      image,
      category,
      stock,
      featured,
      features,
      diagrams,
    } = body;

    if (!title || !price || !category) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const newProduct = await Product.create({
      title,
      description,
      price,
      image,
      category,
      stock,
      featured,
      features: Array.isArray(features) ? features : [], 
      diagrams: Array.isArray(diagrams) ? diagrams : [], 
    });

    console.log("New Product Created:", newProduct);

    return NextResponse.json(
      { message: "Product added successfully", product: newProduct },
      { status: 201 }
    );
  } catch (err) {
    console.error("Add Product Error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
