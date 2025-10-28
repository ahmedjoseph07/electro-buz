"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { addToCart, decrementQuantity, removeFromCart } from "@/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { useEffect, useState } from "react";
import Loader from "@/components/ui/loader";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import Link from "next/link";

interface ProductDetailsProps {
  product: {
    _id: string;
    title: string;
    description: string;
    price: number;
    image?: string;
    category?: string;
  };
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const dispatch = useAppDispatch();
  const cartItem = useAppSelector((state) =>
    state.cart.items.find((item) => item._id === product._id)
  );

  const [isClient, setIsClient] = useState(false);
  const [allProducts, setAllProducts] = useState<ProductDetailsProps["product"][]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => setIsClient(true), []);
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data: ProductDetailsProps["product"][] = await res.json();
        setAllProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (!isClient || loading) return <Loader />;

  // Filter similar category products
  const similarProducts = allProducts.filter(
    (p) => p.category === product.category && p._id !== product._id
  );

  return (
    <section className="py-10 mt-20 flex flex-col items-center px-6 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mb-12">
        <h2 className="text-3xl font-bold text-gray-800">{product.title}</h2>
        <p className="text-gray-500 mt-2">
          Explore detailed information, specs, diagrams & reviews
        </p>
      </div>

      {/* Main Product + Similar Products */}
      <div className="flex flex-col lg:flex-row gap-10 max-w-6xl w-full">
        {/* Product Info (Image + Details + Cart Buttons) */}
        <div className="flex-1 flex flex-col md:flex-row bg-white border border-cyan-500 rounded-2xl shadow-lg overflow-hidden" style={{ minHeight: "400px" }}>
          {/* Image */}
          <div className="relative w-full md:w-1/2 h-96 md:h-[400px] flex-shrink-0">
            <Image
              src={product.image || "https://via.placeholder.com/600x600?text=No+Image+Available"}
              alt={product.title}
              fill
              className="object-contain rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
            />
          </div>

          {/* Info & Cart */}
          <div className="flex flex-col justify-between p-6 md:w-1/2">
            <div>
              <h3 className="text-2xl font-semibold text-cyan-600 mb-2">{product.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-4">{product.description}</p>
              <p className="text-3xl font-extrabold text-cyan-600 mb-4">৳{product.price}</p>
              <p className="text-sm text-gray-600 mb-2">
                Category: <span className="font-medium">{product.category || "Uncategorized"}</span>
              </p>
            </div>

            {/* Cart Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              {isClient && cartItem ? (
                <div className="flex items-center gap-3 border border-cyan-500 rounded-lg p-3">
                  <Button size="sm" className="px-3" onClick={() => dispatch(decrementQuantity(product._id))}>
                    <Minus />
                  </Button>
                  <span className="text-lg font-semibold">{cartItem.quantity}</span>
                  <Button size="sm" className="px-3" onClick={() => dispatch(addToCart(product))}>
                    <Plus />
                  </Button>
                  <Button size="sm" variant="neutral" className="ml-2" onClick={() => dispatch(removeFromCart(product._id))}>
                    <Trash2 />
                  </Button>
                </div>
              ) : (
                <Button className="flex items-center gap-2 justify-center" onClick={() => dispatch(addToCart(product))}>
                  <ShoppingCart className="w-4 h-4" /> Add to Cart
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Similar Products</h3>
            <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto">
              {similarProducts.map((p) => (
                <HoverCard key={p._id}>
                  <HoverCardTrigger asChild>
                    <Link
                      href={`/products/${p._id}`}
                      className="flex items-center gap-3 p-3 border border-cyan-500 rounded-lg hover:shadow-lg transition-all duration-300"
                    >
                      <div className="overflow-hidden w-20 h-20 rounded-md bg-gray-100 flex-shrink-0 flex justify-center items-center">
                        <Image
                          width={80}
                          height={80}
                          src={p.image || "https://via.placeholder.com/80x80?text=No+Image"}
                          alt={p.title}
                          className="object-contain w-full h-full"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-cyan-600 line-clamp-1">{p.title}</span>
                        <span className="text-gray-600 text-sm line-clamp-1">৳{p.price}</span>
                      </div>
                    </Link>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-60">
                    <p className="text-gray-700 text-sm">{p.description}</p>
                  </HoverCardContent>
                </HoverCard>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Tabs Section */}
      <div className="max-w-6xl w-full mt-12 bg-white p-6 rounded-2xl shadow-sm border border-cyan-500">
        <Tabs defaultValue="details">
          <TabsList className="flex justify-center sm:gap-4 md:gap-10 border-b pb-2">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="diagrams">Diagrams</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="pt-6 text-gray-700">
            <p>{product.description}</p>
          </TabsContent>
          <TabsContent value="diagrams" className="pt-6 text-gray-700">
            <p>Diagrams and technical illustrations</p>
          </TabsContent>
          <TabsContent value="reviews" className="pt-6 text-gray-700">
            <p>Reviews + Comments </p>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
