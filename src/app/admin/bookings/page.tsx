"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  MoreHorizontal,
  Car,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const bookings = [
  {
    id: "RX-XY1234",
    customer: "Rahul Sharma",
    email: "rahul@example.com",
    phone: "+91 98765 43210",
    vehicle: "Hyundai Creta",
    startDate: "Feb 10, 2025",
    endDate: "Feb 12, 2025",
    pickup: "Gurugram, Haryana",
    drop: "Gurugram, Haryana",
    amount: 6000,
    status: "ACTIVE",
  },
  {
    id: "RX-AB5678",
    customer: "Priya Gupta",
    email: "priya@example.com",
    phone: "+91 87654 32109",
    vehicle: "Swift Dzire",
    startDate: "Feb 11, 2025",
    endDate: "Feb 12, 2025",
    pickup: "Connaught Place, Delhi",
    drop: "Connaught Place, Delhi",
    amount: 1800,
    status: "CONFIRMED",
  },
  {
    id: "RX-CD9012",
    customer: "Amit Verma",
    email: "amit@example.com",
    phone: "+91 76543 21098",
    vehicle: "Toyota Fortuner",
    startDate: "Feb 13, 2025",
    endDate: "Feb 15, 2025",
    pickup: "Aerocity, Delhi",
    drop: "Aerocity, Delhi",
    amount: 11000,
    status: "PENDING",
  },
  {
    id: "RX-EF3456",
    customer: "Sneha Reddy",
    email: "sneha@example.com",
    phone: "+91 65432 10987",
    vehicle: "Mercedes E-Class",
    startDate: "Feb 9, 2025",
    endDate: "Feb 11, 2025",
    pickup: "Aerocity, Delhi",
    drop: "Connaught Place, Delhi",
    amount: 19000,
    status: "ACTIVE",
  },
  {
    id: "RX-GH7890",
    customer: "Vikram Singh",
    email: "vikram@example.com",
    phone: "+91 54321 09876",
    vehicle: "Honda City",
    startDate: "Feb 8, 2025",
    endDate: "Feb 9, 2025",
    pickup: "Noida, UP",
    drop: "Noida, UP",
    amount: 2400,
    status: "COMPLETED",
  },
  {
    id: "RX-IJ1234",
    customer: "Meera Patel",
    email: "meera@example.com",
    phone: "+91 43210 98765",
    vehicle: "Maruti Baleno",
    startDate: "Feb 7, 2025",
    endDate: "Feb 7, 2025",
    pickup: "Dwarka, Delhi",
    drop: "Dwarka, Delhi",
    amount: 960,
    status: "CANCELLED",
  },
];

