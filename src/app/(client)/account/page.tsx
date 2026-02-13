"use client";

import Link from "next/link";
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

const mockUser = {
  name: "Rahul Sharma",
  email: "rahul@example.com",
  phone: "+91 98765 43210",
  dlNumber: "DL-1234567890",
  verified: true,
  memberSince: "Jan 2024",
};

const recentBookings = [
  {
    id: "RX-ABC123",
    vehicle: "Hyundai Creta",
    date: "Feb 10 – Feb 12, 2025",
    status: "ACTIVE",
    amount: 6000,
  },
  {
    id: "RX-DEF456",
    vehicle: "Swift Dzire",
    date: "Jan 25 – Jan 26, 2025",
    status: "COMPLETED",
    amount: 1800,
  },
  {
    id: "RX-GHI789",
    vehicle: "Honda City",
    date: "Jan 15, 2025",
    status: "COMPLETED",
    amount: 2400,
  },
];

const statusColors: Record<string, string> = {
  ACTIVE: "bg-green-100 text-green-700",
  COMPLETED: "bg-gray-100 text-gray-700",
  PENDING: "bg-yellow-100 text-yellow-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export default function AccountPage() {
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
                  RS
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold">{mockUser.name}</h2>
              <p className="text-sm text-muted-foreground">{mockUser.email}</p>
              <p className="text-sm text-muted-foreground">{mockUser.phone}</p>
              {mockUser.verified && (
                <Badge className="mt-2 bg-green-100 text-green-700 hover:bg-green-100">
                  Verified
                </Badge>
              )}
              <Separator className="my-4" />
              <div className="w-full space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">DL Number</span>
                  <span className="font-medium">{mockUser.dlNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Member Since</span>
                  <span className="font-medium">{mockUser.memberSince}</span>
                </div>
              </div>
              <Button variant="outline" className="mt-4 w-full" size="sm">
                <Settings className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { icon: Car, label: "Total Rides", value: "12" },
              { icon: Clock, label: "Active", value: "1" },
              { icon: Calendar, label: "Upcoming", value: "0" },
              {
                icon: CreditCard,
                label: "Total Spent",
                value: "₹32,400",
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
                {recentBookings.map((booking) => (
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
                          {booking.vehicle}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {booking.date}
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
                        ₹{booking.amount.toLocaleString("en-IN")}
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
