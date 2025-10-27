import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { uid, email, displayName, photoURL } = body;

    if (!uid || !email) {
      return NextResponse.json({ error: "Missing UID or email" }, { status: 400 });
    }

    // check if user exists
    let user = await User.findOne({ uid });

    if (!user) {
      // new user → default role = "user"
      user = await User.create({
        uid,
        email,
        displayName: displayName || "",
        photoURL: photoURL || "",
        role: "user",
      });

      return NextResponse.json({ user }, { status: 201 });
    }

    // if user exists, update info if changed
    user.displayName = displayName || user.displayName;
    user.photoURL = photoURL || user.photoURL;
    await user.save();

    return NextResponse.json({ user }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
