"use client";

import React, { useEffect, useState } from "react";
import { removeFromCart, setQuantity, clearCart } from "@/features/cart/cartSlice";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { ArrowRightCircle, CircleX, Minus, Plus, Trash } from "lucide-react";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((s) => s.cart.items);
  const total = items.reduce((sum, it) => sum + it.price * it.quantity, 0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  if (!isClient) {
    return <div className="py-20 text-center text-gray-500">Loading...</div>;
  }

  if (!items.length) {
    return <div className="py-20 text-center text-gray-500">Your cart is empty.</div>;
  }

  return (
    <div className="max-w-5xl mx-4 lg:mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      <div className="space-y-4">
        {items.map((it) => (
          <div key={it._id} className="flex gap-4 flex-col sm:flex-row items-center border border-cyan-500 border-dashed rounded-lg p-4">
            <div className="w-24 h-24 bg-gray-100 flex items-center justify-center rounded">
              {it.image ? (
                <Image src={it.image} alt={it.title} width={96} height={96} className="object-cover rounded" />
              ) : (
                <div className="text-sm text-gray-400">No image</div>
              )}
            </div>

            <div className="flex-1">
              <div className="font-semibold">{it.title}</div>
              <div className="text-sm text-gray-500">{it.description}</div>
              <div className="font-bold my-2">&#2547;{it.price.toFixed(2)}</div>
            </div>

            <div className="flex flex-col justify-start gap-2">
              {/* Increment-Decrement Buttons */}
              <div className="flex items-center gap-4 border p-3 rounded-lg border-cyan-500">
                <div className="flex items-center rounded-md">
                  <Button
                    size="icon"
                    onClick={() =>
                      dispatch(
                        setQuantity({ id: it._id, quantity: Math.max(1, it.quantity - 1) })
                      )
                    }
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-10 text-center font-medium select-none">
                    {it.quantity}
                  </span>
                  <Button
                    size="icon"
                    onClick={() =>
                      dispatch(setQuantity({ id: it._id, quantity: it.quantity + 1 }))
                    }
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <Button variant="neutral" size="sm" onClick={() => dispatch(removeFromCart(it._id))}>
                  <Trash />
                </Button>
              </div>


            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 w-full mx-4 lg:mx-auto flex flex-col justify-between items-center lg:items-end">
        <div className="text-lg font-semibold my-2">Total: &#2547;{total.toFixed(2)}</div>
        <div className="flex gap-4">
          <Button variant="neutral" onClick={() => dispatch(clearCart())}><CircleX /> Clear Cart</Button>
          <Button><ArrowRightCircle /> Checkout</Button>
        </div>
      </div>
    </div>
  );
}
