"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";

const products = [
    {
        id: 1,
        name: "Arduino Uno R3",
        description: "Perfect for beginners and prototyping IoT projects.",
        price: "৳850",
        image: "https://m.media-amazon.com/images/I/61lz8nZrFAL._AC_SL1500_.jpg",
    },
    {
        id: 2,
        name: "Raspberry Pi 4 Model B",
        description: "A mini-computer for robotics and embedded systems.",
        price: "৳6500",
        image: "https://m.media-amazon.com/images/I/61E2g8A+uJL._AC_SL1500_.jpg",
    },
    {
        id: 3,
        name: "NodeMCU ESP8266",
        description: "WiFi-enabled microcontroller for IoT projects.",
        price: "৳480",
        image: "https://m.media-amazon.com/images/I/61zTqgQZkJL._AC_SL1500_.jpg",
    },
    {
        id: 4,
        name: "Ultrasonic Sensor HC-SR04",
        description: "Measures distance using ultrasonic waves.",
        price: "৳220",
        image: "https://m.media-amazon.com/images/I/61xW0vXqMfL._AC_SL1500_.jpg",
    },
    {
        id: 5,
        name: "L298N Motor Driver",
        description: "Dual H-Bridge motor driver for DC motors and robots.",
        price: "৳350",
        image: "https://m.media-amazon.com/images/I/61PZy66mD7L._AC_SL1500_.jpg",
    },
    {
        id: 6,
        name: "Breadboard 830 Points",
        description: "Reusable breadboard for easy circuit connections.",
        price: "৳180",
        image: "https://m.media-amazon.com/images/I/61zOhg9ZfyL._AC_SL1500_.jpg",
    },
];

export default function Products() {
    return (
        <section className="py-10 mt-20 bg-white space-y-10 flex flex-col items-center px-6">
            {/* --- Header --- */}
            <div className="text-center max-w-2xl">
                <h2 className="text-3xl font-bold text-gray-800">
                    Explore Our <span className="text-cyan-500">Products</span>
                </h2>
                <p className="text-gray-500 mt-3">
                    Find everything you need for your electronics, robotics, and IoT projects.
                </p>
            </div>

            {/* --- Product Grid --- */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto w-full">
                {products.map((p) => (
                    <Card
                        key={p.id}
                        className="group cursor-pointer border-2 transition-all duration-300 
                                   hover:-translate-x-2 hover:translate-y-2 hover:shadow-[0_0_0]
                                   active:translate-y-0 active:shadow-none"
                    >
                        <div className="overflow-hidden rounded-t-2xl">
                            <Image
                                width={300}
                                height={300}
                                src={p.image}
                                alt={p.name}
                                className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        <CardHeader className="text-center mt-2">
                            <CardTitle className="text-lg font-semibold text-cyan-600">{p.name}</CardTitle>
                            <CardDescription className="text-gray-600 text-sm">{p.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex justify-between items-center px-6 pb-4 mt-auto">
                            <span className="text-xl font-extrabold text-cyan-600">{p.price}</span>
                            <Button className="flex items-center gap-2">
                                <ShoppingCart className="w-4 h-4" />
                                Add to Cart
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}
