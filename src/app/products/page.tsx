"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { ProductDoc } from "@/models/Product";
import { useEffect, useState } from "react";

export default function Products() {

    const [products, setProducts] = useState<ProductDoc[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`);
                if (!res.ok) throw new Error("Failed to fetch products");
                const data: ProductDoc[] = await res.json();
                setProducts(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    if (loading) return <div>Loading</div>;
    if (products.length === 0) return <div className="text-center py-20 text-gray-500">No products found.</div>;
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
                            key={p._id}
                            className="group cursor-pointer border-2 transition-all duration-300 
                                   hover:-translate-x-2 hover:translate-y-2 hover:shadow-[0_0_0]
                                   active:translate-y-0 active:shadow-none"
                        >
                            <div className="overflow-hidden rounded-t-2xl">
                                <Image
                                    width={300}
                                    height={300}
                                    src={p.image || `https://via.placeholder.com/300x300?text=No+Image`}
                                    alt={p.title}
                                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <CardHeader className="text-center mt-2">
                                <CardTitle className="text-lg font-semibold text-cyan-600">{p.title}</CardTitle>
                                <CardDescription className="text-gray-600 text-sm">{p.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex justify-between items-center px-6 pb-4 mt-auto">
                                <span className="text-xl font-extrabold text-cyan-600">&#2547;{p.price} {p.id}</span>
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
