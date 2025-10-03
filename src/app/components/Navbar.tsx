'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Link from 'next/link';
import Image from 'next/image';
import { LogIn, MenuSquare, ShoppingCart } from 'lucide-react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { title: 'Home', href: '/' },
        { title: 'Products', href: '/products' },
        { title: 'Complain', href: '/complain' },
        { title: 'Contact Us', href: '/contact-us' },
    ];

    return (
        <nav className="w-full border-b-1 px-6 py-4 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold hover:scale-105 duration-300 transition-all">
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
                <Button className='rounded-full'><ShoppingCart />Cart</Button>
                <Button className="bg-blue-600 text-white hover:bg-blue-700">
                    <LogIn /> Login
                </Button>
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
                            <Button><ShoppingCart /> Cart</Button>
                            <Button className="bg-blue-600 text-white hover:bg-blue-700">
                                <LogIn /> Login
                            </Button>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </nav>
    );
}
