import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/Product";
import { connectDB } from "@/lib/mongodb";
import { verifySafeRequest } from "@/lib/secureRoute";
import slugify from "slugify";

export async function POST(req: NextRequest) {
  try {

    const notAllowed = verifySafeRequest(req);
    if (notAllowed) return notAllowed;

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

    //Generating a slug from title
    let slug = slugify(title, { lower: true, strict: true });

    // Ensuring slug uniqueness
    const slugExists = await Product.findOne({ slug });
    if (slugExists) {
      slug = `${slug}-${Date.now()}`; // add timestamp if duplicate
    }

    const newProduct = await Product.create({
      title,
      slug, 
      description,
      price,
      image,
      category,
      stock,
      featured,
      features: Array.isArray(features) ? features : [],
      diagrams: Array.isArray(diagrams) ? diagrams : [],
    });

    console.log(newProduct)
    return NextResponse.json(
      { message: "Product added successfully", product: newProduct },
      { status: 201 }
    );
  } catch (err) {
    console.error("Add Product Error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
