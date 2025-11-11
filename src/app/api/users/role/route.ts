import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { verifyFirebaseToken } from "@/lib/verifyToken";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    // Verify Firebase token
    // const { valid, message } = await verifyFirebaseToken(req);
    // if (!valid) {
    //   return NextResponse.json(
    //     { success: false, message: message! },
    //     { status: 401 }
    //   );
    // }

    const { searchParams } = new URL(req.url);
    const uid = searchParams.get("uid");

    if (!uid) {
      return NextResponse.json({ error: "UID is required" }, { status: 400 });
    }

    const user = await User.findOne({ uid });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ role: user.role }, { status: 200 });
  } catch (err) {
    console.error("Error fetching user role:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
