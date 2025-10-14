"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { ProductDoc } from "@/models/Product";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export default function ProductDetails() {
    const params = useParams();
    const productId = params.id;

    const [product, setProduct] = useState<ProductDoc | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProduct() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${productId}`);
                if (!res.ok) throw new Error("Failed to fetch product");
                const data: ProductDoc = await res.json();
                setProduct(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        if (productId) fetchProduct();
    }, [productId]);

    if (loading) return <div className="text-center py-20">Loading...</div>;
    if (!product) return <div className="text-center py-20 text-red-500">Product not found</div>;

    return (
        <section className="py-10 px-6 max-w-5xl mx-auto flex flex-col md:flex-row gap-10 bg-white mt-20">
            <div className="flex-1">
                <Image
                    src={product.image || `https://via.placeholder.com/400x400?text=No+Image`}
                    width={400}
                    height={400}
                    alt={product.title}
                    className="w-full h-auto object-cover rounded-2xl"
                />
            </div>

            <div className="flex-1 flex flex-col gap-4">
                <h1 className="text-3xl font-bold text-cyan-600">{product.title}</h1>
                <p className="text-gray-600">{product.description}</p>
                <span className="text-2xl font-extrabold text-cyan-600">&#2547;{product.price}</span>

                <Button className="mt-4 flex items-center gap-2 w-max">
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                </Button>
            </div>
        </section>
    );
}
