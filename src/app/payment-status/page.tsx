"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/app/hooks/reduxHook";
import { clearCart } from "@/features/cart/cartSlice";
import { Loader } from "lucide-react";
import { OrderItem } from "@/models/Order";
import { generateInvoice } from "@/lib/generateInvoice";

interface OrderForInvoice {
    _id: string;
    items: OrderItem[];
    total: number;
    customer: {
        name: string;
        email?: string;
        phone?: string;
        address?: string;
    };
}

export default function PaymentStatus() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch = useAppDispatch();

    const status = searchParams.get("status");
    const orderId = searchParams.get("orderId");

    useEffect(() => {
        const fetchAndGenerateInvoice = async () => {
            if (status === "success" && orderId) {
                dispatch(clearCart());
                const res = await fetch(`/api/orders/${orderId}`);
                const data: { success: boolean; order?: OrderForInvoice } = await res.json();

                console.log(data)

                if (data.success && data.order) {
                    generateInvoice(data.order); // Generate Invoice
                }
                
                const timer = setTimeout(() => router.push("/products"), 2000);
                return () => clearTimeout(timer);
            } else if (status === "Failed" || status === "Canceled") {
                router.push("/cart");
            }
        }
        fetchAndGenerateInvoice()
    }, [status,orderId]);

    return (
        <div className="text-center mt-10">
            <h1 className="text-2xl font-bold">
                {status === "success"
                    ? "Payment Successful!"
                    : "Payment Failed or Cancelled"}
            </h1>

            {status === "success" && (
                <>
                    <p className="mt-20">Order ID: {orderId}</p>
                    <p className="mt-2"><Loader className="animate-spin" />Redirecting to products</p>
                </>
            )}
        </div>
    );
}
