import { Car, Users, MapPin, Shield, Award, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { stats } from "@/lib/mock-data";

export const metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          About <span className="text-blue-600">RyderX</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          We&apos;re on a mission to make self-drive car rentals in Delhi NCR
          simple, affordable, and enjoyable. Founded in 2023, RyderX has quickly
          become the go-to choice for thousands of drivers across the region.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-16 grid grid-cols-2 gap-6 md:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-0 bg-blue-50 shadow-none">
            <CardContent className="p-6 text-center">
              <p className="text-3xl font-bold text-blue-600">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {stat.label}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Story */}
      <div className="mb-16 grid gap-12 lg:grid-cols-2 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              RyderX was born from a simple idea: renting a car in Delhi NCR
              shouldn&apos;t be complicated. Our founders, avid travelers
              themselves, faced the frustration of opaque pricing, poorly
              maintained vehicles, and cumbersome booking processes.
            </p>
            <p>
              We set out to build a platform that puts the customer first —
              transparent pricing, meticulously maintained vehicles, and a
              booking experience that takes minutes, not hours. Today, we serve
              thousands of happy customers every month across Delhi, Gurugram,
              Noida, and beyond.
            </p>
            <p>
              Whether you need a compact hatchback for city errands, a sturdy
              SUV for a weekend getaway, or a luxury sedan for a special
              occasion, RyderX has you covered.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            {
              icon: Car,
              title: "150+ Vehicles",
              desc: "Diverse fleet across all segments",
            },
            {
              icon: MapPin,
              title: "10+ Locations",
              desc: "Pickup points across Delhi NCR",
            },
            {
              icon: Shield,
              title: "Fully Insured",
              desc: "Comprehensive coverage on all rentals",
            },
            {
              icon: Clock,
              title: "24/7 Support",
              desc: "Always here when you need us",
            },
          ].map((item) => (
            <Card key={item.title} className="border shadow-sm">
              <CardContent className="p-5">
                <item.icon className="mb-3 h-8 w-8 text-blue-600" />
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {item.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Values */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Our Values</h2>
        <p className="text-muted-foreground">What drives us every day</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3 mb-16">
        {[
          {
            icon: Award,
            title: "Quality First",
            desc: "Every vehicle in our fleet is regularly serviced, deep-cleaned, and inspected. We never compromise on the condition of our cars.",
          },
          {
            icon: Users,
            title: "Customer Obsessed",
            desc: "From transparent pricing to 24/7 support, every decision we make is centered around delivering the best experience for you.",
          },
          {
            icon: Shield,
            title: "Trust & Safety",
            desc: "Full insurance coverage, verified drivers, GPS tracking, and 24/7 roadside assistance ensure you're always safe on the road.",
          },
        ].map((value) => (
          <Card key={value.title} className="border-0 bg-muted/50">
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600/10">
                <value.icon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{value.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {value.desc}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Service Areas */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 to-blue-950 p-8 text-center sm:p-12">
        <h2 className="text-3xl font-bold text-white mb-3">
          Serving Delhi NCR
        </h2>
        <p className="text-slate-300 mb-6">
          Available across all major hubs in the National Capital Region
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {[
            "New Delhi",
            "Gurugram",
            "Noida",
            "Greater Noida",
            "Faridabad",
            "Ghaziabad",
            "Dwarka",
            "Aerocity",
            "Connaught Place",
            "Karol Bagh",
          ].map((city) => (
            <span
              key={city}
              className="rounded-full bg-white/10 px-4 py-1.5 text-sm text-white"
            >
              {city}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
