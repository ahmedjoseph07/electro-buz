import admin from "./firebaseAdmin";
import { NextRequest } from "next/server";

export interface FirebaseAuthResult {
    valid: boolean;
    uid?: string;
    email?: string;
    message?: string;
}

export const verifyFirebaseToken = async (req: NextRequest): Promise<FirebaseAuthResult> => {
    try {
        const authHeader = req.headers.get("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return { valid: false, message: "No token provided" };
        }

        const idToken = authHeader.split(" ")[1];
        const decodedToken = await admin.auth().verifyIdToken(idToken);

        return { valid: true, uid: decodedToken.uid, email: decodedToken.email };
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Invalid token";
        return { valid: false, message };
    }
};
