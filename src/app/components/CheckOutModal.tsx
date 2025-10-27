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
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { jsPDF } from "jspdf";

import { OrderItem } from "@/models/Order";

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

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

    const generateInvoice = (order: OrderForInvoice) => {
        const doc = new jsPDF();

        // --- Header ---
        doc.setFontSize(22);
        doc.setTextColor(10, 10, 10);
        doc.text("ElectroBuz", 105, 15, { align: "center" });

        doc.setFontSize(14);
        doc.setTextColor(100);
        doc.text("Invoice", 105, 22, { align: "center" });

        // --- Order & Customer Info Box ---
        doc.setDrawColor(0);
        doc.setFillColor(240, 240, 240);
        doc.rect(15, 30, 180, 40, "F"); // light grey box

        doc.setTextColor(0);
        doc.setFontSize(12);
        doc.text(`Order ID: ${order._id}`, 20, 38);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 38);

        doc.text(`Name: ${order.customer.name || "-"}`, 20, 45);
        if (order.customer.email) doc.text(`Email: ${order.customer.email}`, 20, 52);
        if (order.customer.phone) doc.text(`Phone: ${order.customer.phone}`, 20, 59);
        if (order.customer.address) doc.text(`Address: ${order.customer.address}`, 20, 66);

        // --- Items Table Header ---
        const startY = 80;
        doc.setFillColor(200, 230, 255); // light cyan
        doc.rect(15, startY, 180, 8, "F");

        doc.setFontSize(12);
        doc.setTextColor(0);
        doc.text("No.", 18, startY + 6);
        doc.text("Item", 32, startY + 6);
        doc.text("Qty", 135, startY + 6);
        doc.text("Price", 158, startY + 6);
        doc.text("Total", 190, startY + 6, { align: "right" });

        // --- Items ---
        let y = startY + 14;
        order.items.forEach((item: OrderItem, idx: number) => {
            // Item number
            doc.text(`${idx + 1}`, 18, y);

            // Item title (wrap if long)
            doc.text(item.title, 32, y, { maxWidth: 95 });

            // Quantity
            doc.text(`${item.quantity}`, 135, y);

            // Unit price
            doc.text(`${item.price.toFixed(2)}`, 158, y);

            // Total price (right-aligned)
            doc.text(`${(item.price * item.quantity).toFixed(2)}`, 190, y, { align: "right" });

            y += 8;
        });

        // --- Total Box ---
        y += 5;
        doc.setDrawColor(0);
        doc.setFillColor(240, 240, 240);
        doc.rect(120, y, 75, 10, "F");
        doc.setFontSize(12);
        doc.setTextColor(0);
        doc.text(`Total:${order.total.toFixed(2)}`, 190, y + 7, { align: "right" });

        // --- Footer ---
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text("Thank you for shopping with ElectroBuz!", 105, 290, { align: "center" });
        doc.text("This is a system generated invoice.", 105, 295, { align: "center" });

        // --- Save PDF ---
        doc.save(`invoice_${order._id}.pdf`);
    };


    const handlePlaceOrder = async () => {
        setLoading(true);
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

            // Generate Invoice
            if (data.order) generateInvoice(data.order);
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
            <DialogContent className="w-full max-w-lg sm:max-w-md p-4 sm:p-6">
                <DialogHeader>
                    <DialogTitle className="text-start text-2xl font-bold text-gray-800">
                        Checkout — <span className="text-cyan-500">COD Only</span>
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
                        Total: ৳{total.toFixed(2)} (Cash on Delivery)
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 mt-2 w-full">
                        <Button
                            className="flex-1 flex items-center justify-center gap-2"
                            disabled={loading}
                            onClick={handlePlaceOrder}
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><ShoppingBag className="w-4 h-4" /> Confirm Order</>}
                        </Button>
                        <Button
                            onClick={onClose}
                            variant="neutral"
                            className="flex-1 flex items-center justify-center gap-2"
                        >
                            <X className="w-4 h-4" /> Cancel
                        </Button>
                    </div>

                </div>
            </DialogContent>
        </Dialog>
    );
}
