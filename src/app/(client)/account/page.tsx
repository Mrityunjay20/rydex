"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  User,
  Car,
  Calendar,
  Clock,
  CreditCard,
  Settings,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";


const statusColors: Record<string, string> = {
  ACTIVE: "bg-green-100 text-green-700",
  COMPLETED: "bg-gray-100 text-gray-700",
  PENDING: "bg-yellow-100 text-yellow-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [recentBookings, setRecentBookings] = useState<any[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const supabase = createClient();
        
        // Get current user
        const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
        
        if (authError || !authUser) {
          console.error("Not authenticated:", authError);
          router.push("/auth/login");
          return;
        }

        // Set user data
        setUser({
          name: authUser.user_metadata?.name || authUser.email?.split('@')[0] || "User",
          email: authUser.email,
          phone: authUser.user_metadata?.phone || "N/A",
          verified: authUser.email_confirmed_at ? true : false,
          memberSince: new Date(authUser.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        });

        // Fetch user's bookings by email
        const { data: bookings } = await supabase
          .from('Booking')
          .select('*')
          .eq('userEmail', authUser.email)
          .order('createdAt', { ascending: false })
          .limit(3);

        if (bookings) {
          setRecentBookings(bookings);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="h-8 w-8 mx-auto animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="mt-4 text-sm text-muted-foreground">Loading your account...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <Card className="border shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-20 w-20 mb-4">
                <AvatarFallback className="bg-blue-600 text-white text-xl">
                  {user.name?.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) || 'U'}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <p className="text-sm text-muted-foreground">{user.phone}</p>
              {user.verified && (
                <Badge className="mt-2 bg-green-100 text-green-700 hover:bg-green-100">
                  Verified
                </Badge>
              )}
              <Separator className="my-4" />
              <div className="w-full space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Member Since</span>
                  <span className="font-medium">{user.memberSince}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Bookings</span>
                  <span className="font-medium">{recentBookings.length}</span>
                </div>
              </div>
              <Button variant="outline" className="mt-4 w-full" size="sm" asChild>
                <Link href="/account/profile">
                  <Settings className="mr-2 h-4 w-4" />
                  Edit Profile
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { icon: Car, label: "Total Rides", value: recentBookings.length.toString() },
              { icon: Clock, label: "Active", value: recentBookings.filter((b: any) => b.status === 'ACTIVE').length.toString() },
              { icon: Calendar, label: "Upcoming", value: recentBookings.filter((b: any) => b.status === 'CONFIRMED').length.toString() },
              {
                icon: CreditCard,
                label: "Total Spent",
                value: `₹${recentBookings.reduce((sum: number, b: any) => sum + (b.totalAmount || 0), 0).toLocaleString('en-IN')}`,
              },
            ].map((stat) => (
              <Card key={stat.label} className="border">
                <CardContent className="p-4 text-center">
                  <stat.icon className="mx-auto mb-2 h-5 w-5 text-blue-600" />
                  <p className="text-xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Bookings */}
          <Card className="border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Recent Bookings</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/account/bookings">
                  View All
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentBookings.length === 0 ? (
                  <p className="text-center text-sm text-muted-foreground py-8">No bookings yet. <Link href="/vehicles" className="text-blue-600 hover:underline">Browse vehicles</Link> to get started!</p>
                ) : recentBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                        <Car className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">
                          Booking #{booking.id.slice(0, 8)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(booking.startDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        className={`${
                          statusColors[booking.status]
                        } hover:${statusColors[booking.status]} text-xs`}
                      >
                        {booking.status}
                      </Badge>
                      <span className="text-sm font-semibold hidden sm:inline">
                        ₹{(booking.totalAmount || 0).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid gap-3 sm:grid-cols-2">
            <Button variant="outline" className="h-auto p-4 justify-start" asChild>
              <Link href="/vehicles">
                <Car className="mr-3 h-5 w-5 text-blue-600" />
                <div className="text-left">
                  <p className="font-medium">Book a Vehicle</p>
                  <p className="text-xs text-muted-foreground">
                    Browse our fleet
                  </p>
                </div>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto p-4 justify-start" asChild>
              <Link href="/booking/timer/demo">
                <Clock className="mr-3 h-5 w-5 text-blue-600" />
                <div className="text-left">
                  <p className="font-medium">Active Booking Timer</p>
                  <p className="text-xs text-muted-foreground">
                    Track your rental
                  </p>
                </div>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
