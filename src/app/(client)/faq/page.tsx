import Link from "next/link";
import { HelpCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = { title: "FAQ" };

const faqs = [
  {
    category: "Booking",
    questions: [
      {
        q: "How do I book a vehicle?",
        a: "Browse our vehicle collection, select your preferred car, choose your dates and pickup location, and complete the payment. You'll receive a confirmation email with all the details.",
      },
      {
        q: "Can I modify my booking after confirmation?",
        a: "Yes, you can modify your booking up to 12 hours before the pickup time. Changes to dates, location, or vehicle are subject to availability and price differences.",
      },
      {
        q: "What is the minimum rental duration?",
        a: "The minimum rental duration is 4 hours. For durations of 24 hours or more, daily pricing applies which is more economical.",
      },
      {
        q: "Do I need to return the car to the same location?",
        a: "Not necessarily. We support different pickup and drop-off locations across Delhi NCR. A nominal one-way fee may apply for different locations.",
      },
    ],
  },
  {
    category: "Payment & Pricing",
    questions: [
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit/debit cards, UPI, net banking, and popular wallets through Razorpay. Cash payments are not accepted.",
      },
      {
        q: "Is there a security deposit?",
        a: "Yes, a refundable security deposit of ₹2,000–₹10,000 (depending on the vehicle) is held at the time of booking and refunded within 48 hours of return.",
      },
      {
        q: "Are there any hidden charges?",
        a: "No hidden charges. Our pricing is fully transparent — fuel, tolls, and parking during your rental are the only additional costs borne by you.",
      },
      {
        q: "What is your cancellation policy?",
        a: "Free cancellation up to 24 hours before pickup. Cancellations within 24 hours incur a 25% fee. No-shows are charged the full amount.",
      },
    ],
  },
  {
    category: "Vehicle & Safety",
    questions: [
      {
        q: "What documents do I need?",
        a: "You'll need a valid driving license, a government-issued ID (Aadhaar/Passport), and be at least 21 years old. International visitors need an International Driving Permit.",
      },
      {
        q: "Are vehicles insured?",
        a: "Yes, all our vehicles come with comprehensive insurance. You can also opt for our Premium Insurance add-on for zero-deductible coverage.",
      },
      {
        q: "What if the car breaks down?",
        a: "We provide 24/7 roadside assistance. Call our support number and we'll send help immediately — or provide a replacement vehicle if needed.",
      },
      {
        q: "What is the fuel policy?",
        a: "Vehicles are provided with a full tank (or full charge for EVs). Please return with the same fuel level. Alternatively, opt for our Full Fuel Package add-on.",
      },
    ],
  },
  {
    category: "Account & Support",
    questions: [
      {
        q: "How do I track my booking?",
        a: "Log in to your account to view all active and past bookings. Active bookings include a real-time countdown timer showing your remaining rental time.",
      },
      {
        q: "Can I extend my booking?",
        a: "Yes! You can extend your booking directly from the booking timer page or by contacting our support team. Extension is subject to vehicle availability.",
      },
      {
        q: "How do I contact support?",
        a: "You can reach us 24/7 via WhatsApp, phone (+91 12345 67890), email (support@ryderx.in), or through the contact form on our website.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600/10">
          <HelpCircle className="h-7 w-7 text-blue-600" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Everything you need to know about renting with RyderX
        </p>
      </div>

      <div className="space-y-10">
        {faqs.map((section) => (
          <div key={section.category}>
            <h2 className="mb-4 text-xl font-bold text-blue-600">
              {section.category}
            </h2>
            <div className="space-y-3">
              {section.questions.map((faq) => (
                <Card key={faq.q} className="border shadow-sm">
                  <CardContent className="p-5">
                    <h3 className="font-semibold mb-2">{faq.q}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {faq.a}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <Card className="mt-12 border-0 bg-muted/50">
        <CardContent className="p-8 text-center">
          <h2 className="text-xl font-bold">Still have questions?</h2>
          <p className="mt-2 text-muted-foreground">
            Our team is always ready to help you out.
          </p>
          <Button className="mt-4" asChild>
            <Link href="/contact">
              Contact Support
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
