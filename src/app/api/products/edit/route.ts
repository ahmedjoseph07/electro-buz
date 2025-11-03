import { NextResponse } from "next/server";
import Product from "@/models/Product";
import { connectDB } from "@/lib/mongodb";

export async function PUT(req: Request) {
    try {
        await connectDB();
        const body = await req.json();
        const { _id, title, description, price, category, image, stock, featured } = body;

        if (!_id) return NextResponse.json({ message: "Product ID is required" }, { status: 400 });

        const updatedProduct = await Product.findByIdAndUpdate(
            _id,
            { title, description, price, category, image, stock, featured },
            { new: true }
        );

        if (!updatedProduct)
            return NextResponse.json({ message: "Product not found" }, { status: 404 });

        return NextResponse.json({ message: "Product updated", product: updatedProduct });
    } catch (err) {
        console.error("Edit Product Error:", err);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
