"use client";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, Facebook, Linkedin, Globe } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-white/70 py-16 border-t border-cyan-400 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* About Section */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-cyan-600">About ElectroBuz⚡</h3>
                    <p className="text-gray-600 text-sm">
                        We empower students and makers with top-quality electronics, IoT, and robotics components.
                        Fast delivery, affordable prices, and quality-checked products every time.
                    </p>
                </div>

                {/* Quick Links Section */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-cyan-600">Quick Links</h3>
                    <ul className="space-y-2 text-gray-600 text-sm">
                        <li>
                            <a
                                href="/terms"
                                className="hover:text-cyan-600 transition-colors"
                            >
                                Terms & Conditions
                            </a>
                        </li>
                        <li>
                            <a
                                href="/refund-policy"
                                className="hover:text-cyan-600 transition-colors"
                            >
                                Refund Policy
                            </a>
                        </li>
                        <li>
                            <a
                                href="/privacy-policy"
                                className="hover:text-cyan-600 transition-colors"
                            >
                                Privacy Policy
                            </a>
                        </li>
                        <li>
                            <a
                                href="/contact"
                                className="hover:text-cyan-600 transition-colors"
                            >
                                Contact Support
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Contact & Social Section */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-cyan-600">Contact Us</h3>
                    <p className="flex items-center gap-2 text-gray-600 text-sm">
                        <MapPin className="w-5 h-5 text-cyan-600" /> CUET Campus, Chittagong, Bangladesh
                    </p>
                    <p className="flex items-center gap-2 text-gray-600 text-sm">
                        <Phone className="w-5 h-5 text-cyan-600" /> +880 1878 904575
                    </p>
                    <p className="flex items-center gap-2 text-gray-600 text-sm">
                        <Mail className="w-5 h-5 text-cyan-600" /> cypherbangladesh@gmail.com
                    </p>

                    <div className="flex gap-4 mt-4">
                        <a
                            href="https://www.facebook.com/cypheredgebangladesh/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-600 hover:text-cyan-500 transition-colors"
                        >
                            <Facebook className="w-5 h-5" />
                        </a>
                        <a
                            href="https://www.linkedin.com/company/cypherbangladesh/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-600 hover:text-cyan-500 transition-colors"
                        >
                            <Linkedin className="w-5 h-5" />
                        </a>
                        <a
                            href="https://www.cypherbd.shop/home"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-600 hover:text-cyan-500 transition-colors"
                        >
                            <Globe className="w-5 h-5" />
                        </a>
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
