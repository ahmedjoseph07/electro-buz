"use client";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { useEffect } from "react";
import { initializeAuthListener } from "@/features/auth/authListener";

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initializeAuthListener();
  }, []);

  return <Provider store={store}>{children}</Provider>;
}