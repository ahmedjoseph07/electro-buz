import { NextResponse } from "next/server";
import Order from "@/models/Order";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
    await connectDB();

    try {
        const now = new Date();
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(now.getMonth() - 5);

        const sales = await Order.aggregate([
            {
                $match: {
                    createdAt: { $gte: sixMonthsAgo },
                    status: { $in: ["delivered", "paid"] },
                    refunded: { $ne: true }
                },
            },
            {
                $group: {
                    _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
                    totalSales: { $sum: "$total" },
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } },
        ]);

        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const result = sales.map((s) => ({
            month: monthNames[s._id.month - 1],
            sales: s.totalSales,
        }));

        return NextResponse.json(result);

    } catch (err) {
        return NextResponse.json({ error: "Failed to fetch sales data" }, { status: 500 });
    }
}
