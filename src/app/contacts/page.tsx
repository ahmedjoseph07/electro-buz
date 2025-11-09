"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contacts() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);
    const [responseMsg, setResponseMsg] = useState<{ type: "success" | "error" | ""; text: string }>({
        type: "",
        text: "",
    });

    const contacts = [
        {
            title: "Email Us",
            desc: "support@electrobuz.com",
            icon: <Mail className="w-10 h-10 text-cyan-600" />,
            link: "mailto:support@electrobuz.com",
            hoverText: "Send us an email directly!",
        },
        {
            title: "WhatsApp",
            desc: "+88018 78 904 575",
            icon: <Phone className="w-10 h-10 text-cyan-600" />,
            link: "https://wa.me/8801878904575",
            hoverText: "Chat with us on WhatsApp!",
        },
        {
            title: "Map Location",
            desc: "CUET, Chittagong, Bangladesh",
            icon: <MapPin className="w-10 h-10 text-cyan-600" />,
            link: "https://www.google.com/maps/place/Chittagong+University+of+Engineering+%26+Technology/",
            hoverText: "View our CUET location on Google Maps!",
        },
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setResponseMsg({ type: "", text: "" });

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                setResponseMsg({ type: "success", text: data.message || "Message sent successfully!" });
                setFormData({ name: "", email: "", message: "" });
            } else {
                setResponseMsg({ type: "error", text: data.error || "Failed to send message." });
            }
        } catch (err) {
            setResponseMsg({ type: "error", text: "Something went wrong. Try again later." });
        } finally {
            setLoading(false);
        }
    };

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
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-xl bg-white p-6 rounded-2xl shadow-md space-y-5 border border-cyan-100"
            >
                <Input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border-cyan-500 focus:border-0"
                    required
                />
                <Input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border-cyan-500 focus:border-0"
                    required
                />
                <Textarea
                    name="message"
                    placeholder="Your message"
                    value={formData.message}
                    onChange={handleChange}
                    className="border-cyan-500 focus:border-0"
                    required
                />

                <Button type="submit" disabled={loading} className="w-full">
                    {loading ? "Sending..." : "Send Message"}
                </Button>

                {responseMsg.text && (
                    <p
                        className={`text-center text-sm ${responseMsg.type === "success"
                            ? "text-green-600"
                            : "text-red-500"
                            }`}
                    >
                        {responseMsg.text}
                    </p>
                )}
            </form>

            {/* --- Contact Info Cards with Hover Info --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto w-full mt-8">
                {contacts.map((item) => (
                    <HoverCard key={item.title}>
                        <HoverCardTrigger asChild>
                            <a href={item.link} target="_blank" rel="noopener noreferrer">
                                <Card
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
                            </a>
                        </HoverCardTrigger>
                        <HoverCardContent className="text-sm text-gray-700 text-center">
                            {item.hoverText}
                        </HoverCardContent>
                    </HoverCard>
                ))}
            </div>
        </section>
    );
}
