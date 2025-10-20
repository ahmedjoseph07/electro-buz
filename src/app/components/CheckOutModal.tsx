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
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
    const items = useAppSelector((s) => s.cart.items);
    const total = items.reduce((sum, it) => sum + it.price * it.quantity, 0);
    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState(false);
    const [customer, setCustomer] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });

    const handlePlaceOrder = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ items, total, customer }),
            });

            if (!res.ok) throw new Error("Order failed");

            const data = await res.json();
            toast.success(`Order placed successfully!`, {
                icon: <CheckCircle2 className="text-green-500 w-5 h-5" />,
            });
            dispatch(clearCart());
            onClose();
        } catch (err) {
            console.error(err);
            toast.warning("Failed to place order.", {
                icon: <XCircle className="text-red-500 w-5 h-5" />,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-sm p-6">
                <DialogHeader>
                    <DialogTitle className="text-center text-2xl font-bold text-gray-800">
                        Checkout — <span className="text-cyan-500">COD Only</span>
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 mt-2">
                    {/* Name */}
                    <div className="relative">
                        <User className="absolute left-3 top-3.5 text-cyan-500 w-4 h-4" />
                        <Input
                            type="text"
                            placeholder="Full Name"
                            value={customer.name}
                            onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                            className="pl-9 border-cyan-500 focus:border-0"
                        />
                    </div>

                    {/* Email */}
                    <div className="relative">
                        <Mail className="absolute left-3 top-3.5 text-cyan-500 w-4 h-4" />
                        <Input
                            type="email"
                            placeholder="Email"
                            value={customer.email}
                            onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                            className="pl-9 border-cyan-500 focus:border-0"
                        />
                    </div>

                    {/* Phone */}
                    <div className="relative">
                        <Phone className="absolute left-3 top-3.5 text-cyan-500 w-4 h-4" />
                        <Input
                            type="text"
                            placeholder="Phone"
                            value={customer.phone}
                            onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                            className="pl-9 border-cyan-500 focus:border-0"
                        />
                    </div>

                    {/* Address */}
                    <div className="relative">
                        <MapPin className="absolute left-3 top-3.5 text-cyan-500 w-4 h-4" />
                        <Textarea
                            placeholder="Delivery Address"
                            className="w-full border rounded-lg p-2 pl-9 border-cyan-500 focus:border-0"
                            value={customer.address}
                            onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                        />
                    </div>

                    {/* Total */}
                    <div className="mt-4 font-semibold text-center">
                        Total: ৳{total.toFixed(2)} (Cash on Delivery)
                    </div>

                    {/* Confirm Order */}
                    <Button
                        className="w-full mt-2 flex items-center justify-center gap-2"
                        disabled={loading}
                        onClick={handlePlaceOrder}
                    >
                        {loading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <>
                                <ShoppingBag className="w-4 h-4" /> Confirm Order
                            </>
                        )}
                    </Button>

                    {/* Cancel */}
                    <Button
                        onClick={onClose}
                        variant="neutral"
                        className="w-full flex items-center justify-center gap-2 mt-2"
                    >
                        <X className="w-4 h-4" /> Cancel
                    </Button>
                    
                </div>
            </DialogContent>
        </Dialog>
    );
}
