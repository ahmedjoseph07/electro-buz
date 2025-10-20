"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { addToCart, decrementQuantity, removeFromCart } from "@/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";

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

  return (
    <section className="py-10 mt-20 flex flex-col items-center px-6">
      <div className="text-center max-w-2xl mb-12">
        <h2 className="text-3xl font-bold text-gray-800">{product.title}</h2>
        <p className="text-gray-500 mt-2">
          Explore detailed information, specs & reviews
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-10 max-w-6xl w-full bg-white border border-cyan-500 rounded-2xl shadow-lg overflow-hidden">
        <div className="relative w-full md:w-1/2 h-96 md:h-auto">
          <Image
            src={
              product.image ||
              "https://via.placeholder.com/600x600?text=No+Image+Available"
            }
            alt={product.title}
            fill
            className="object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
          />
        </div>

        <div className="flex flex-col justify-between p-6 md:w-1/2">
          <div>
            <h3 className="text-2xl font-semibold text-cyan-600 mb-2">
              {product.title}
            </h3>
            <p className="text-gray-600 mb-4">{product.description}</p>

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
            {cartItem ? (
              <div className="flex items-center gap-3 border border-cyan-500 rounded-lg p-3">
                <Button
                  size="sm"
                  className="px-3"
                  onClick={() => dispatch(decrementQuantity(product._id))}
                >
                  <Minus/>
                </Button>

                <span className="text-lg font-semibold">
                  {cartItem.quantity}
                </span>

                <Button
                  size="sm"
                  className="px-3"
                  onClick={() => dispatch(addToCart(product))}
                >
                  <Plus/>
                </Button>

                <Button
                  size="sm"
                  variant="neutral"
                  className="ml-2"
                  onClick={() => dispatch(removeFromCart(product._id))}
                >
                <Trash2/>
                </Button>
              </div>
            ) : (
              <Button
                className="flex items-center gap-2 justify-center"
                onClick={() => dispatch(addToCart(product))}
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-6xl w-full mt-12 bg-white p-6 rounded-2xl shadow-sm border border-cyan-500">
        <Tabs defaultValue="description">
          <TabsList className="flex justify-center sm:gap-4 md:gap-10 border-b pb-2">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="pt-6 text-gray-700">
            <p>{product.description}</p>
          </TabsContent>
        </Tabs>
      </div>
      
    </section>
  );
}
