"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar, User, Rss } from "lucide-react";

const Blogs = () => {
  const blogs = {
    robotics: [
      {
        title: "Building Your First Line Follower Robot",
        author: "Arif Hossain",
        date: "Oct 10, 2025",
        desc: "Learn how to design and assemble a simple line-following robot using IR sensors and Arduino.",
      },
      {
        title: "5 Mistakes Beginners Make in Robotics",
        author: "Rafiul Karim",
        date: "Sep 25, 2025",
        desc: "Avoid these common beginner errors and make your robotics journey smoother and more enjoyable.",
      },
    ],
    iot: [
      {
        title: "IoT in Everyday Life: Smart Solutions",
        author: "Tahsin Rahman",
        date: "Aug 30, 2025",
        desc: "Explore how IoT is revolutionizing homes, cities, and industries with real-time automation.",
      },
      {
        title: "How to Build a DIY Smart Door Lock System",
        author: "Fahim Chowdhury",
        date: "Jul 20, 2025",
        desc: "Create your own smart lock system using NodeMCU and Firebase integration.",
      },
    ],
    electronics: [
      {
        title: "Getting Started with Arduino",
        author: "Samiya Nahar",
        date: "Jun 14, 2025",
        desc: "A complete beginner-friendly guide to setting up Arduino and running your first project.",
      },
      {
        title: "Power Supply Basics for Makers",
        author: "Nayeem Khan",
        date: "May 9, 2025",
        desc: "Understand voltage, current, and power modules to keep your circuits safe and efficient.",
      },
    ],
  };

  return (
    <section className="py-10 mt-20 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-4">
        Our <span className="text-cyan-500">Blogs </span>
      </h2>
      <p className="max-w-3xl text-center text-gray-500 mx-6 md:mx-auto mb-10">
        Dive into the world of robotics, IoT, and electronics. Learn, explore, and
        stay inspired with our latest tech stories and tutorials.
      </p>

      <div className="max-w-6xl mx-auto px-6">
        <Tabs defaultValue="robotics" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8 bg-white border shadow-sm">
            <TabsTrigger
              value="robotics"
              className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white"
            >
              Robotics
            </TabsTrigger>
            <TabsTrigger
              value="iot"
              className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white"
            >
              IoT
            </TabsTrigger>
            <TabsTrigger
              value="electronics"
              className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white"
            >
              Electronics
            </TabsTrigger>
          </TabsList>

          {Object.entries(blogs).map(([key, posts]) => (
            <TabsContent key={key} value={key}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {posts.map((post) => (
                  <Card
                    key={post.title}
                    className="group cursor-pointer border-2 transition-all duration-300 
                              hover:-translate-x-2 hover:translate-y-2 hover:shadow-lg"
                  >
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold text-cyan-600 mb-2">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600 mb-3">
                        {post.desc}
                      </CardDescription>
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                          <User size={16} />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          <span>{post.date}</span>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <div className="text-center mt-12">
        <button className="px-6 py-2 bg-cyan-500 text-white font-medium rounded-full hover:bg-cyan-600 transition flex items-center gap-2 mx-auto">
          <Rss size={18} />
          View All Blogs
        </button>
      </div>
    </section>
  );
};

export default Blogs;
