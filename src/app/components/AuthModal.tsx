"use client";

import { useState, FormEvent } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Mail,
    Lock,
    User,
    LogIn,
    Loader2,
    LogInIcon,
} from "lucide-react";

export default function AuthModal() {
    const [loading, setLoading] = useState<boolean>(false);

    // --- Mocking auth handlers (will replace later with Firebase) ---
    const handleGoogleLogin = async (): Promise<void> => {
        setLoading(true);
        // firebase auth code will be here
        setTimeout(() => setLoading(false), 1500);
    };

    const handleEmailAuth = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);
        // email/password auth here
        setTimeout(() => setLoading(false), 1500);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="neutral">
                    <LogIn className="w-4 h-4 mr-2" /> Login
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-sm p-6">
                <DialogHeader>
                    <DialogTitle className="text-center text-2xl font-bold text-gray-800">
                        Welcome to <span className="text-cyan-500">ElectroBuz⚡</span>
                    </DialogTitle>
                </DialogHeader>

                <Tabs defaultValue="login" className="mt-4">
                    {/* Tabs header */}
                    <TabsList className="grid w-full grid-cols-2 mb-4">
                        <TabsTrigger value="login">Login</TabsTrigger>
                        <TabsTrigger value="signup">Register</TabsTrigger>
                    </TabsList>

                    {/* Login Form */}
                    <TabsContent value="login">
                        <form onSubmit={handleEmailAuth} className="space-y-4">
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 w-4 h-4 text-cyan-500" />
                                <Input
                                    type="email"
                                    placeholder="Email"
                                    className="pl-10 border-cyan-500 focus:border-0"
                                    required
                                />
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 w-4 h-4 text-cyan-500" />
                                <Input
                                    type="password"
                                    placeholder="Password"
                                    className="pl-10 border-cyan-500 focus:border-0"
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={loading}
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><LogInIcon />Login</>}
                            </Button>
                        </form>
                    </TabsContent>

                    {/* Signup Form */}
                    <TabsContent value="signup">
                        <form onSubmit={handleEmailAuth} className="space-y-4">
                            <div className="relative">
                                <User className="absolute left-3 top-3 w-4 h-4 text-cyan-500" />
                                <Input
                                    type="text"
                                    placeholder="Full Name"
                                    className="pl-10 border-cyan-500 focus:border-0"
                                    required
                                />
                            </div>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 w-4 h-4 text-cyan-500" />
                                <Input
                                    type="email"
                                    placeholder="Email"
                                    className="pl-10 border-cyan-500 focus:border-0"
                                    required
                                />
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 w-4 h-4 text-cyan-500" />
                                <Input
                                    type="password"
                                    placeholder="Password"
                                    className="pl-10 border-cyan-500 focus:border-0"
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white"
                                disabled={loading}
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign Up"}
                            </Button>
                        </form>
                    </TabsContent>
                </Tabs>

                {/* Divider */}
                <div className="flex items-center my-4">
                    <Separator className="flex-1" />
                    <span className="text-sm text-gray-400 px-3">OR</span>
                    <Separator className="flex-1" />
                </div>

                {/* Google Auth*/}
                <Button
                    onClick={handleGoogleLogin}
                    variant="neutral"
                    className="w-full flex items-center justify-center gap-2"
                    disabled={loading}
                >
                    {loading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <>
                            <img src="/google.png" alt="google-icon" className="w-4 h-4" /> Continue with Google
                        </>
                    )}
                </Button>

            </DialogContent>
        </Dialog>
    );
}
