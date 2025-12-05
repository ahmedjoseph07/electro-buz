import Order from "@/models/Order";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { items, total, customer } = body;

        if (!items?.length || !customer?.name || !customer?.address) {
            return NextResponse.json({ success: false, message: "Invalid order data" }, { status: 400 });
        }

        const newOrder = new Order({
            items,
            total,
            customer,
            status: "pending",
        });

        await newOrder.save();
        console.log(`${process.env.PAYSTATION_STORE_ID}`)
        console.log(`${process.env.PAYSTATION_PASSWORD}`)

        const payload = {
            merchantId: `${process.env.PAYSTATION_STORE_ID}`,
            password: `${process.env.PAYSTATION_PASSWORD}`,
            invoice_number: newOrder.orderID,
            currency: "BDT",
            payment_amount: total,
            pay_with_charge: 0,
            reference: "Order from ElectroBuz",
            cust_name: customer.name,
            cust_phone: customer.phone,
            cust_email: customer.email,
            cust_address: customer.address,
            callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/paystation/callback`,
            checkout_items: JSON.stringify({
                product_name: "Order from ElectroBuz",
                product_category: "Electronics",
                product_profile: "general",
            }),
        };

        const params = new URLSearchParams(
            Object.entries(payload).reduce((acc, [key, value]) => {
                if (value !== undefined && value !== null) acc[key] = String(value);
                return acc;
            }, {} as Record<string, string>)
        );

        // Initiate Payment API 
        const response = await fetch("https://api.paystation.com.bd/initiate-payment", {
            method: "POST",
            body: params,
        });

        const data = await response.json();

        return NextResponse.json(data);
    } catch (error) {
        console.error("PayStation Error:", error);
        return NextResponse.json({
            success: false,
            message: "Failed to initiate payment",
            error: (error as Error).message,
        });
    }
}