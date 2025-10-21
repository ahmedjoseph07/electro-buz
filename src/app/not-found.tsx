"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {

    return (
        <div className="flex justify-center bg-white items-center min-h-screen px-4">
            <Card
                className="w-full max-w-md text-center border-2 transition-all duration-300 
                   hover:-translate-x-2 hover:translate-y-2 hover:shadow-[0_0_0] 
                   active:translate-y-0 active:shadow-none"
            >
                <CardHeader className="flex flex-col items-center space-y-3">
                    <div className="flex justify-center mb-2">
                        <div className="bg-cyan-100 p-4 rounded-full border-2 border-cyan-500">
                            <AlertTriangle className="w-10 h-10 text-cyan-600" />
                        </div>
                    </div>
                    <CardTitle className="text-xl font-bold text-cyan-600">
                        Page Not Found
                    </CardTitle>
                    <CardDescription className="text-gray-600 italic max-w-sm mx-auto">
                        “Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.”
                        Let&apos;s get you back on track ⚡
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <div className="flex justify-center mt-4">
                        <Link href="/" className="flex gap-4">
                            <Button>
                                <Home className="mr-2 h-5 w-5" /> Go Home
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
