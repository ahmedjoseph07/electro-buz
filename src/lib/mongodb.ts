import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

const cached: MongooseCache = (global as any).mongooseCache || {
  conn: null,
  promise: null,
};

export async function connectDB(): Promise<Mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongooseInstance) => mongooseInstance);
  }

  cached.conn = await cached.promise;
  (global as any).mongooseCache = cached;

  return cached.conn;
}
