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
import { googleLogin, loginUser, registerUser } from "@/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../hook";

export default function AuthModal() {
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector((s) => s.auth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [isLogin, setIsLogin] = useState(true);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isLogin) {
            dispatch(loginUser({ email, password }));
        } else {
            dispatch(registerUser({ email, password, displayName: name }));
        }
    };

    const handleGoogle = () => {
        dispatch(googleLogin());
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

                    <TabsContent value="login">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 w-4 h-4 text-cyan-500" />
                                <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className="pl-10 border-cyan-500 focus:border-0" required />
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 w-4 h-4 text-cyan-500" />
                                <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="pl-10 border-cyan-500 focus:border-0" required />
                            </div>

                            {error && <p className="text-sm text-red-500">{error}</p>}

                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Login"}
                            </Button>
                        </form>
                    </TabsContent>

                    <TabsContent value="signup">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="relative">
                                <User className="absolute left-3 top-3 w-4 h-4 text-cyan-500" />
                                <Input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Full Name" className="pl-10 border-cyan-500 focus:border-0" required />
                            </div>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 w-4 h-4 text-cyan-500" />
                                <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className="pl-10 border-cyan-500 focus:border-0" required />
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 w-4 h-4 text-cyan-500" />
                                <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="pl-10 border-cyan-500 focus:border-0" required />
                            </div>

                            {error && <p className="text-sm text-red-500">{error}</p>}

                            <Button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600 text-white" disabled={loading}>
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

                <Button onClick={handleGoogle} variant="neutral" className="w-full flex items-center justify-center gap-2" disabled={loading}>
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <img src="/google.png" alt="google" className="w-4 h-4" />}
                    Continue with Google
                </Button>
            </DialogContent>
        </Dialog>
    );
}
