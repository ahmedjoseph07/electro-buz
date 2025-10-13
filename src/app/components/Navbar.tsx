'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Link from 'next/link';
import Image from 'next/image';
import { LogOut, MenuSquare, ShoppingCart, XCircle } from 'lucide-react';
import AuthModal from './AuthModal';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHook';
import { logoutUser } from '@/features/auth/authSlice';
import { toast } from 'sonner';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((s) => s.auth);

    const navLinks = [
        { title: 'Home', href: '/' },
        { title: 'Products', href: '/products' },
        { title: 'Complain', href: '/complain' },
        { title: 'Contacts', href: '/contacts' },
    ];

    const handleLogout = async () => {
        try {
            await dispatch(logoutUser()).unwrap();
            toast.success("Logged out successfully", {
                icon: <LogOut className="text-red-500 w-5 h-5" />,
            });
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Logout failed";
            toast.warning(message, { icon: <XCircle className="text-red-500 w-5 h-5" /> });
        };
    };

    return (
        <section className='fixed top-0 left-0 bg-white border-cyan-300 border-b-1 w-full px-4 z-50'>
            <nav className="max-w-7xl mx-auto py-4 gap-6 md:gap-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold cursor-pointer">
                    <Image
                        src="/logo.png"
                        alt="electro-buz"
                        width={250}
                        height={300}
                        priority
                        className="object-cover rounded-lg"
                    />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-6 items-center">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="relative font-medium transition-all duration-300 hover:scale-105
               after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-500 hover:after:w-full"
                        >
                            {link.title}
                        </Link>
                    ))}
                    <Button variant="noShadow" className='rounded-full'><ShoppingCart className="hover:scale-110" />Cart</Button>
                    <div>
                        {
                            user ? (<div>
                                <div className="flex items-center gap-3">
                                    <Image src={user.photoURL || "/avatar-placeholder.png"} alt="avatar" className="w-8 h-8 rounded-full" />
                                    <span className="text-sm">{user.displayName || user.email}</span>
                                    <Button variant="neutral" onClick={handleLogout}>
                                        Logout
                                    </Button>
                                </div>
                            </div>) : (
                                <div><AuthModal /></div>
                            )
                        }
                    </div>

                </div>

                {/* Mobile Menu */}
                <div className="md:hidden">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="noShadow" className="mt-3">
                                <MenuSquare />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-64 p-6">
                            <div className="border-b-2 mb-4">
                                <SheetTitle className="font-extrabold">Menu</SheetTitle>
                            </div>
                            <div className="flex flex-col gap-4">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="font-semibold hover:text-blue-600"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.title}
                                    </Link>
                                ))}

                                <div className={`flex ${user && "flex-col"} justify-center gap-4`}>
                                    <Button className={`w-1/2 ${user && "w-full"}`}><ShoppingCart /> Cart</Button>
                                    <div>
                                        {
                                            user ? (<div>
                                                <div className="flex items-center gap-3">
                                                    <Image src={user.photoURL || "/avatar-placeholder.png"} alt="avatar" className="w-8 h-8 rounded-full" />
                                                    <span className="text-sm">{user.displayName || user.email}</span>
                                                    <Button variant="neutral" onClick={handleLogout}>
                                                        Logout
                                                    </Button>
                                                </div>
                                            </div>) : (
                                                <AuthModal />
                                            )
                                        }
                                    </div>
                                </div>

                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>
        </section>

    );
}
