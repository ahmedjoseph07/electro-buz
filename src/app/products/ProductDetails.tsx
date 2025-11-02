"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Minus, Plus, ShoppingCart, Trash2, Search, ArrowLeft } from "lucide-react";
import { addToCart, decrementQuantity, removeFromCart } from "@/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { useEffect, useState } from "react";
import Loader from "@/components/ui/loader";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ProductDetailsProps {
  product: {
    _id: string;
    title: string;
    description: string;
    price: number;
    image?: string;
    category?: string;
    createdAt?: string | Date;
    updatedAt?: string | Date;
  };
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const cartItem = useAppSelector((state) =>
    state.cart.items.find((item) => item._id === product._id)
  );

  const [isClient, setIsClient] = useState(false);
  const [allProducts, setAllProducts] = useState<ProductDetailsProps["product"][]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

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

  // Apply search filter on all products
  const filteredProducts = allProducts.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // If user searches and no products found
  if (searchTerm && filteredProducts.length === 0) {
    return (
      <section className="py-20 bg-white flex flex-col items-center justify-center px-6">
        <div className="border mt-20 border-cyan-500 rounded-2xl shadow-lg p-10 text-center bg-white max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">No products found</h2>
          <p className="text-gray-500 mb-6">
            We couldn&apos;t find any products matching “{searchTerm}”.
          </p>
          <Button
            className="flex items-center gap-2 justify-center"
            onClick={() => {
              setSearchTerm("");

            }}
          >
            <ArrowLeft className="w-4 h-4" /> Go Back
          </Button>
        </div>
      </section>
    );
  }

  // Filter similar category products
  const similarProducts = allProducts.filter(
    (p) => p.category === product.category && p._id !== product._id
  );

  const serializeProduct = (p: typeof product) => ({
    ...p,
    _id: p._id?.toString(),
    createdAt: p.createdAt ? new Date(p.createdAt).toISOString() : null,
    updatedAt: p.updatedAt ? new Date(p.updatedAt).toISOString() : null,
  });


  return (
    <section className="py-10 bg-white mt-20 flex flex-col items-center px-20 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mb-6">
        <h2 className="text-3xl font-bold">
          Product <span className="text-cyan-500">Details</span>
        </h2>
        <p className="text-gray-500 mt-2">
          Explore detailed information, specs, diagrams & reviews
        </p>
      </div>

      {/* Global Search bar */}
      <div className="relative w-full max-w-md mb-6">
        <input
          type="text"
          placeholder="Search all products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-10 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <Search />
        </span>
      </div>

      {/* Show search results if searching */}
      {searchTerm ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl w-full">
          {filteredProducts.map((p) => (
            <HoverCard key={p._id}>
              <HoverCardTrigger asChild>
                <Link
                  href={`/products/${p._id}`}
                  className="flex flex-col items-center border border-cyan-500 rounded-xl p-4  transition-all duration-300"
                >
                  <div className="w-40 h-40 relative">
                    <Image
                      src={p.image || "https://via.placeholder.com/150x150?text=No+Image"}
                      alt={p.title}
                      fill
                      className="object-contain rounded-lg"
                    />
                  </div>
                  <div className="mt-3 text-center">
                    <p className="font-semibold text-cyan-600 line-clamp-1">{p.title}</p>
                    <p className="text-xl font-bold text-cyan-600">৳{p.price}</p>
                  </div>
                </Link>
              </HoverCardTrigger>
              <HoverCardContent className="w-60">
                <p className="text-gray-700 text-sm">{p.description}</p>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
      ) : (
        <>
          {/* Main Product + Similar Products */}
          <div className="flex md:flex-col flex-col-reverse lg:flex-row gap-10 max-w-6xl w-full">
            {/* Similar Products */}
            {similarProducts.length > 0 ? (
              <div className="lg:w-1/3">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Similar Products
                </h3>

                <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto">
                  {similarProducts.map((p) => (
                    <HoverCard key={p._id}>
                      <HoverCardTrigger asChild>
                        <Link
                          href={`/products/${p._id}`}
                          className="flex items-center gap-3 p-3 border border-cyan-500 rounded-lg transition-all duration-300"
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
                            <span className="text-sm font-semibold text-cyan-600 line-clamp-1">
                              {p.title}
                            </span>
                            <span className="text-cyan-600 text-xl font-bold line-clamp-1">
                              ৳{p.price}
                            </span>
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
            ) : (
              <div className="lg:w-1/3 flex border rounded-2xl cursor-pointer border-cyan-500 flex-col items-center justify-center min-h-[200px]">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Similar Products
                </h3>
                <p className="text-gray-500 italic text-center">
                  No similar products found
                </p>
              </div>
            )}

            {/* Product Info */}
            <div
              className="lg:w-2/3 flex flex-col md:flex-row bg-white border border-cyan-500 rounded-2xl shadow-lg overflow-hidden"
              style={{ minHeight: "400px" }}
            >
              {/* Image */}
              <div className="relative w-full md:w-1/2 h-96 md:h-[400px] flex-shrink-0">
                <Image
                  src={product.image || "https://via.placeholder.com/400x400?text=No+Image"}
                  alt={product.title}
                  fill
                  className="object-contain rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
                />
              </div>

              {/* Info & Cart */}
              <div className="flex flex-col justify-between p-6 md:w-1/2">
                <div>
                  <h3 className="text-2xl font-semibold text-cyan-600 mb-2">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-4">
                    {product.description}
                  </p>
                  <p className="text-3xl font-extrabold text-cyan-600 mb-4">
                    ৳{product.price}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    Category:{" "}
                    <span className="font-medium">
                      {product.category || "Uncategorized"}
                    </span>
                  </p>
                </div>

                {/* Cart Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  {isClient && cartItem ? (
                    <div className="flex items-center gap-3 border border-cyan-500 rounded-lg p-3">
                      <Button
                        size="sm"
                        className="px-3"
                        onClick={() => dispatch(decrementQuantity(product._id))}
                      >
                        <Minus />
                      </Button>
                      <span className="text-lg font-semibold">
                        {cartItem.quantity}
                      </span>
                      <Button
                        size="sm"
                        className="px-3"
                        onClick={() => dispatch(addToCart(serializeProduct(product)))}
                      >
                        <Plus />
                      </Button>
                      <Button
                        size="sm"
                        variant="neutral"
                        className="ml-2"
                        onClick={() => dispatch(removeFromCart(product._id))}
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      className="flex items-center gap-2 justify-center"
                      onClick={() => dispatch(addToCart(serializeProduct(product)))}
                    >
                      <ShoppingCart className="w-4 h-4" /> Add to Cart
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="max-w-6xl w-full mt-12 bg-white p-6 rounded-2xl shadow-sm border border-cyan-500">
            <Tabs defaultValue="spec">
              <TabsList className="flex justify-center sm:gap-4 md:gap-10 border-b pb-2">
                <TabsTrigger className="cursor-pointer" value="spec">
                  Specs
                </TabsTrigger>
                <TabsTrigger className="cursor-pointer" value="diagrams">
                  Diagrams
                </TabsTrigger>
                <TabsTrigger className="cursor-pointer" value="reviews">
                  Reviews
                </TabsTrigger>
              </TabsList>

              <TabsContent value="spec" className="pt-6 text-gray-700">
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
        </>
      )}
    </section>
  );
}
