"use client";

import { useState } from "react";
import { Search, Users, Mail, Phone, Calendar, Car, CheckCircle2, XCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const customers = [
  {
    id: "c1",
    name: "Rahul Sharma",
    email: "rahul@example.com",
    phone: "+91 98765 43210",
    dlNumber: "DL-1234567890",
    verified: true,
    totalBookings: 12,
    totalSpent: 32400,
    joinDate: "Jan 2024",
    initials: "RS",
  },
  {
    id: "c2",
    name: "Priya Gupta",
    email: "priya@example.com",
    phone: "+91 87654 32109",
    dlNumber: "HR-9876543210",
    verified: true,
    totalBookings: 8,
    totalSpent: 24000,
    joinDate: "Mar 2024",
    initials: "PG",
  },
  {
    id: "c3",
    name: "Amit Verma",
    email: "amit@example.com",
    phone: "+91 76543 21098",
    dlNumber: "UP-5678901234",
    verified: true,
    totalBookings: 5,
    totalSpent: 18500,
    joinDate: "May 2024",
    initials: "AV",
  },
  {
    id: "c4",
    name: "Sneha Reddy",
    email: "sneha@example.com",
    phone: "+91 65432 10987",
    dlNumber: "DL-4567890123",
    verified: false,
    totalBookings: 3,
    totalSpent: 28500,
    joinDate: "Jul 2024",
    initials: "SR",
  },
  {
    id: "c5",
    name: "Vikram Singh",
    email: "vikram@example.com",
    phone: "+91 54321 09876",
    dlNumber: "DL-3456789012",
    verified: true,
    totalBookings: 15,
    totalSpent: 45600,
    joinDate: "Dec 2023",
    initials: "VS",
  },
  {
    id: "c6",
    name: "Meera Patel",
    email: "meera@example.com",
    phone: "+91 43210 98765",
    dlNumber: "HR-2345678901",
    verified: false,
    totalBookings: 1,
    totalSpent: 960,
    joinDate: "Jan 2025",
    initials: "MP",
  },
];

export default function AdminCustomersPage() {
  const [search, setSearch] = useState("");

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Customers</h1>
        <p className="text-muted-foreground">
          {customers.length} registered customers
        </p>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Card className="border">
          <CardContent className="p-4 text-center">
            <Users className="mx-auto mb-2 h-5 w-5 text-blue-600" />
            <p className="text-xl font-bold">{customers.length}</p>
            <p className="text-xs text-muted-foreground">Total</p>
          </CardContent>
        </Card>
        <Card className="border">
          <CardContent className="p-4 text-center">
            <CheckCircle2 className="mx-auto mb-2 h-5 w-5 text-green-600" />
            <p className="text-xl font-bold">
              {customers.filter((c) => c.verified).length}
            </p>
            <p className="text-xs text-muted-foreground">Verified</p>
          </CardContent>
        </Card>
        <Card className="border">
          <CardContent className="p-4 text-center">
            <Car className="mx-auto mb-2 h-5 w-5 text-purple-600" />
            <p className="text-xl font-bold">
              {customers.reduce((sum, c) => sum + c.totalBookings, 0)}
            </p>
            <p className="text-xs text-muted-foreground">Total Bookings</p>
          </CardContent>
        </Card>
        <Card className="border">
          <CardContent className="p-4 text-center">
            <p className="text-xl font-bold">
              ₹{(customers.reduce((sum, c) => sum + c.totalSpent, 0) / 1000).toFixed(0)}k
            </p>
            <p className="text-xs text-muted-foreground">Total Revenue</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="mb-6 relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by name, email, or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Customer Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((customer) => (
          <Card key={customer.id} className="border shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-blue-600 text-white">
                    {customer.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold truncate">{customer.name}</h3>
                    {customer.verified ? (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs shrink-0">
                        Verified
                      </Badge>
                    ) : (
                      <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 text-xs shrink-0">
                        Unverified
                      </Badge>
                    )}
                  </div>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      {customer.email}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Phone className="h-3 w-3" />
                      {customer.phone}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      Joined {customer.joinDate}
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {customer.totalBookings} bookings
                    </span>
                    <span className="font-bold">
                      ₹{customer.totalSpent.toLocaleString("en-IN")}
                    </span>
                  </div>
                  {!customer.verified && (
                    <Button size="sm" className="mt-3 w-full" variant="outline">
                      <CheckCircle2 className="mr-2 h-3.5 w-3.5" />
                      Verify Customer
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-12 text-center">
          <Users className="mx-auto mb-3 h-10 w-10 text-muted-foreground/50" />
          <p className="text-muted-foreground">No customers found</p>
        </div>
      )}
    </div>
  );
}
