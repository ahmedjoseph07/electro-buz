"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { AlertTriangle, MessageSquare, ClipboardList } from "lucide-react"

export default function Complain() {
  return (
    <section className="w-full min-h-screen flex flex-col justify-center items-center px-6 py-12 bg-white">
      <div className="max-w-2xl w-full text-center mb-8">
        <h2 className="text-3xl font-semibold mb-2 text-gray-800">Submit a Complaint</h2>
        <p className="text-gray-500">
          Facing any issues with our products or service? Please share your complaint — we’ll resolve it as soon as possible.
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
        <Input
          type="text"
          placeholder="Product name or order ID (optional)"
          className="border-cyan-500 focus:border-0"
        />
        <Textarea
          placeholder="Describe your issue or complaint"
          className="border-cyan-500 focus:border-0"
        />
        <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white">
          Submit Complaint
        </Button>
      </form>

      {/* --- Info Cards Below Form --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
        <Card className="text-center border-cyan-500 hover:shadow-md transition-all duration-300">
          <CardHeader>
            <AlertTriangle className="mx-auto text-cyan-600 w-8 h-8 mb-2" />
            <CardTitle>Quality Issues</CardTitle>
            <CardDescription>
              Report damaged or faulty components you’ve received.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="text-center border-cyan-500 hover:shadow-md transition-all duration-300">
          <CardHeader>
            <MessageSquare className="mx-auto text-cyan-600 w-8 h-8 mb-2" />
            <CardTitle>Service Feedback</CardTitle>
            <CardDescription>
              Share your experience with our delivery or customer support.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="text-center border-cyan-500 hover:shadow-md transition-all duration-300">
          <CardHeader>
            <ClipboardList className="mx-auto text-cyan-600 w-8 h-8 mb-2" />
            <CardTitle>Order Concerns</CardTitle>
            <CardDescription>
              Let us know if there’s a delay or issue with your order.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </section>
  )
}
