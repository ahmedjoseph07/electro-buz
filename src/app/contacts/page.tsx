"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Mail, Phone, MapPin } from "lucide-react"

export default function Contacts() {
  return (
    <section className="w-full min-h-screen flex flex-col justify-center items-center px-6 py-12 bg-white">
      <div className="max-w-2xl w-full text-center mb-8">
        <h2 className="text-3xl font-semibold mb-2 text-gray-800">Contact Us</h2>
        <p className="text-gray-500">
          Have questions about our electronics or robotics components? Reach out — we’d love to hear from you!
        </p>
      </div>

      <form className="w-full max-w-xl space-y-5 mb-12">
        <Input
          type="text"
          placeholder="Enter your name"
          className="border-cyan-500 focus:border-0"
        />
        <Input
          type="email"
          placeholder="Enter your email"
          className="border-cyan-500 focus:border-0"
        />
        <Textarea
          placeholder="Your message"
          className="border-cyan-500 focus:border-0"
        />
        <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white">
          Send Message
        </Button>
      </form>

      {/* --- Info Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
        <Card className="text-center border-cyan-500 hover:shadow-md transition-all duration-300">
          <CardHeader>
            <Mail className="mx-auto text-cyan-600 w-8 h-8 mb-2" />
            <CardTitle>Email</CardTitle>
            <CardDescription>support@electrobuz.com</CardDescription>
          </CardHeader>
        </Card>

        <Card className="text-center border-cyan-500 hover:shadow-md transition-all duration-300">
          <CardHeader>
            <Phone className="mx-auto text-cyan-600 w-8 h-8 mb-2" />
            <CardTitle>Phone</CardTitle>
            <CardDescription>+880 1712-345678</CardDescription>
          </CardHeader>
        </Card>

        <Card className="text-center border-cyan-500 hover:shadow-md transition-all duration-300">
          <CardHeader>
            <MapPin className="mx-auto text-cyan-600 w-8 h-8 mb-2" />
            <CardTitle>Location</CardTitle>
            <CardDescription>CUET, Chittagong, Bangladesh</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </section>
  )
}
