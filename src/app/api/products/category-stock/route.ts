import { NextResponse } from "next/server";
import Product from "@/models/Product";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
    await connectDB();

    try {
        // Group by category and sum the total stock of that category
        const counts = await Product.aggregate([
            {
                $group: {
                    _id: "$category",
                    count: { $sum: "$stock" },
                },
            },
        ]);

        console.log(counts);

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
