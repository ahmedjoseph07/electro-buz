"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useAppSelector } from "../hooks/reduxHook";
import { useEffect, useState } from "react";

export default function NavbarCart() {
  const items = useAppSelector((s) => s.cart.items);
  const totalQty = items.reduce((sum, it) => sum + it.quantity, 0);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    
    return (
      <Link href="/cart" className="relative inline-block">
        <ShoppingCart className="w-6 h-6 text-cyan-600" />
      </Link>
    );
  }


  return (
    <Link href="/cart" className="relative inline-flex items-center">
      <ShoppingCart className="w-6 h-6 text-cyan-600" />
      {totalQty > 0 && (
        <span className="absolute top-2 md:-top-2 font-xs -right-2 bg-cyan-500 text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {totalQty}
        </span>
      )}
    </Link>
  );
}
