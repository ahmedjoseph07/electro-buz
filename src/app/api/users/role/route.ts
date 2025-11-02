import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(req: Request) {
  try {
    await connectDB();

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
