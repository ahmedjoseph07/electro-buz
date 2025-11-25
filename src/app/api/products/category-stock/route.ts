import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/Product";
import { connectDB } from "@/lib/mongodb";
import { verifyFirebaseToken } from "@/lib/verifyToken";

export async function GET(req:NextRequest) {
    await connectDB();

    try {
        // Verify token
        const { valid, message } = await verifyFirebaseToken(req);
        if (!valid) return NextResponse.json({ success: false, message: message! }, { status: 401 });

        // Group by category and sum the total stock of that category
        const counts = await Product.aggregate([
            {
                $group: {
                    _id: "$category",
                    count: { $sum: "$stock" },
                },
            },
        ]);

        const result = counts.map((c) => ({
            category: c._id,
            stock: c.count,
        }));

        return NextResponse.json(result);
    } catch (err) {
        console.error("Error fetching category stock data:", err);
        return NextResponse.json(
            { error: "Failed to fetch category data" },
            { status: 500 }
        );
    }
}
