"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function TermsPage() {
    return (
        <main className="min-h-screen mt-20 py-16 px-6">
            <div className="max-w-4xl mx-auto">
                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle className="text-cyan-700 text-2xl font-semibold">
                            বিক্রয় শর্তাবলী ও নীতিমালা (Terms & Conditions)
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-gray-700 space-y-6 text-sm leading-relaxed">
                        <section>
                            <h3 className="font-semibold text-cyan-600 text-lg mb-2">
                                ১. বিক্রয় চূড়ান্ত (All Sales Are Final)
                            </h3>
                            <p>
                                একবার কোনো পণ্য বিক্রি হয়ে গেলে তা বাতিল, ফেরত বা রিফান্ড করা যাবে না। তাই
                                অর্ডার করার আগে পণ্যের বিবরণ ও প্রয়োজনীয়তা ভালোভাবে যাচাই করে অর্ডার সম্পন্ন
                                করুন।
                            </p>
                        </section>

                        <section>
                            <h3 className="font-semibold text-cyan-600 text-lg mb-2">
                                ২. ত্রুটিপূর্ণ বা চালু না হওয়া পণ্য (Dead on Arrival - DOA Policy)
                            </h3>
                            <p>
                                যদি কোনো কম্পোনেন্ট ডেলিভারির পর চালু না হয় (Dead on Arrival হিসেবে প্রমাণিত হয়),
                                তবে গ্রাহককে অবশ্যই পণ্য প্রাপ্তির ৩ কার্যদিবসের মধ্যে আমাদের জানাতে হবে।
                                যাচাই প্রক্রিয়ার মাধ্যমে পণ্যটি প্রকৃতপক্ষে ত্রুটিপূর্ণ প্রমাণিত হলে, সেটি একই
                                পণ্য দ্বারা প্রতিস্থাপন (Replacement) করা হবে। রিফান্ড প্রদান করা হবে না।
                            </p>
                        </section>

                        <section>
                            <h3 className="font-semibold text-cyan-600 text-lg mb-2">
                                ৩. অর্ডার এবং পেমেন্ট (Order & Payment Policy)
                            </h3>
                            <p>
                                যখন কোনো অর্ডারের জন্য পেমেন্ট সম্পন্ন করা হয়, তখন সেটি আইনগতভাবে বাধ্যতামূলক
                                (Legally Binding Order) হিসেবে গণ্য হবে। পেমেন্টের পর অর্ডার বাতিল বা পরিবর্তনের
                                সুযোগ নেই।
                            </p>
                        </section>

                        <section>
                            <h3 className="font-semibold text-cyan-600 text-lg mb-2">
                                ৪. শিপমেন্ট এবং দায়বদ্ধতা (Shipping & Risk Policy)
                            </h3>
                            <p>
                                পণ্য একবার কুরিয়ার/কনসাইনমেন্টে হস্তান্তরের পর থেকে সমস্ত ঝুঁকি ক্রেতার
                                দায়িত্বে থাকবে। যদি শিপমেন্টে দেরি, হারানো বা ক্ষতির ঘটনা ঘটে, সেটির জন্য
                                বিক্রেতা দায়ী থাকবে না। ক্রেতাকে কুরিয়ার সার্ভিসের নিয়ম অনুযায়ী বিষয়টি অনুসন্ধান
                                করতে হবে।
                            </p>
                        </section>

                        <section>
                            <h3 className="font-semibold text-cyan-600 text-lg mb-2">
                                ৫. কম্পোনেন্ট সামঞ্জস্যতা ও ব্যবহার (Component Compatibility & Usage)
                            </h3>
                            <p>
                                সব কম্পোনেন্ট প্রোটোটাইপিং ও শেখার উদ্দেশ্যে সরবরাহ করা হয়। ক্রেতাকে নিজ
                                দায়িত্বে পণ্যের সামঞ্জস্যতা (Compatibility) যাচাই করতে হবে এবং প্রযুক্তিগত
                                দক্ষতা (Technical Skill) থাকতে হবে পণ্য ব্যবহারের জন্য। ভুল সংযোগ, অতিরিক্ত
                                ভোল্টেজ, বা ভুল ব্যবহারের কারণে কোনো ক্ষতি হলে বিক্রেতা দায়ী থাকবে না।
                            </p>
                        </section>

                        <section>
                            <h3 className="font-semibold text-cyan-600 text-lg mb-2">
                                ৬. দায়সীমা (Limitation of Liability)
                            </h3>
                            <p>
                                আমাদের দায়িত্ব কেবলমাত্র ক্রয়কৃত পণ্যের মূল্যের মধ্যে সীমাবদ্ধ। কোনো পরোক্ষ
                                ক্ষতি, প্রকল্পের ব্যর্থতা বা তথ্য হারানোর জন্য আমরা দায় নেব না।
                            </p>
                        </section>

                        <section>
                            <h3 className="font-semibold text-cyan-600 text-lg mb-2">
                                ৭. শিক্ষা ও গবেষণা উদ্দেশ্যে ব্যবহার (Educational & Experimental Use)
                            </h3>
                            <p>
                                এই পণ্যগুলো শিক্ষামূলক, গবেষণা ও প্রোটোটাইপ উন্নয়ন উদ্দেশ্যে ব্যবহারযোগ্য।
                                বাণিজ্যিক উৎপাদনের জন্য ব্যবহারের আগে ক্রেতাকে নিজস্বভাবে পণ্যের কর্মক্ষমতা যাচাই
                                করতে হবে।
                            </p>
                        </section>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