const statusColors: Record<string, string> = {
  ACTIVE: "bg-green-100 text-green-700",
  CONFIRMED: "bg-blue-100 text-blue-700",
  PENDING: "bg-yellow-100 text-yellow-700",
  COMPLETED: "bg-gray-100 text-gray-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export default function AdminBookingsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState<
    (typeof bookings)[0] | null
  >(null);
  const [bookingList, setBookingList] = useState(bookings);

  const filtered = bookingList.filter((b) => {
    const matchesSearch =
      b.customer.toLowerCase().includes(search.toLowerCase()) ||
      b.id.toLowerCase().includes(search.toLowerCase()) ||
      b.vehicle.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateStatus = (id: string, status: string) => {
    setBookingList((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
    setSelectedBooking(null);
  };

  const statusCounts = {
    all: bookingList.length,
    PENDING: bookingList.filter((b) => b.status === "PENDING").length,
    CONFIRMED: bookingList.filter((b) => b.status === "CONFIRMED").length,
    ACTIVE: bookingList.filter((b) => b.status === "ACTIVE").length,
    COMPLETED: bookingList.filter((b) => b.status === "COMPLETED").length,
    CANCELLED: bookingList.filter((b) => b.status === "CANCELLED").length,
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Bookings</h1>
        <p className="text-muted-foreground">
          Manage all customer bookings
        </p>
      </div>

      {/* Status Summary */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {Object.entries(statusCounts).map(([status, count]) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`rounded-lg border p-3 text-center transition-colors ${
              statusFilter === status
                ? "border-blue-600 bg-blue-50"
                : "hover:bg-muted/50"
            }`}
          >
            <p className="text-lg font-bold">{count}</p>
            <p className="text-xs text-muted-foreground capitalize">
              {status === "all" ? "All" : status}
            </p>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-6 flex gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by customer, ID, or vehicle..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Bookings Table */}
      <Card className="border shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="p-3 text-left font-medium text-muted-foreground">
                    Booking ID
                  </th>
                  <th className="p-3 text-left font-medium text-muted-foreground">
                    Customer
                  </th>
                  <th className="p-3 text-left font-medium text-muted-foreground">
                    Vehicle
                  </th>
                  <th className="p-3 text-left font-medium text-muted-foreground">
                    Dates
                  </th>
                  <th className="p-3 text-left font-medium text-muted-foreground">
                    Amount
                  </th>
                  <th className="p-3 text-left font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="p-3 text-left font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((booking) => (
                  <tr
                    key={booking.id}
                    className="border-b last:border-0 hover:bg-muted/20"
                  >
                    <td className="p-3 font-mono text-xs">{booking.id}</td>
                    <td className="p-3">
                      <div>
                        <p className="font-medium">{booking.customer}</p>
                        <p className="text-xs text-muted-foreground">
                          {booking.email}
                        </p>
                      </div>
                    </td>
                    <td className="p-3">{booking.vehicle}</td>
                    <td className="p-3">
                      <p className="text-xs">
                        {booking.startDate} &mdash; {booking.endDate}
                      </p>
                    </td>
                    <td className="p-3 font-semibold">
                      ₹{booking.amount.toLocaleString("en-IN")}
                    </td>
                    <td className="p-3">
                      <Badge
                        className={`${statusColors[booking.status]} text-xs`}
                      >
                        {booking.status}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => setSelectedBooking(booking)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          {booking.status === "PENDING" && (
                            <>
                              <DropdownMenuItem
                                onClick={() =>
                                  updateStatus(booking.id, "CONFIRMED")
                                }
                              >
                                <CheckCircle2 className="mr-2 h-4 w-4 text-green-600" />
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  updateStatus(booking.id, "CANCELLED")
                                }
                              >
                                <XCircle className="mr-2 h-4 w-4 text-red-600" />
                                Reject
                              </DropdownMenuItem>
                            </>
                          )}
                          {booking.status === "ACTIVE" && (
                            <DropdownMenuItem
                              onClick={() =>
                                updateStatus(booking.id, "COMPLETED")
                              }
                            >
                              <CheckCircle2 className="mr-2 h-4 w-4" />
                              Mark Returned
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="py-12 text-center">
              <Car className="mx-auto mb-3 h-10 w-10 text-muted-foreground/50" />
              <p className="text-muted-foreground">No bookings found</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Booking Detail Dialog */}
      <Dialog
        open={!!selectedBooking}
        onOpenChange={() => setSelectedBooking(null)}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm">{selectedBooking.id}</span>
                <Badge className={statusColors[selectedBooking.status]}>
                  {selectedBooking.status}
                </Badge>
              </div>
              <Separator />
              <div className="grid gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Customer</span>
                  <span className="font-medium">
                    {selectedBooking.customer}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email</span>
                  <span>{selectedBooking.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone</span>
                  <span>{selectedBooking.phone}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Vehicle</span>
                  <span className="font-medium">
                    {selectedBooking.vehicle}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Period</span>
                  <span>
                    {selectedBooking.startDate} &mdash;{" "}
                    {selectedBooking.endDate}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pickup</span>
                  <span>{selectedBooking.pickup}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Drop</span>
                  <span>{selectedBooking.drop}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="text-lg font-bold">
                    ₹{selectedBooking.amount.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {selectedBooking.status === "ACTIVE" && (
                <div className="space-y-2">
                  <Label>Damage Notes (optional)</Label>
                  <Textarea
                    placeholder="Add any notes about the vehicle condition..."
                    rows={2}
                  />
                </div>
              )}

              <div className="flex gap-2 justify-end">
                {selectedBooking.status === "PENDING" && (
                  <>
                    <Button
                      variant="outline"
                      onClick={() =>
                        updateStatus(selectedBooking.id, "CANCELLED")
                      }
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Reject
                    </Button>
                    <Button
                      onClick={() =>
                        updateStatus(selectedBooking.id, "CONFIRMED")
                      }
                    >
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Approve
                    </Button>
                  </>
                )}
                {selectedBooking.status === "ACTIVE" && (
                  <Button
                    onClick={() =>
                      updateStatus(selectedBooking.id, "COMPLETED")
                    }
                  >
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Mark as Returned
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
