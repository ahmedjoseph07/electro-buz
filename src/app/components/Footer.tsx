"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, MapPin, Phone, Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-white/70 py-16 border-t border-cyan-400 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* About Section */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-cyan-600">About ElectroBuz⚡</h3>
                    <p className="text-gray-600 text-sm">
                        We empower students and makers with top-quality electronics, IoT, and robotics components. Fast delivery, affordable prices, and quality checked products every time.
                    </p>
                </div>

                {/* Newsletter Section */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-cyan-600">Subscribe to Newsletter</h3>
                    <p className="text-gray-600 text-sm">
                        Get updates on new products, offers, and tips for your projects.
                    </p>
                    <div className="flex flex-col lg:flex-row gap-4 mt-2">
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            className="border-cyan-500 focus:border-0"
                        />
                        <Button variant="neutral" >
                            Subscribe
                        </Button>
                    </div>
                </div>

                {/* Contact & Social Section */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-cyan-600">Contact Us</h3>
                    <p className="flex items-center gap-2 text-gray-600 text-sm">
                        <MapPin className="w-5 h-5 text-cyan-600" /> CUET Campus, Chittagong, Bangladesh
                    </p>
                    <p className="flex items-center gap-2 text-gray-600 text-sm">
                        <Phone className="w-5 h-5 text-cyan-600" /> +880 1234 567890
                    </p>
                    <p className="flex items-center gap-2 text-gray-600 text-sm">
                        <Mail className="w-5 h-5 text-cyan-600" /> support@electrobuz.com
                    </p>

                    <div className="flex gap-4 mt-4">
                        <a href="#" className="text-cyan-600 hover:text-cyan-500 transition-colors"><Facebook className="w-5 h-5" /></a>
                        <a href="#" className="text-cyan-600 hover:text-cyan-500 transition-colors"><Twitter className="w-5 h-5" /></a>
                        <a href="#" className="text-cyan-600 hover:text-cyan-500 transition-colors"><Instagram className="w-5 h-5" /></a>
                    </div>
                </div>
            </div>

            <div className="mt-10 text-center text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} ElectroBuz⚡. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
