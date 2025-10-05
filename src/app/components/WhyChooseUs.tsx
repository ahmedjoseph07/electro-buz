"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle, Truck, DollarSign, Headset } from "lucide-react";

const WhyChooseUs = () => {
    const features = [
        {
            title: "Quality Checked",
            desc: "All components are tested to ensure top performance.",
            icon: <CheckCircle className="w-10 h-10 text-cyan-600" />,
        },
        {
            title: "Fast Delivery",
            desc: "Get your products delivered quickly across Bangladesh.",
            icon: <Truck className="w-10 h-10 text-cyan-600" />,
        },
        {
            title: "Affordable Prices",
            desc: "Designed for students, hobbyists, and makers.",
            icon: <DollarSign className="w-10 h-10 text-cyan-600" />,
        },
        {
            title: "Support Team",
            desc: "We help you with every step of your project.",
            icon: <Headset className="w-10 h-10 text-cyan-600" />,
        },
    ];

    return (
        <section className="py-10 border-b bg-gray-50">
            <h2 className="text-3xl font-bold text-center mb-10">
                Why Choose <span className="text-cyan-500">ElectroBuz⚡</span>?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-6">
                {features.map((item) => (
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
};

export default WhyChooseUs;
