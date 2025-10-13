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
import { Mail, Lock, User, LogIn, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";
import { googleLogin, loginUser, registerUser} from "@/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import Image from "next/image";

export default function AuthModal() {
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector((s) => s.auth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [isLogin, setIsLogin] = useState(true);

    const validateInputs = () => {
        if (!email.trim() || !password.trim()) {
            toast.warning("Email and password are required", {
                icon: <XCircle className="text-red-500 w-5 h-5" />,
            });
            return false;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            toast.warning("Please enter a valid email address", {
                icon: <XCircle className="text-red-500 w-5 h-5" />,
            });
            return false;
        }

        if (password.length < 6) {
            toast.warning("Password must be at least 6 characters", {
                icon: <XCircle className="text-red-500 w-5 h-5" />,
            });
            return false;
        }

        if (!isLogin && !name.trim()) {
            toast.warning("Please enter your full name", {
                icon: <XCircle className="text-red-500 w-5 h-5" />,
            });
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateInputs()) return;

        try {
            if (isLogin) {
                await dispatch(loginUser({ email, password })).unwrap();
                toast.success("Welcome back", {
                    icon: <CheckCircle2 className="text-green-500 w-5 h-5" />,
                });
            } else {
                await dispatch(registerUser({ email, password, displayName: name })).unwrap();
                toast.success("Account created successfully", {
                    icon: <CheckCircle2 className="text-green-500 w-5 h-5" />,
                });
            }
        } catch (err: any) {
            toast.warning(err.message || "Invalid Credentials", {
                icon: <XCircle className="text-red-500 w-5 h-5" />,
            });
        }
    };

    // Google Login
    const handleGoogle = async () => {
        try {
            await dispatch(googleLogin()).unwrap();
            toast.success("Signed in with Google", {
                icon: <CheckCircle2 className="text-green-500 -5 h-5" />,
            });
        } catch (err: any) {
            toast.error(err.message || "Google login failed", {
                icon: <XCircle className="text-red-500 w-5 h-5" />,
            });
        }
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

                <Tabs defaultValue="login" onValueChange={(v) => setIsLogin(v === "login")}>
                    <TabsList className="grid w-full grid-cols-2 mb-4">
                        <TabsTrigger value="login">Login</TabsTrigger>
                        <TabsTrigger value="signup">Register</TabsTrigger>
                    </TabsList>

                    {/* Login TAB */}
                    <TabsContent value="login">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 w-4 h-4 text-cyan-500" />
                                <Input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    placeholder="Email"
                                    className="pl-10 border-cyan-500 focus:border-0"
                                />
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 w-4 h-4 text-cyan-500" />
                                <Input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    placeholder="Password"
                                    className="pl-10 border-cyan-500 focus:border-0"
                                />
                            </div>

                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Login"}
                            </Button>
                        </form>
                    </TabsContent>

                    {/* Register TAB */}
                    <TabsContent value="signup">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="relative">
                                <User className="absolute left-3 top-3 w-4 h-4 text-cyan-500" />
                                <Input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    type="text"
                                    placeholder="Full Name"
                                    className="pl-10 border-cyan-500 focus:border-0"
                                />
                            </div>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 w-4 h-4 text-cyan-500" />
                                <Input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    placeholder="Email"
                                    className="pl-10 border-cyan-500 focus:border-0"
                                />
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 w-4 h-4 text-cyan-500" />
                                <Input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    placeholder="Password"
                                    className="pl-10 border-cyan-500 focus:border-0"
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={loading}
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign Up"}
                            </Button>
                        </form>
                    </TabsContent>
                </Tabs>

                <div className="flex items-center my-4">
                    <div className="flex-1 border-t" />
                    <span className="text-sm text-gray-400 px-3">OR</span>
                    <div className="flex-1 border-t" />
                </div>

                {/* Google Login */}
                <Button
                    onClick={handleGoogle}
                    variant="neutral"
                    className="w-full flex items-center justify-center gap-2"
                    disabled={loading}
                >
                    {loading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <Image src="/google.png" alt="google" width={300} height={300} className="w-4 h-4" />
                    )}
                    Continue with Google
                </Button>
            </DialogContent>
        </Dialog>
    );
}