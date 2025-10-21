"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ProductDoc } from "@/models/Product";
import { useEffect, useState } from "react";
import Link from "next/link";
import { InfoIcon} from "lucide-react";
import Loader from "@/components/ui/loader";

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

    if (loading) return <Loader />;

    if (products.length === 0)
        return <div className="text-center py-20 text-gray-500">No products found.</div>;

    return (
        <section className="py-10 mt-20 bg-white space-y-10 flex flex-col items-center px-4 sm:px-6">
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
            <div
                className="grid gap-6 
                    grid-cols-2 
                    sm:grid-cols-2 
                    md:grid-cols-3 
                    lg:grid-cols-4 
                    max-w-7xl mx-auto w-full"
            >
                {products.map((p) => (
                    <Card
                        key={p._id}
                        className="group transition-all duration-300 
                       hover:-translate-x-1 hover:translate-y-1 hover:shadow-lg 
                       rounded-2xl flex flex-col justify-between aspect-square"
                    >
                        {/* --- Image --- */}
                        <div className="overflow-hidden flex justify-center items-center bg-gray-100 h-1/2 rounded-t-2xl">
                            <Image
                                width={300}
                                height={300}
                                src={p.image || "https://via.placeholder.com/300x300?text=No+Image"}
                                alt={p.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                loading="lazy"
                            />
                        </div>

                        {/* --- Content --- */}
                        <div className="flex flex-col justify-between flex-1">
                            <CardHeader className="text-center px-3">
                                <CardTitle className="text-base sm:text-lg font-semibold text-cyan-600 line-clamp-1">
                                    {p.title}
                                </CardTitle>
                                <CardDescription className="text-gray-600 text-sm line-clamp-2">
                                    {p.description}
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="flex w-full mt-4 px-4 pb-4">
                                <div className="flex w-full flex-col sm:flex-row sm:justify-between sm:items-center">
                                    {/* Price */}
                                    <span className="text-lg sm:text-xl font-extrabold text-cyan-600 mb-2 sm:mb-0">
                                        &#2547;{p.price}
                                    </span>

                                    {/* Details Button */}
                                    <Link href={`/products/${p._id}`} passHref>
                                        <Button variant="neutral" size="sm" className="px-3 py-1 w-full">
                                           <InfoIcon/> Details
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    );
}
