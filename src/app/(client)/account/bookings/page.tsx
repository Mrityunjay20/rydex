"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Car, Clock, MapPin, ChevronRight, Calendar, CalendarClock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


const statusColors: Record<string, string> = {
  ACTIVE: "bg-green-100 text-green-700",
  COMPLETED: "bg-gray-100 text-gray-700",
  PENDING: "bg-yellow-100 text-yellow-700",
  CONFIRMED: "bg-blue-100 text-blue-700",
  CANCELLED: "bg-red-100 text-red-700",
};

function BookingCard({ booking }: { booking: any }) {
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
            {(booking.status === "ACTIVE" || booking.status === "CONFIRMED") && (
              <div className="flex flex-col gap-2">
                <Button size="sm" asChild>
                  <Link href={`/booking/timer/${booking.id}`}>
                    <Clock className="mr-1.5 h-3.5 w-3.5" />
                    View Timer
                  </Link>
                </Button>
                <Button size="sm" variant="outline" asChild>
                  <Link href={`/booking/timer/${booking.id}`}>
                    <CalendarClock className="mr-1.5 h-3.5 w-3.5" />
                    Extend Booking
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function BookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          router.push("/auth/login");
          return;
        }

        setUserEmail(user.email || "");

        const response = await fetch("/api/bookings");
        if (response.ok) {
          const data = await response.json();
          // Filter bookings by user email
          const userBookings = data.filter((booking: any) => {
            return booking.userEmail === user.email;
          });
          
          // Transform to match component format
          const formattedBookings = userBookings.map((booking: any) => ({
            id: booking.id,
            vehicle: booking.vehicle?.name || "Unknown Vehicle",
            vehicleType: booking.vehicle?.type || "CAR",
            startDate: new Date(booking.startDate).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
            endDate: new Date(booking.endDate).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
            pickup: booking.pickupLocation,
            drop: booking.dropLocation,
            status: booking.status,
            amount: booking.totalAmount,
          }));
          
          setBookings(formattedBookings);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [router]);

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <div className="h-8 w-8 mx-auto animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="mt-4 text-sm text-muted-foreground">Loading your bookings...</p>
      </div>
    );
  }

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
