"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contacts() {
    const contacts = [
        {
            title: "Email",
            desc: "support@electrobuz.com",
            icon: <Mail className="w-10 h-10 text-cyan-600" />,
        },
        {
            title: "Phone",
            desc: "+880 1712-345678",
            icon: <Phone className="w-10 h-10 text-cyan-600" />,
        },
        {
            title: "Location",
            desc: "CUET, Chittagong, Bangladesh",
            icon: <MapPin className="w-10 h-10 text-cyan-600" />,
        },
    ];

    return (
        <section className="py-10 mt-20 bg-gray-50 space-y-10 flex flex-col items-center px-6">
            {/* --- Header --- */}
            <div className="text-center max-w-2xl">
                <h2 className="text-3xl font-bold text-gray-800">
                    Get in <span className="text-cyan-500">Touch</span>
                </h2>
                <p className="text-gray-500 mt-3">
                    Have questions about our electronics or robotics components? Reach out — we’d love to hear from you!
                </p>
            </div>

            {/* --- Contact Form --- */}
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
                <Textarea
                    placeholder="Your message"
                    className="border-cyan-500 focus:border-0"
                />
                <Button>
                    Send Message
                </Button>
            </form>

            {/* --- Contact Info Cards --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto w-full mt-8">
                {contacts.map((item) => (
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
