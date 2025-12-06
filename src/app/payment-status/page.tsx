"use client";

import { Suspense } from "react";
import PaymentStatus from "./PaymentStatusClient";

export default function PaymentStatusPage() {
  return (
    <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
      <PaymentStatus />
    </Suspense>
  );
}
