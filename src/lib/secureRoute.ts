// src/lib/secureRequest.ts
import { NextRequest, NextResponse } from "next/server";

export function verifySafeRequest(req: NextRequest) {
  const origin = req.headers.get("origin");
  const fetchMode = req.headers.get("sec-fetch-mode");
  const acceptHeader = req.headers.get("accept") || "";

  const allowedOrigins = [
    "http://localhost:3000",
    "https://electrobuz.com",
    "https://www.electrobuz.com",
  ];

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    const res = NextResponse.json({}, { status: 200 });
    if (origin && allowedOrigins.includes(origin)) {
      res.headers.set("Access-Control-Allow-Origin", origin);
      res.headers.set("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,OPTIONS");
      res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    }
    return res;
  }

  // Allow same-origin (no origin header)
  if (!origin) {
    if (req.method === "GET" && fetchMode !== "cors" && !acceptHeader.includes("application/json")) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return null;
  }

  // Block unknown origins
  if (!allowedOrigins.includes(origin)) {
    return NextResponse.json(
      { success: false, message: "Unauthorized origin" },
      { status: 403 }
    );
  }

  // Block direct browser visits / Postman
  if (fetchMode && fetchMode !== "cors") {
    return NextResponse.json(
      { success: false, message: "Forbidden access" },
      { status: 403 }
    );
  }

  // Add CORS headers for allowed origin
  const res = NextResponse.next();
  res.headers.set("Access-Control-Allow-Origin", origin);
  res.headers.set("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return res;
}
