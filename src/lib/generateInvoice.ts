import { OrderItem } from "@/models/Order";
import jsPDF from "jspdf";

export interface OrderForInvoice {
    _id: string;
    items: OrderItem[];
    total: number;
    customer: {
        name: string;
        email?: string;
        phone?: string;
        address?: string;
    };
    orderID:string
}

export const generateInvoice = (order: OrderForInvoice) => {
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
        doc.text(`Order ID: ${order.orderID}`, 20, 38);
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