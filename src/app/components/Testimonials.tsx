"use client";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
    {
        name: "Joseph Ahmed",
        position: "Petroleum Engineering Student, CUET",
        feedback:
            "The electronics kits from ElectroBuz⚡ helped me complete my university projects with ease. Great quality and fast delivery!",
        image: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
        name: "Ayub Bacchu",
        position: "CSE Student, BIUET",
        feedback:
            "I love how ElectroBuz offers affordable IoT and robotics components. Perfect for CUET students working on experiments and assignments.",
        image: "https://randomuser.me/api/portraits/men/65.jpg",
    },
    {
        name: "Anira Hasan",
        position: "Computer Science Student, RUET",
        feedback:
            "From Arduino boards to sensors, everything arrived quickly and worked perfectly. ElectroBuz is my go-to for electronics at CUET!",
        image: "https://randomuser.me/api/portraits/women/78.jpg",
    },
];

const Testimonials = () => {
    return (
        <section className="py-16 bg-gray-50 space-y-6">
            <h2 className="text-3xl font-bold text-center ">
                Users <span className="text-cyan-500">Testimonials</span>
            </h2>
            <p className="text-gray-500 text-center max-w-3xl mx-6 md:mx-auto ">
                Real stories, real satisfaction. See how ElectroBuz⚡ is helping students from CUET, BUET, RUET, KUET and many other universities succeed with electronics, IoT, and robotics projects.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 max-w-7xl mx-auto">
                {testimonials.map((t) => (
                    <Card
                        key={t.name}
                        className="group cursor-pointer text-center border-2 transition-all duration-300 
                                   hover:-translate-x-2 hover:translate-y-2 hover:shadow-[0_0_0] 
                                   active:translate-y-0 active:shadow-none"
                    >
                        <CardHeader className="flex flex-col items-center space-y-2">
                            <div className="flex justify-center mb-2">
                                <Image
                                    width={300}
                                    height={300}
                                    src={t.image}
                                    alt={t.name}
                                    className="w-20 h-20 rounded-full object-cover border-2 border-cyan-600"
                                />
                            </div>
                            <Quote className="text-2xl text-cyan-600 mb-2" />
                            <CardDescription className="text-gray-600 italic mb-2">
                                “{t.feedback}”
                            </CardDescription>
                            <CardTitle className="text-lg font-bold text-cyan-600">
                                {t.name}
                            </CardTitle>
                            <p className="text-sm text-gray-500">{t.position}</p>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
