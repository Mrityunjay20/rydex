import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Car,
  Shield,
  Clock,
  MapPin,
  Star,
  ChevronRight,
  Search,
  CalendarDays,
  KeyRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { VehicleCard } from "@/components/vehicle-card";
import { vehicles, testimonials, stats, howItWorks } from "@/lib/mock-data";

export default function Home() {
  const featuredVehicles = vehicles.slice(0, 4);

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 to-slate-950/40" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="max-w-2xl">
            <Badge
              variant="secondary"
              className="mb-4 bg-blue-600/20 text-blue-300 border-blue-500/30"
            >
              #1 Car Rental in Delhi NCR
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Drive Your Way
              <br />
              <span className="text-blue-400">Across Delhi NCR</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-300">
              Choose from 150+ well-maintained cars. Self-drive rentals starting
              at just ₹120/hour. Book in minutes, drive in style.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="text-base" asChild>
                <Link href="/vehicles">
                  Browse Vehicles
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-600 bg-transparent text-white hover:bg-white/10 text-base"
                asChild
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-foreground sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-3 text-muted-foreground">
              Rent a car in three simple steps
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {howItWorks.map((item, index) => {
              const icons = [Search, CalendarDays, KeyRound];
              const Icon = icons[index];
              return (
                <Card
                  key={item.step}
                  className="relative border-0 bg-background shadow-sm"
                >
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600/10">
                      <Icon className="h-7 w-7 text-blue-600" />
                    </div>
                    <div className="mb-2 text-sm font-medium text-blue-600">
                      Step {item.step}
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Featured Vehicles
              </h2>
              <p className="mt-3 text-muted-foreground">
                Our most popular picks for Delhi NCR
              </p>
            </div>
            <Button variant="ghost" asChild className="hidden sm:flex">
              <Link href="/vehicles">
                View All
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Button variant="outline" asChild>
              <Link href="/vehicles">
                View All Vehicles
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Why Choose RydeX?
            </h2>
            <p className="mt-3 text-muted-foreground">
              We go the extra mile so you can too
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Car,
                title: "Well-Maintained Fleet",
                description:
                  "Every vehicle is regularly serviced, sanitized, and inspected before handover.",
              },
              {
                icon: Shield,
                title: "Fully Insured",
                description:
                  "All our vehicles come with comprehensive insurance for your peace of mind.",
              },
              {
                icon: Clock,
                title: "24/7 Support",
                description:
                  "Round-the-clock roadside assistance and customer support via call or WhatsApp.",
              },
              {
                icon: MapPin,
                title: "Multiple Locations",
                description:
                  "Convenient pickup and drop-off points across Delhi, Gurugram, Noida & more.",
              },
            ].map((feature) => (
              <Card
                key={feature.title}
                className="border-0 bg-background shadow-sm"
              >
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600/10">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="mb-2 font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              What Our Customers Say
            </h2>
            <p className="mt-3 text-muted-foreground">
              Trusted by thousands across Delhi NCR
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="border shadow-sm">
                <CardContent className="p-6">
                  <div className="mb-3 flex gap-0.5">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-blue-600/10 text-blue-600 text-xs">
                        {testimonial.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-slate-900 to-blue-950 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to Hit the Road?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-slate-300">
            Book your ride now and experience the freedom of self-drive car
            rentals in Delhi NCR.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button
              size="lg"
              className="bg-blue-600 text-base hover:bg-blue-700"
              asChild
            >
              <Link href="/vehicles">
                Book Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-600 bg-transparent text-white hover:bg-white/10 text-base"
              asChild
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
