"use client";
import React, { useEffect, useState } from "react";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Cpu, Cog, Zap, Loader2, MilestoneIcon } from "lucide-react";
import Loader from "@/components/ui/loader";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Product {
    _id: string;
    title: string;
    description: string;
    price: number;
    image: string;
    category: string;
}

const Featured = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [activeCategory, setActiveCategory] = useState("Microcontroller");
     const router = useRouter();

    const categories = [
        { key: "Microcontroller", icon: <Cpu className="w-4 h-4" />, label: "Mircrontrollers" },
        { key: "Actuator", icon: <Cog className="w-4 h-4" />, label: "Actuators" },
        { key: "Sensor", icon: <Zap className="w-4 h-4" />, label: "Sensors" },
        { key: "Misc", icon: <MilestoneIcon className="w-4 h-4" />, label: "Misc" },
    ];

    // Fetch all products once
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const res = await fetch("/api/products");
                const data = await res.json();
                setProducts(data);
            } catch (err) {
                console.error("Error fetching products:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <Loader />

    // Filter products by category (frontend filtering)
    const filteredProducts = products.filter(
        (p) => p.category?.toLowerCase() === activeCategory.toLowerCase()
    );




    return (
        <section className="py-14 bg-gray-50">
            <h2 className="text-3xl font-bold text-center mb-4">
                Explore Our <span className="text-cyan-500">Products ⚡</span>
            </h2>

            <p className="max-w-3xl text-center text-gray-500 mx-6 md:mx-auto mb-10">
                Explore our latest products — from microcontrollers to sensors and actuators,
                perfect for your next innovation.
            </p>

            <div className="max-w-6xl mx-auto px-6">
                <Tabs
                    defaultValue={activeCategory}
                    value={activeCategory}
                    onValueChange={setActiveCategory}
                    className="w-full"
                >
                    {/* Tabs Header */}
                    <TabsList className="grid grid-cols-2 h-30 md:h-auto grid-rows-2 md:grid-rows-1  mb-8 w-full bg-white  shadow-sm">
                        {categories.map((cat) => (
                            <TabsTrigger
                                key={cat.key}
                                value={cat.key}
                                className="flex items-center gap-2 data-[state=active]:bg-cyan-500  transition-all cursor-pointer"
                            >
                                {cat.icon} {cat.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {/* Tabs Content */}
                    <TabsContent value={activeCategory}>
                        {loading ? (
                            <div className="flex justify-center py-10">
                                <Loader2 className="w-8 h-8 text-cyan-500 animate-spin" />
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {filteredProducts.length > 0 ? (
                                    filteredProducts.map((item) => (
                                        <Card
                                        onClick={() => router.push(`/products/${item._id}`)}
                                            key={item._id}
                                            className="group cursor-pointer text-center border-2 transition-all duration-300 hover:translate-y-1 hover:-translate-x-1 hover:shadow-lg"
                                        >
                                            <CardHeader className="flex flex-col items-center space-y-2">
                                                <Image
                                                    width={300}
                                                    height={300}
                                                    src={item.image || "/placeholder.png"}
                                                    alt={item.title}
                                                    className="w-full h-48 object-cover rounded-md"
                                                />
                                                <CardTitle className="text-lg font-semibold text-cyan-600">
                                                    {item.title}
                                                </CardTitle>
                                                <CardDescription className="text-gray-600 text-sm line-clamp-2">
                                                    {item.description}
                                                </CardDescription>
                                                <CardContent>
                                                    <p className="font-medium text-gray-800 mt-2">&#2547;{item.price}</p>
                                                </CardContent>
                                            </CardHeader>
                                        </Card>
                                    ))
                                ) : (
                                    <p className="text-center text-gray-500 col-span-full">
                                        No products found in this category.
                                    </p>
                                )}
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    );
};

export default Featured;
