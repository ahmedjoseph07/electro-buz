"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks/reduxHook";
import { clearCart } from "@/features/cart/cartSlice";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
    X,
    Loader2,
    CheckCircle2,
    XCircle,
    ShoppingBag,
    User,
    Mail,
    Phone,
    MapPin,
    Wallet,
} from "lucide-react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { jsPDF } from "jspdf";

import { OrderItem } from "@/models/Order";
import { generateInvoice, OrderForInvoice } from "@/lib/generateInvoice";

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
}


export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
    const items = useAppSelector((s) => s.cart.items);
    const total = items.reduce((sum, it) => sum + it.price * it.quantity, 0);
    const dispatch = useAppDispatch();

    const [loadingCOD, setLoadingCOD] = useState(false);
    const [loadingOnline, setLoadingOnline] = useState(false);

    const [customer, setCustomer] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });

    const handlePlaceOrder = async () => {
        setLoadingCOD(true);
        try {
            const res = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ items, total, customer }),
            });

            if (!res.ok) throw new Error("Order failed");

            const data: { message: string; orderId: string; order?: OrderForInvoice } = await res.json();
            toast.success(`Order placed successfully!`, {
                icon: <CheckCircle2 className="text-green-500 w-5 h-5" />,
            });
            dispatch(clearCart());
            onClose();
            
            if (data.order) generateInvoice(data.order); // Generate Invoice
        } catch (err) {
            console.error(err);
            toast.warning("Failed to place order.", {
                icon: <XCircle className="text-red-500 w-5 h-5" />,
            });
        } finally {
            setLoadingCOD(false);
        }
    };

    const handlePayOnline = async () => {
        if (!customer.name || !customer.phone || !customer.address) {
            toast.warning("Please fill out your details before proceeding.");
            return;
        }

        setLoadingOnline(true);
        try {
            const res = await fetch("/api/paystation/initiate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ items,total, customer }),
            });

            const data = await res.json();
            console.log(data)

            if (data?.payment_url) {
                window.location.href = data.payment_url;
            } else {
                toast.error("Failed to initiate payment.");
            }

        } catch (err) {
            console.error(err);
            toast.error("Error connecting to payment gateway.");
        } finally {
            setLoadingOnline(true);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-full max-w-lg sm:max-w-md p-4 sm:p-6">
                <DialogHeader>
                    <DialogTitle className="text-start text-2xl font-bold text-gray-800">
                        Confirm Your Order
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 mt-2">

                    {/* Order Details */}
                    <div className="border border-cyan-500 rounded-lg p-4 w-full">
                        <h3 className="text-lg font-semibold text-gray-500 mb-2">Order Details</h3>
                        {items.length === 0 ? (
                            <p className="text-gray-500 text-sm">Your cart is empty.</p>
                        ) : (
                            <div
                                className={`space-y-2 ${items.length >= 3 ? "max-h-48 overflow-y-auto" : ""}`}
                            >
                                {items.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="flex justify-between items-center border-b border-gray-100 pb-2 last:border-b-0"
                                    >
                                        <div className="flex-1 min-w-0">
                                            <p className="text-gray-700 text-sm truncate">{item.title}</p>
                                            <p className="text-gray-400 text-xs">
                                                Qty: {item.quantity} x ৳{item.price.toFixed(2)}
                                            </p>
                                        </div>
                                        <p className="text-gray-800 font-medium">
                                            ৳{(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Inputs */}
                    <div className="space-y-3">
                        <div className="relative w-full">
                            <User className="absolute left-3 top-3.5 text-cyan-500 w-4 h-4" />
                            <Input
                                type="text"
                                placeholder="Full Name"
                                value={customer.name}
                                onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                                className="pl-9 border-cyan-500 focus:border-0 w-full"
                            />
                        </div>

                        <div className="relative w-full">
                            <Mail className="absolute left-3 top-3.5 text-cyan-500 w-4 h-4" />
                            <Input
                                type="email"
                                placeholder="Email"
                                value={customer.email}
                                onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                                className="pl-9 border-cyan-500 focus:border-0 w-full"
                            />
                        </div>

                        <div className="relative w-full">
                            <Phone className="absolute left-3 top-3.5 text-cyan-500 w-4 h-4" />
                            <Input
                                type="text"
                                placeholder="Phone"
                                value={customer.phone}
                                onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                                className="pl-9 border-cyan-500 focus:border-0 w-full"
                            />
                        </div>

                        <div className="relative w-full">
                            <MapPin className="absolute left-3 top-3.5 text-cyan-500 w-4 h-4" />
                            <Textarea
                                placeholder="Delivery Address"
                                className="w-full border rounded-lg p-2 pl-9 border-cyan-500 focus:border-0"
                                value={customer.address}
                                onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Total */}
                    <div className="mt-4 font-semibold text-center sm:text-left">
                        Total Payable: &#2547;{total.toFixed(2)}
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 mt-2 w-full">
                        <Button
                            variant="neutral"
                            className="flex-1 flex items-center justify-center gap-2"
                            disabled={loadingCOD || loadingOnline}
                            onClick={handlePlaceOrder}
                        >
                            {loadingCOD ? <Loader2 className="w-4 h-4 animate-spin" /> : <>
                                <ShoppingBag className="w-4 h-4" /> Cash on Delivery
                            </>}
                        </Button>

                        <Button
                            className="flex-1 flex items-center justify-center gap-2 "
                            disabled={loadingCOD || loadingOnline}
                            onClick={handlePayOnline}
                        >
                            {loadingOnline ? <Loader2 className="w-4 h-4 animate-spin" /> : <> <Wallet /> Pay Online</>}
                        </Button>
                    </div>

                </div>
            </DialogContent>
        </Dialog>
    );
}
