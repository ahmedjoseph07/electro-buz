"use client"
import { Button } from "@/components/ui/button";
import { Info, ShoppingBag } from "lucide-react";
import Image from "next/image";
import React from 'react';
import { Typewriter } from "react-simple-typewriter";

const Banner = () => {
    return (
        <section className="mt-20 py-10 bg-gray-50">
            <div className="flex flex-col-reverse md:flex-row lg:gap-20 justify-center gap-4 px-6 py-4">
                {/* Banner Details */}
                <div className="space-y-6 text-center">
                    {/* Heading */}
                    <h1 className="text-3xl lg:text-5xl font-bold mb-4">
                        Welcome to <span className="font-extrabold text-cyan-500 animate-pulse hover:animate-none">ElectroBuz</span>⚡
                    </h1>

                    {/* Description */}
                    <p className="text-xl font-bold mb-3">
                        Your trusted marketplace <br />{' '}
                        <span className="text-cyan-700 font-bold">
                            <Typewriter
                                words={['IoT modules', 'Robotics Kits', 'Smart Sensors', 'Electronics Gadgets']}
                                loop={0}
                                cursor
                                cursorStyle="|"
                                typeSpeed={80}
                                deleteSpeed={50}
                                delaySpeed={1500}
                            />
                        </span>

                    </p>
                    <p className="max-w-2xl text-gray-500 mx-auto mb-6">
                        Explore the latest gadgets, high-quality products, and reliable service — all in one place.
                        From daily essentials to cutting-edge devices, we bring technology closer to you.
                    </p>

                    {/* Buttons */}
                    <div className="flex gap-4 items-center justify-center">
                        <Button>
                           <ShoppingBag/> Shop Now
                        </Button>
                        <Button variant="neutral"> <Info/> Learn More</Button>
                    </div>
                </div>

                {/* Banner Image */}
                <div className="mb-8">
                    <Image
                        src="/banner.jpeg"
                        alt="ElectroBuz Banner"
                        width={300}
                        height={300}
                        className="mx-auto rounded-lg object-cover shadow-lg animate-pulse hover:animate-none"
                        priority
                    />

                </div>

            </div>

        </section>
    )
}

export default Banner;
