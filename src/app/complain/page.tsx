"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AlertTriangle, MessageSquare, ClipboardList } from "lucide-react";

export default function Complain() {
    const issues = [
        {
            title: "Quality Issues",
            desc: "Report damaged or faulty components you’ve received.",
            icon: <AlertTriangle className="w-10 h-10 text-cyan-600" />,
        },
        {
            title: "Service Feedback",
            desc: "Share your experience with our delivery or customer support.",
            icon: <MessageSquare className="w-10 h-10 text-cyan-600" />,
        },
        {
            title: "Order Concerns",
            desc: "Let us know if there’s a delay or issue with your order.",
            icon: <ClipboardList className="w-10 h-10 text-cyan-600" />,
        },
    ];

    return (
        <section className="py-10 mt-20 bg-gray-50 space-y-10 flex flex-col items-center px-6">
            <div className="text-center max-w-2xl">
                <h2 className="text-3xl font-bold text-gray-800">
                    Submit a <span className="text-cyan-500">Complaint</span>
                </h2>
                <p className="text-gray-500 mt-3">
                    Facing any issues with our products or service? Please share your complaint — we’ll resolve it as soon as possible.
                </p>
            </div>

            {/* --- Complaint Form --- */}
            <form className="w-full max-w-xl bg-white p-6 rounded-2xl shadow-md space-y-5 border border-cyan-100">
                <Input
                    type="text"
                    placeholder="Enter your name"
                    className="border-cyan-500 focus:border-0"
                />
                <Input
                    type="email"
                    placeholder="Enter your email"
                    className="border-cyan-500 focus:border-0"
                />
                <Input
                    type="text"
                    placeholder="Product name or order ID (optional)"
                    className="border-cyan-500 focus:border-0"
                />
                <Textarea
                    placeholder="Describe your issue or complaint"
                    className="border-cyan-500 focus:border-0"
                />
                <Button>
                    Submit
                </Button>
            </form>

            {/* --- Info Cards Below Form --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto w-full mt-8">
                {issues.map((item) => (
                    <Card
                        key={item.title}
                        className="group cursor-pointer text-center border-2 transition-all duration-300 
                                   hover:-translate-x-2 hover:translate-y-2 hover:shadow-[0_0_0] 
                                   active:translate-y-0 active:shadow-none"
                    >
                        <CardHeader className="flex flex-col items-center space-y-1">
                            <div className="transition-transform duration-300 group-hover:scale-110">
                                {item.icon}
                            </div>
                            <CardTitle className="text-lg font-bold text-cyan-600">
                                {item.title}
                            </CardTitle>
                            <CardDescription className="text-gray-600 text-sm">
                                {item.desc}
                            </CardDescription>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </section>
    );
}
