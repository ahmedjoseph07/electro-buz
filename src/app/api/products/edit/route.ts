import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/Product";
import { connectDB } from "@/lib/mongodb";
import { verifySafeRequest } from "@/lib/secureRoute";

export async function PUT(req: NextRequest) {
    try {
        await connectDB();
         const notAllowed = verifySafeRequest(req);
            if (notAllowed) return notAllowed;

        const body = await req.json();
        const { _id, title, description, price, category, image, stock, featured, features, diagrams } = body;

        if (!_id) {
            return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            _id,
            {
                title,
                description,
                price,
                category,
                image,
                stock,
                featured,
                features: Array.isArray(features) ? features : [],
                diagrams: Array.isArray(diagrams) ? diagrams : [],
            },
            { new: true }
        );

        if (!updatedProduct) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Product updated", product: updatedProduct });
    } catch (err) {
        console.error("Edit Product Error:", err);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
