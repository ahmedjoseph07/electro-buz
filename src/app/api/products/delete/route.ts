import { NextResponse } from "next/server";
import Product from "@/models/Product";
import { connectDB } from "@/lib/mongodb";

export async function DELETE(req: Request) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) return NextResponse.json({ message: "Missing product ID" }, { status: 400 });

        await Product.findByIdAndDelete(id);
        return NextResponse.json({ message: "Product deleted successfully" });
    } catch (err) {
        console.error("Delete Product Error:", err);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
