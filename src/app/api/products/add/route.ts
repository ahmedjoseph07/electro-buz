import { NextResponse } from "next/server";
import Product from "@/models/Product";
import { connectDB } from "@/lib/mongodb";

export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();
        const { title, description, price, image, category, stock, featured } = body;
        console.log(body);

        if (!title || !price || !category) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }


        console.log(stock, featured);

        const newProduct = await Product.create({
            title,
            description,
            price,
            image,
            category,
            stock,
            featured,
        });

        console.log("New Product Created:", newProduct);

        return NextResponse.json(
            { message: "Product added successfully", product: newProduct },
            { status: 201 }
        );
    } catch (err: any) {
        console.error("Add Product Error:", err);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
