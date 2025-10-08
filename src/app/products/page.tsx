"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Arduino Uno R3",
    description: "Perfect for beginners and prototyping IoT projects.",
    price: "৳850",
    image: "https://m.media-amazon.com/images/I/61lz8nZrFAL._AC_SL1500_.jpg",
  },
  {
    id: 2,
    name: "Raspberry Pi 4 Model B",
    description: "A mini-computer for robotics and embedded systems.",
    price: "৳6500",
    image: "https://m.media-amazon.com/images/I/61E2g8A+uJL._AC_SL1500_.jpg",
  },
  {
    id: 3,
    name: "NodeMCU ESP8266",
    description: "WiFi-enabled microcontroller for IoT projects.",
    price: "৳480",
    image: "https://m.media-amazon.com/images/I/61zTqgQZkJL._AC_SL1500_.jpg",
  },
  {
    id: 4,
    name: "Ultrasonic Sensor HC-SR04",
    description: "Measures distance using ultrasonic waves.",
    price: "৳220",
    image: "https://m.media-amazon.com/images/I/61xW0vXqMfL._AC_SL1500_.jpg",
  },
  {
    id: 5,
    name: "L298N Motor Driver",
    description: "Dual H-Bridge motor driver for DC motors and robots.",
    price: "৳350",
    image: "https://m.media-amazon.com/images/I/61PZy66mD7L._AC_SL1500_.jpg",
  },
  {
    id: 6,
    name: "Breadboard 830 Points",
    description: "Reusable breadboard for easy circuit connections.",
    price: "৳180",
    image: "https://m.media-amazon.com/images/I/61zOhg9ZfyL._AC_SL1500_.jpg",
  },
]

export default function Products() {
  return (
    <section className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800">
          Explore Our <span className="text-cyan-500">Products</span>
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto mt-2">
          Find everything you need for your electronics, robotics, and IoT projects.
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {products.map((p) => (
          <Card
            key={p.id}
            className="group border-2 border-transparent hover:border-cyan-500 transition-all duration-300 flex flex-col"
          >
            <div className="overflow-hidden rounded-t-lg">
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-lg text-gray-800">{p.name}</CardTitle>
              <CardDescription className="text-gray-500">{p.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between items-center mt-auto">
              <span className="text-xl font-semibold text-cyan-600">{p.price}</span>
              <Button className="bg-cyan-500 hover:bg-cyan-600 text-white flex items-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
