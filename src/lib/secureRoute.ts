import { NextRequest, NextResponse } from "next/server";

export function verifySafeRequest(req: NextRequest) {
  const origin = req.headers.get("origin");
  const fetchMode = req.headers.get("sec-fetch-mode");
  const acceptHeader = req.headers.get("accept") || "";

  const allowedOrigins = [
    "http://localhost:3000",
    "https://www.electrobuz.com",
    "https://electrobuz.com",
  ];

  // Allow same-origin requests (no Origin header)
  if (!origin) {
    // But if it's a GET & direct browser visit (navigate), block
    if (req.method === "GET" && fetchMode !== "cors" && !acceptHeader.includes("application/json")) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return null; 
  }

  // Block requests from unknown origins
  if (!allowedOrigins.includes(origin)) {
    return NextResponse.json(
      { success: false, message: "Unauthorized origin" },
      { status: 403 }
    );
  }

  // Block direct browser visits and Postman (fetch-mode check)
  if (fetchMode && fetchMode !== "cors") {
    return NextResponse.json(
      { success: false, message: "Forbidden access" },
      { status: 403 }
    );
  }

  return null;
}
