import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/Product";
import { connectDB } from "@/lib/mongodb";
import { verifySafeRequest } from "@/lib/secureRoute";

export async function DELETE(req: NextRequest) {
    try {
        await connectDB();

        const notAllowed = verifySafeRequest(req);
        if (notAllowed) return notAllowed;

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
