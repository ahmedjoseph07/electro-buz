"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function PrivacyPage() {
    return (
        <main className="min-h-screen mt-20 py-16 px-6">
            <div className="max-w-4xl mx-auto">
                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle className="text-cyan-700 text-2xl font-semibold">
                            গোপনীয়তা নীতিমালা (Privacy Policy)
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-gray-700 space-y-6 text-sm leading-relaxed">
                        <p>
                            <span className="font-semibold text-cyan-700">Electrobuz</span> (“আমরা”, “আমাদের”, বা “কোম্পানি”)
                            আপনার গোপনীয়তা ও ব্যক্তিগত তথ্যের নিরাপত্তাকে সর্বোচ্চ গুরুত্ব দেয়। এই নীতিমালায় আমরা ব্যাখ্যা করেছি কীভাবে
                            আমরা আপনার তথ্য সংগ্রহ, ব্যবহার, সংরক্ষণ ও সুরক্ষা করি যখন আপনি আমাদের ওয়েবসাইট, মোবাইল অ্যাপ বা সেবা ব্যবহার করেন।
                        </p>

                        <section>
                            <h3 className="font-semibold text-cyan-600 text-lg mb-2">১. আমরা কোন তথ্য সংগ্রহ করি</h3>
                            <p>
                                আমরা শুধুমাত্র আমাদের সেবার মান উন্নয়নের জন্য প্রয়োজনীয় তথ্য সংগ্রহ করি, যেমনঃ
                            </p>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>ব্যক্তিগত তথ্য: নাম, ফোন নম্বর, ইমেইল ঠিকানা, ডেলিভারি ঠিকানা ইত্যাদি।</li>
                                <li>লেনদেন তথ্য: পেমেন্ট আইডি, অর্ডার ডিটেইলস, ইনভয়েস ইত্যাদি (কিন্তু আমরা কোনো ক্রেডিট কার্ড বা ব্যাংক পাসওয়ার্ড সংরক্ষণ করি না)।</li>
                                <li>টেকনিক্যাল তথ্য: ডিভাইস টাইপ, ব্রাউজার, অপারেটিং সিস্টেম, আইপি অ্যাড্রেস, এবং ওয়েবসাইট ব্যবহারের সময়কার আচরণ।</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="font-semibold text-cyan-600 text-lg mb-2">২. তথ্য ব্যবহারের উদ্দেশ্য</h3>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>অর্ডার প্রক্রিয়াকরণ ও পণ্য ডেলিভারি সম্পন্ন করা</li>
                                <li>গ্রাহক সাপোর্ট ও যোগাযোগ রক্ষা করা</li>
                                <li>পেমেন্ট যাচাই ও নিরাপত্তা বজায় রাখা</li>
                                <li>ওয়েবসাইট/অ্যাপের পারফরম্যান্স ও ব্যবহারকারীর অভিজ্ঞতা উন্নয়ন করা</li>
                                <li>প্রমোশনাল অফার, আপডেট ও নতুন পণ্য সম্পর্কিত তথ্য পাঠানো (আপনার সম্মতিতে)</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="font-semibold text-cyan-600 text-lg mb-2">৩. তথ্যের নিরাপত্তা</h3>
                            <p>
                                Electrobuz আধুনিক নিরাপত্তা ব্যবস্থা (SSL encryption, secure server access, two-step verification)
                                ব্যবহার করে আপনার তথ্য সুরক্ষিত রাখে। আমরা কখনোই আপনার ব্যক্তিগত তথ্য তৃতীয় পক্ষের কাছে বিক্রি, ভাড়া
                                বা প্রকাশ করি না — আইনগত বাধ্যবাধকতা ছাড়া।
                            </p>
                        </section>

                        <section>
                            <h3 className="font-semibold text-cyan-600 text-lg mb-2">৪. তৃতীয় পক্ষের সেবা (Third-Party Services)</h3>
                            <p>
                                আমাদের ওয়েবসাইটে কিছু তৃতীয় পক্ষের সেবা যেমন পেমেন্ট গেটওয়ে, কুরিয়ার সার্ভিস, বা অ্যানালিটিক্স টুলস
                                ব্যবহার করা হতে পারে। এই সেবা প্রদানকারীরা শুধুমাত্র তাদের নিজস্ব নীতিমালা অনুযায়ী তথ্য ব্যবহার করতে পারে এবং
                                Electrobuz এ বিষয়ে দায়ী নয়।
                            </p>
                        </section>

                        <section>
                            <h3 className="font-semibold text-cyan-600 text-lg mb-2">৫. কুকিজ (Cookies)</h3>
                            <p>
                                আমরা ওয়েবসাইটের কার্যকারিতা ও ব্যবহারকারীর অভিজ্ঞতা উন্নত করতে কুকিজ ব্যবহার করি।
                                আপনি চাইলে ব্রাউজার সেটিংস থেকে কুকিজ বন্ধ করতে পারেন, তবে এতে কিছু ফিচার সীমিত হতে পারে।
                            </p>
                        </section>

                        <section>
                            <h3 className="font-semibold text-cyan-600 text-lg mb-2">৬. ব্যবহারকারীর অধিকার (Your Rights)</h3>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>আপনার তথ্য দেখতে, আপডেট করতে বা মুছে ফেলতে পারেন</li>
                                <li>প্রমোশনাল ইমেইল বন্ধ করতে পারেন</li>
                                <li>গোপনীয়তা সম্পর্কিত কোনো অভিযোগ জানাতে পারেন</li>
                            </ul>
                            <p className="mt-2">
                                অনুগ্রহ করে আমাদের ইমেইলে যোগাযোগ করুন:{" "}
                                <span className="text-cyan-700 font-semibold">support@electrobuz.com</span>
                            </p>
                        </section>

                        <section>
                            <h3 className="font-semibold text-cyan-600 text-lg mb-2">৭. শিশুদের গোপনীয়তা</h3>
                            <p>
                                Electrobuz ১৩ বছরের নিচের শিশুদের থেকে ইচ্ছাকৃতভাবে কোনো তথ্য সংগ্রহ করে না। যদি ভুলবশত কোনো শিশু আমাদের কাছে
                                তথ্য পাঠায়, আমরা তা অবিলম্বে মুছে ফেলি।
                            </p>
                        </section>

                        <section>
                            <h3 className="font-semibold text-cyan-600 text-lg mb-2">৮. নীতিমালা পরিবর্তন</h3>
                            <p>
                                Electrobuz যে কোনো সময় এই Privacy Policy পরিবর্তন করতে পারে। নতুন সংস্করণ ওয়েবসাইটে প্রকাশিত হলে তা অবিলম্বে কার্যকর হবে।
                            </p>
                        </section>

                        <section>
                            <h3 className="font-semibold text-cyan-600 text-lg mb-2">৯. যোগাযোগ করুন</h3>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>support@electrobuz.com</li>
                                <li>www.electrobuz.com</li>
                                <li>Chattogram, Bangladesh</li>
                            </ul>
                        </section>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
