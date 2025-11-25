import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import Product from "@/models/Product";
import User from "@/models/User";
import { verifyFirebaseToken } from "@/lib/verifyToken";

export async function GET(req:NextRequest) {
    await connectDB();

    try {

        // Verify token
        const { valid, message } = await verifyFirebaseToken(req);
        if (!valid) return NextResponse.json({ success: false, message: message! }, { status: 401 });

        const totalOrders = await Order.countDocuments();
        const pendingOrders = await Order.countDocuments({ status: "pending" });
        const totalProducts = await Product.countDocuments();
        const totalUsers = await User.countDocuments();

        // Calculate Total Revenue (from paid or delivered orders)
        const totalRevenueAgg = await Order.aggregate([
            { $match: { status: { $in: ["paid", "delivered"] }, refunded: { $ne: true } } },
            { $group: { _id: null, total: { $sum: "$total" } } },
        ]);

        const totalRevenue = totalRevenueAgg[0]?.total || 0;

        // Calculate Last Month Revenue
        const now = new Date();
        const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);

        const lastMonthRevenueAgg = await Order.aggregate([
            {
                $match: {
                    createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth },
                    status: { $in: ["paid", "delivered"] },
                    refunded: { $ne: true },
                },
            },
            { $group: { _id: null, total: { $sum: "$total" } } },
        ]);

        const lastMonthRevenue = lastMonthRevenueAgg[0]?.total || 0;

        const data = {
            totalOrders,
            pendingOrders,
            totalProducts,
            totalUsers,
            totalRevenue,
            lastMonthRevenue,
        };

        return NextResponse.json(data);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to fetch overview stats" }, { status: 500 });
    }
}
