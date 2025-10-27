"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ProductDoc } from "@/models/Product";
import { useEffect, useState } from "react";
import { ShoppingCart, Plus, Minus, Trash2, DollarSign, Search } from "lucide-react";
import Loader from "@/components/ui/loader";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { addToCart, removeFromCart, decrementQuantity } from "@/features/cart/cartSlice";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function Products() {
  const [products, setProducts] = useState<ProductDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const cartItems = useAppSelector((state) => state.cart.items);
  const [isClient, setIsClient] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState<"all" | "low" | "medium" | "high">("all");

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter((p) => {
    if (priceFilter === "low") return p.price < 50;
    if (priceFilter === "medium") return p.price >= 50 && p.price <= 200;
    if (priceFilter === "high") return p.price > 200;
    return true; // all
  });


  useEffect(() => {
    setIsClient(true);
  }, []);

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
    return (
      <div className="text-center py-20 text-gray-500">
        No products available at the moment.
      </div>
    );

  return (
    <section className="py-10 mt-20 bg-white space-y-10 flex flex-col items-center px-4 sm:px-6">
      {/* Header*/}
      <div className="text-center max-w-2xl">
        <h2 className="text-3xl font-bold text-gray-800">
          Explore Our <span className="text-cyan-500">Products</span>
        </h2>
        <p className="text-gray-500 mt-3">
          Find everything you need for your electronics, robotics, and IoT projects.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6 w-full max-w-7xl justify-between items-center">
        {/* Search */}
        <div className="relative w-full sm:w-1/2">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-10 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Search/>
          </span>
        </div>

        {/* Price Filter Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex cursor-pointer items-center gap-2 border border-gray-300 rounded-lg px-4 py-2">
            <span><DollarSign/></span>
            {priceFilter === "all" ? "Filter by Price" : priceFilter}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="cursor-pointer">
            <DropdownMenuItem className="cursor-pointer" onClick={() => setPriceFilter("all")}>All</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={() => setPriceFilter("low")}>Low (&lt; ৳50)</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={() => setPriceFilter("medium")}>Medium (৳50 - ৳200)</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={() => setPriceFilter("high")}>High (&gt; ৳200)</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>


      {/* Product Grid */}
      <div
        className="grid gap-6
          grid-cols-2 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4 
          max-w-7xl mx-auto w-full"
      >
        {filteredProducts.map((p) => {
          const cartItem = cartItems.find((item) => item._id === p._id);

          return (
            <Card
              key={p._id}
              onClick={() => router.push(`/products/${p._id}`)}
              className="group transition-all duration-300 
                hover:-translate-x-1 hover:translate-y-1 hover:shadow-lg 
                rounded-2xl flex flex-col justify-between aspect-square cursor-pointer"
            >
              {/* Image*/}
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

              {/* Content */}
              <div
                className="flex flex-col justify-between flex-1"
              >
                <CardHeader className="text-center px-3">
                  <CardTitle className="text-base sm:text-lg font-semibold text-cyan-600 line-clamp-1">
                    {p.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-sm line-clamp-2">
                    {/* Price */}
                    <span className="text-lg sm:text-xl font-extrabold text-cyan-600 mb-2 sm:mb-0">
                      &#2547;{p.price}
                    </span>
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex w-full mt-4 px-4 pb-4">
                  <div
                    className="flex flex-col sm:flex-row gap-4 mt-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {isClient && cartItem ? (
                      <div className="flex items-center gap-3 border border-cyan-500 rounded-lg p-2">
                        {/* Decrement */}
                        <Button
                          size="sm"
                          className="px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm"
                          onClick={() => dispatch(decrementQuantity(p._id))}
                        >
                          <Minus className="w-1 h-1 sm:w-4 sm:h-4" />
                        </Button>

                        {/* Quantity */}
                        <span className="text-sm sm:text-lg font-semibold">
                          {cartItem.quantity}
                        </span>

                        {/* Increment */}
                        <Button
                          size="sm"
                          className="px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm"
                          onClick={() => dispatch(addToCart(p))}
                        >
                          <Plus className="w-1 h-1 sm:w-4 sm:h-4" />
                        </Button>

                        {/* Remove */}
                        <Button
                          size="sm"
                          variant="neutral"
                          className="ml-2 px-2 hidden sm:block py-1 sm:px-3 sm:py-2 text-xs sm:text-sm"
                          onClick={() => dispatch(removeFromCart(p._id))}
                        >
                          <Trash2 className="w-1 h-1 sm:w-4 sm:h-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        className="flex items-center gap-2 justify-center px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm"
                        onClick={() => dispatch(addToCart(p))}
                      >
                        <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                        Add to Cart
                      </Button>
                    )}
                  </div>
                </CardContent>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
