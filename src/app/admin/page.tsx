"use client";

import {
  Car,
  CalendarCheck,
  Users,
  IndianRupee,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const revenueData = [
  { month: "Aug", revenue: 185000 },
  { month: "Sep", revenue: 220000 },
  { month: "Oct", revenue: 265000 },
  { month: "Nov", revenue: 310000 },
  { month: "Dec", revenue: 380000 },
  { month: "Jan", revenue: 420000 },
  { month: "Feb", revenue: 345000 },
];

const bookingsData = [
  { day: "Mon", bookings: 12 },
  { day: "Tue", bookings: 18 },
  { day: "Wed", bookings: 15 },
  { day: "Thu", bookings: 22 },
  { day: "Fri", bookings: 28 },
  { day: "Sat", bookings: 35 },
  { day: "Sun", bookings: 30 },
];

const recentBookings = [
  {
    id: "RX-XY1234",
    customer: "Rahul Sharma",
    vehicle: "Hyundai Creta",
    amount: 6000,
    status: "ACTIVE",
  },
  {
    id: "RX-AB5678",
    customer: "Priya Gupta",
    vehicle: "Swift Dzire",
    amount: 1800,
    status: "CONFIRMED",
  },
  {
    id: "RX-CD9012",
    customer: "Amit Verma",
    vehicle: "Toyota Fortuner",
    amount: 11000,
    status: "PENDING",
  },
  {
    id: "RX-EF3456",
    customer: "Sneha Reddy",
    vehicle: "Mercedes E-Class",
    amount: 19000,
    status: "ACTIVE",
  },
  {
    id: "RX-GH7890",
    customer: "Vikram Singh",
    vehicle: "Honda City",
    amount: 2400,
    status: "COMPLETED",
  },
];

const statusColors: Record<string, string> = {
  ACTIVE: "bg-green-100 text-green-700",
  CONFIRMED: "bg-blue-100 text-blue-700",
  PENDING: "bg-yellow-100 text-yellow-700",
  COMPLETED: "bg-gray-100 text-gray-700",
};

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s your business overview.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Total Revenue",
            value: "₹4,20,000",
            change: "+12.5%",
            trend: "up",
            icon: IndianRupee,
            color: "text-green-600",
          },
          {
            title: "Active Bookings",
            value: "24",
            change: "+3",
            trend: "up",
            icon: CalendarCheck,
            color: "text-blue-600",
          },
          {
            title: "Fleet Utilization",
            value: "78%",
            change: "+5%",
            trend: "up",
            icon: Car,
            color: "text-purple-600",
          },
          {
            title: "New Customers",
            value: "156",
            change: "-8%",
            trend: "down",
            icon: Users,
            color: "text-orange-600",
          },
        ].map((stat) => (
          <Card key={stat.title} className="border shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="mt-1 text-2xl font-bold">{stat.value}</p>
                  <div className="mt-1 flex items-center gap-1">
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="h-3.5 w-3.5 text-green-600" />
                    ) : (
                      <ArrowDownRight className="h-3.5 w-3.5 text-red-600" />
                    )}
                    <span
                      className={`text-xs font-medium ${
                        stat.trend === "up"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {stat.change} this month
                    </span>
                  </div>
                </div>
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-lg bg-muted ${stat.color}`}
                >
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Monthly Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis
                  fontSize={12}
                  tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  formatter={(value) => [
                    `₹${Number(value).toLocaleString("en-IN")}`,
                    "Revenue",
                  ]}
                />
                <Bar
                  dataKey="revenue"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <CalendarCheck className="h-5 w-5 text-blue-600" />
              Weekly Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={bookingsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="bookings"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: "#3b82f6", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings Table */}
      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Clock className="h-5 w-5 text-blue-600" />
            Recent Bookings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3 font-medium text-muted-foreground">
                    Booking ID
                  </th>
                  <th className="pb-3 font-medium text-muted-foreground">
                    Customer
                  </th>
                  <th className="pb-3 font-medium text-muted-foreground">
                    Vehicle
                  </th>
                  <th className="pb-3 font-medium text-muted-foreground">
                    Amount
                  </th>
                  <th className="pb-3 font-medium text-muted-foreground">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="border-b last:border-0">
                    <td className="py-3 font-mono text-xs">
                      {booking.id}
                    </td>
                    <td className="py-3">{booking.customer}</td>
                    <td className="py-3">{booking.vehicle}</td>
                    <td className="py-3 font-semibold">
                      ₹{booking.amount.toLocaleString("en-IN")}
                    </td>
                    <td className="py-3">
                      <Badge
                        className={`${
                          statusColors[booking.status]
                        } hover:${statusColors[booking.status]} text-xs`}
                      >
                        {booking.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
