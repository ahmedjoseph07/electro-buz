import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import User, { UserDoc } from "@/models/User";
import { connectDB } from "@/lib/mongodb";
import { verifyFirebaseToken } from "@/lib/verifyToken";

// Response types
interface SuccessResponse<T> {
  success: true;
  data: T;
}

interface ErrorResponse {
  success: false;
  message: string;
  error?: string;
}

// GET /api/users
export async function GET(req: NextRequest): Promise<NextResponse<SuccessResponse<UserDoc[]> | ErrorResponse>> {
  try {
    await connectDB();

    // Verify token
    const { valid, message } = await verifyFirebaseToken(req);
    if (!valid) return NextResponse.json({ success: false, message: message! }, { status: 401 });

    const users = await User.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: users });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : "Unknown error";
    console.error("GET /users error:", errMsg);
    return NextResponse.json({ success: false, message: "Failed to fetch users", error: errMsg }, { status: 500 });
  }
}