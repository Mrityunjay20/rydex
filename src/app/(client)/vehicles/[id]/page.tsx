"use client";

import { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Fuel,
  Users,
  Gauge,
  MapPin,
  Calendar,
  Star,
  Check,
  Car,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { vehicles } from "@/lib/mock-data";

export default function VehicleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const vehicle = vehicles.find((v) => v.id === id);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!vehicle) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <Car className="mx-auto mb-4 h-16 w-16 text-muted-foreground/50" />
        <h1 className="text-2xl font-bold">Vehicle Not Found</h1>
        <p className="mt-2 text-muted-foreground">
          The vehicle you&apos;re looking for doesn&apos;t exist.
        </p>
        <Button className="mt-6" asChild>
          <Link href="/vehicles">Browse All Vehicles</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Back Button */}
      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link href="/vehicles">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Vehicles
        </Link>
      </Button>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column - Images & Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image Gallery */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
              <Image
                src={vehicle.images[selectedImage]}
                alt={vehicle.name}
                fill
                className="object-cover"
                priority
              />
              <Badge className="absolute left-4 top-4" variant="secondary">
                {vehicle.type}
              </Badge>
            </div>
            {vehicle.images.length > 1 && (
              <div className="flex gap-2">
                {vehicle.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-[16/9] w-24 overflow-hidden rounded-lg border-2 transition-all ${
                      selectedImage === index
                        ? "border-blue-600"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${vehicle.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Vehicle Info */}
          <div>
            <h1 className="text-3xl font-bold">{vehicle.name}</h1>
            <p className="mt-1 text-muted-foreground">
              {vehicle.brand} {vehicle.model} &middot; {vehicle.year}
            </p>
          </div>

          {/* Quick Specs */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { icon: Fuel, label: "Fuel", value: vehicle.fuelType },
              {
                icon: Gauge,
                label: "Transmission",
                value: vehicle.transmission,
              },
              { icon: Users, label: "Seats", value: `${vehicle.seats} Seats` },
              { icon: MapPin, label: "Location", value: vehicle.location },
            ].map((spec) => (
              <Card key={spec.label} className="border">
                <CardContent className="flex items-center gap-3 p-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600/10">
                    <spec.icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {spec.label}
                    </p>
                    <p className="text-sm font-medium">{spec.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Separator />

          {/* Description */}
          <div>
            <h2 className="mb-3 text-xl font-semibold">About This Vehicle</h2>
            <p className="text-muted-foreground leading-relaxed">
              {vehicle.description}
            </p>
          </div>

          {/* Features */}
          <div>
            <h2 className="mb-3 text-xl font-semibold">Features</h2>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {vehicle.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Booking Card */}
        <div>
          <Card className="sticky top-24 border shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Pricing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-muted-foreground">Per Hour</span>
                  <span className="text-xl font-bold">
                    ₹{vehicle.pricePerHour.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-muted-foreground">Per Day</span>
                  <span className="text-2xl font-bold text-blue-600">
                    ₹{vehicle.pricePerDay.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  Comprehensive insurance included
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  24/7 roadside assistance
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  Free cancellation up to 24hrs
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  No hidden charges
                </div>
              </div>

              <Separator />

              <Button className="w-full" size="lg" asChild>
                <Link href={`/booking/${vehicle.id}`}>
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Now
                </Link>
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                {vehicle.available
                  ? "Available for immediate booking"
                  : "Currently unavailable"}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
