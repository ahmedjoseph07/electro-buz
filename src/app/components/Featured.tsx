"use client";
import React from "react";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Rocket, Lightbulb, Wrench, Cpu, Radio, Cog } from "lucide-react";

const Featured = () => {
    const data = {
        robotics: [
            {
                icon: <Wrench className="w-10 h-10 text-cyan-600" />,
                title: "DIY Drone Kit",
                desc: "Assemble and fly your own drone using our high-quality motor and controller set.",
            },
            {
                icon: <Lightbulb className="w-10 h-10 text-cyan-600" />,
                title: "Line Follower Robot",
                desc: "Perfect for beginners — build an autonomous bot that follows a track using IR sensors.",
            },
        ],
        iot: [
            {
                icon: <Rocket className="w-10 h-10 text-cyan-600" />,
                title: "Smart Home Kit",
                desc: "Automate lights, fans, and appliances with IoT-based Wi-Fi modules.",
            },
            {
                icon: <Radio className="w-10 h-10 text-cyan-600" />,
                title: "Weather Station",
                desc: "Track real-time temperature, humidity, and pressure using IoT sensors.",
            },
        ],
        electronics: [
            {
                icon: <Cpu className="w-10 h-10 text-cyan-600" />,
                title: "Arduino Uno R3",
                desc: "Build interactive electronics projects and prototypes with this versatile microcontroller.",
            },
            {
                icon: <Cog className="w-10 h-10 text-cyan-600" />,
                title: "Power Supply Module",
                desc: "Stable and safe power delivery for all your DIY and embedded electronics builds.",
            },
        ],
    };

    return (
        <section className="py-14 bg-gray-50 border-b">
            <h2 className="text-3xl font-bold text-center mb-4">
                Featured <span className="text-cyan-500">Products ⚡</span>
            </h2>

            <p className="max-w-3xl text-center text-gray-500 mx-6 md:mx-auto mb-10">
                Discover our best-selling products designed for innovators and makers —
                from robotics kits to IoT devices and electronic components, we’ve got everything you need.
            </p>

            <div className="max-w-5xl mx-auto px-6">
                <Tabs defaultValue="robotics" className="w-full">
                    {/* Tabs Header */}
                    <TabsList className="grid grid-cols-3 mb-8 bg-white border shadow-sm">
                        <TabsTrigger
                            value="robotics"
                            className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white cursor-pointer"
                        >
                            Robotics
                        </TabsTrigger>
                        <TabsTrigger
                            value="iot"
                            className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white cursor-pointer"
                        >
                            IoT 
                        </TabsTrigger>
                        <TabsTrigger
                            value="electronics"
                            className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white cursor-pointer"
                        >
                            Electronics
                        </TabsTrigger>
                    </TabsList>

                    {/* Tab Content — shared design */}
                    {Object.entries(data).map(([key, items]) => (
                        <TabsContent key={key} value={key}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {items.map((item) => (
                                    <Card
                                        key={item.title}
                                        className="group cursor-pointer text-center border-2 transition-all duration-300 
                                                   hover:-translate-x-2 hover:translate-y-2 hover:shadow-[0_0_0] 
                                                   active:translate-y-0 active:shadow-none"
                                    >
                                        <CardHeader className="flex flex-col items-center space-y-2">
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
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </section>
    );
};

export default Featured;
