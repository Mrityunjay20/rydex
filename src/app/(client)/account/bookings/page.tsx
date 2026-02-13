"use client";

import Link from "next/link";
import { Car, Clock, MapPin, ChevronRight, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const bookings = [
  {
    id: "RX-ABC123",
    vehicle: "Hyundai Creta",
    vehicleType: "SUV",
    startDate: "Feb 10, 2025 10:00 AM",
    endDate: "Feb 12, 2025 10:00 AM",
    pickup: "Gurugram, Haryana",
    drop: "Gurugram, Haryana",
    status: "ACTIVE",
    amount: 6000,
  },
  {
    id: "RX-DEF456",
    vehicle: "Swift Dzire",
    vehicleType: "SEDAN",
    startDate: "Jan 25, 2025 09:00 AM",
    endDate: "Jan 26, 2025 09:00 AM",
    pickup: "Connaught Place, Delhi",
    drop: "Connaught Place, Delhi",
    status: "COMPLETED",
    amount: 1800,
  },
  {
    id: "RX-GHI789",
    vehicle: "Honda City",
    vehicleType: "SEDAN",
    startDate: "Jan 15, 2025 02:00 PM",
    endDate: "Jan 15, 2025 10:00 PM",
    pickup: "Noida, UP",
    drop: "Noida, UP",
    status: "COMPLETED",
    amount: 1600,
  },
  {
    id: "RX-JKL012",
    vehicle: "Toyota Fortuner",
    vehicleType: "SUV",
    startDate: "Dec 24, 2024 08:00 AM",
    endDate: "Dec 26, 2024 08:00 AM",
    pickup: "Aerocity, Delhi",
    drop: "Aerocity, Delhi",
    status: "COMPLETED",
    amount: 11000,
  },
  {
    id: "RX-MNO345",
    vehicle: "Maruti Baleno",
    vehicleType: "HATCHBACK",
    startDate: "Dec 10, 2024 10:00 AM",
    endDate: "Dec 10, 2024 06:00 PM",
    pickup: "Dwarka, Delhi",
    drop: "Dwarka, Delhi",
    status: "CANCELLED",
    amount: 960,
  },
];

const statusColors: Record<string, string> = {
  ACTIVE: "bg-green-100 text-green-700",
  COMPLETED: "bg-gray-100 text-gray-700",
  PENDING: "bg-yellow-100 text-yellow-700",
  CONFIRMED: "bg-blue-100 text-blue-700",
  CANCELLED: "bg-red-100 text-red-700",
};

function BookingCard({ booking }: { booking: (typeof bookings)[0] }) {
  return (
    <Card className="border shadow-sm">
      <CardContent className="p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-muted">
              <Car className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{booking.vehicle}</h3>
                <Badge variant="secondary" className="text-xs">
                  {booking.vehicleType}
                </Badge>
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground font-mono">
                {booking.id}
              </p>
              <div className="mt-2 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {booking.startDate} &mdash; {booking.endDate}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {booking.pickup}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:flex-col sm:items-end">
            <Badge
              className={`${statusColors[booking.status]} hover:${statusColors[booking.status]}`}
            >
              {booking.status}
            </Badge>
            <p className="text-lg font-bold">
              ₹{booking.amount.toLocaleString("en-IN")}
            </p>
            {booking.status === "ACTIVE" && (
              <Button size="sm" asChild>
                <Link href={`/booking/timer/demo`}>
                  <Clock className="mr-1.5 h-3.5 w-3.5" />
                  View Timer
                </Link>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function BookingsPage() {
  const activeBookings = bookings.filter(
    (b) => b.status === "ACTIVE" || b.status === "CONFIRMED" || b.status === "PENDING"
  );
  const pastBookings = bookings.filter(
    (b) => b.status === "COMPLETED" || b.status === "CANCELLED"
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Bookings</h1>
          <p className="mt-1 text-muted-foreground">
            Track and manage all your rentals
          </p>
        </div>
        <Button asChild>
          <Link href="/vehicles">
            <Car className="mr-2 h-4 w-4" />
            New Booking
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="active">
        <TabsList className="mb-6">
          <TabsTrigger value="active">
            Active ({activeBookings.length})
          </TabsTrigger>
          <TabsTrigger value="past">
            Past ({pastBookings.length})
          </TabsTrigger>
          <TabsTrigger value="all">All ({bookings.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeBookings.length > 0 ? (
            activeBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))
          ) : (
            <div className="py-12 text-center">
              <Car className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
              <h3 className="font-semibold">No active bookings</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Book a vehicle to get started
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {pastBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          {bookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
