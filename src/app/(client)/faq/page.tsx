import Link from "next/link";
import { HelpCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = { title: "FAQ" };

const faqs = [
  {
    category: "About Rydex",
    questions: [
      {
        q: "What is Rydex Car Private Limited?",
        a: "Rydex Car Private Limited is a self-drive car rental company that allows customers to rent cars for personal or business use without the need for a chauffeur. Our unique feature is our Damage Protection Plan, which ensures peace of mind by covering accidental damages during your trip.",
      },
      {
        q: "How is Rydex Car different from other self-drive car rental companies?",
        a: "Unlike other car rental services, Rydex provides: Minimum Value Damage Protection Plan (covering damages during your trip), affordable pricing with no hidden charges, a wide variety of cars from hatchbacks to Top Rated SUVs & MUVs, and easy booking through app/website with flexible rental durations.",
      },
      {
        q: "What types of cars are available at Rydex?",
        a: "We provide a wide range of cars to suit every need: Hatchbacks (budget-friendly), Sedans (comfortable family rides), SUVs (long trips & adventure), and Luxury cars (premium experience).",
      },
    ],
  },
  {
    category: "Damage Protection Plan",
    questions: [
      {
        q: "What is the Damage Protection Plan?",
        a: "Our Damage Protection Plan is designed to safeguard renters in case of accidental damage to the car during their trip. Instead of bearing the full repair cost, you only pay a minimum protection fee, and the rest is covered under our policy. This is unique to Rydex and ensures stress-free driving.",
      },
      {
        q: "What happens if the car is damaged during my trip?",
        a: "If you have opted for the Damage Protection Plan, you pay the minimum coverage amount. Without the plan, repair costs will be charged as per actual damages. In case of major accidents, insurance terms apply.",
      },
    ],
  },
  {
    category: "Booking & Requirements",
    questions: [
      {
        q: "Who can rent a car from Rydex?",
        a: "Anyone who meets the following conditions can rent: Minimum age of 21 years, must have a valid driving license (Indian or International), and must provide a valid ID proof (Aadhar/Passport/Company ID, etc.).",
      },
      {
        q: "How do I book a car?",
        a: "You can book easily through: Rydex Website (online booking), Rydex Mobile App, or Customer Support Line. Choose your car, select your rental duration, make payment, and your car will be ready at the pickup point.",
      },
      {
        q: "What documents do I need to rent a car?",
        a: "You'll need a valid driving license, any government-issued ID proof (Aadhar, Passport, Voter ID), and a security deposit (refundable) as per car category.",
      },
      {
        q: "Do you provide doorstep delivery and pickup?",
        a: "Yes! Rydex offers doorstep delivery and pickup at select locations for customer convenience.",
      },
      {
        q: "Can someone else drive the car I rented?",
        a: "Only the registered renter/driver is allowed to drive. Additional drivers must be declared at the time of booking with valid documents.",
      },
    ],
  },
  {
    category: "Pricing & Payment",
    questions: [
      {
        q: "What are the payment options available?",
        a: "We accept: Debit/Credit Cards, UPI/Net Banking, Wallet Payments, and Corporate Billing (for business clients).",
      },
      {
        q: "How does the security deposit work?",
        a: "A refundable security deposit is collected at the time of booking. This amount is refunded after the trip, provided there are no violations or damages beyond the chosen plan.",
      },
      {
        q: "Is fuel included in the rental price?",
        a: "Self-fuel option: Fuel level will be recorded at the time of pickup and must be returned with the same fuel level. Prepaid fuel option: Pay in advance for convenience.",
      },
      {
        q: "Is there a kilometer limit on trips?",
        a: "Yes, each booking comes with a free kilometer limit depending on the plan. Extra kilometers are charged at a fixed per-km rate.",
      },
      {
        q: "What if I return the car late?",
        a: "Late returns are charged on an hourly basis, and beyond a certain time, a full-day charge may apply.",
      },
    ],
  },
  {
    category: "Rental Plans & Travel",
    questions: [
      {
        q: "Do you offer long-term rentals?",
        a: "Yes, Rydex offers daily, weekly, and monthly rental plans for both individuals and corporates.",
      },
      {
        q: "Can I take the rented car outside the city or state?",
        a: "Yes, you can travel intercity and interstate, but you must inform us during booking. Applicable tolls, permits, and state taxes will be your responsibility.",
      },
    ],
  },
  {
    category: "Support & Assistance",
    questions: [
      {
        q: "Do you offer roadside assistance?",
        a: "Yes! Rydex provides 24/7 roadside assistance in case of breakdowns, flat tires, or emergencies during your trip.",
      },
      {
        q: "How do I contact Rydex support?",
        a: "Customer Care Number: 7303611292, Email: support@rydexcar.com, Website/App Chat Support.",
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
          Everything you need to know about renting with RydeX
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
