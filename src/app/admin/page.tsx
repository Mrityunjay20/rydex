"use client";

import { useEffect, useState } from "react";
import {
  Car,
  CalendarCheck,
  Users,
  IndianRupee,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Loader2,
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

interface DashboardData {
  stats: {
    totalRevenue: { value: number; growth: number };
    activeBookings: { value: number; growth: number };
    fleetUtilization: { value: number; growth: number };
    newCustomers: { value: number; growth: number };
  };
  monthlyRevenue: { month: string; revenue: number }[];
  weeklyBookings: { day: string; bookings: number }[];
  recentBookings: {
    id: string;
    customer: string;
    vehicle: string;
    amount: number;
    status: string;
  }[];
}

const statusColors: Record<string, string> = {
  ACTIVE: "bg-green-100 text-green-700",
  CONFIRMED: "bg-blue-100 text-blue-700",
  PENDING: "bg-yellow-100 text-yellow-700",
  COMPLETED: "bg-gray-100 text-gray-700",
};

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);
        const response = await fetch("/api/admin/dashboard");
        if (!response.ok) throw new Error("Failed to fetch dashboard data");
        const data = await response.json();
        setDashboardData(data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-blue-600" />
          <p className="mt-2 text-sm text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error || !dashboardData) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">{error || "Failed to load dashboard"}</p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      title: "Total Revenue",
      value: `₹${dashboardData.stats.totalRevenue.value.toLocaleString("en-IN")}`,
      change: `${dashboardData.stats.totalRevenue.growth >= 0 ? "+" : ""}${dashboardData.stats.totalRevenue.growth.toFixed(1)}%`,
      trend: dashboardData.stats.totalRevenue.growth >= 0 ? "up" : "down",
      icon: IndianRupee,
      color: "text-green-600",
    },
    {
      title: "Active Bookings",
      value: dashboardData.stats.activeBookings.value.toString(),
      change: `${dashboardData.stats.activeBookings.growth >= 0 ? "+" : ""}${dashboardData.stats.activeBookings.growth}`,
      trend: dashboardData.stats.activeBookings.growth >= 0 ? "up" : "down",
      icon: CalendarCheck,
      color: "text-blue-600",
    },
    {
      title: "Fleet Utilization",
      value: `${dashboardData.stats.fleetUtilization.value}%`,
      change: `${dashboardData.stats.fleetUtilization.growth >= 0 ? "+" : ""}${dashboardData.stats.fleetUtilization.growth}%`,
      trend: dashboardData.stats.fleetUtilization.growth >= 0 ? "up" : "down",
      icon: Car,
      color: "text-purple-600",
    },
    {
      title: "New Customers",
      value: dashboardData.stats.newCustomers.value.toString(),
      change: `${dashboardData.stats.newCustomers.growth >= 0 ? "+" : ""}${dashboardData.stats.newCustomers.growth.toFixed(1)}%`,
      trend: dashboardData.stats.newCustomers.growth >= 0 ? "up" : "down",
      icon: Users,
      color: "text-orange-600",
    },
  ];

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
        {stats.map((stat) => (
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
              <BarChart data={dashboardData.monthlyRevenue}>
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
              <LineChart data={dashboardData.weeklyBookings}>
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
                {dashboardData.recentBookings.map((booking) => (
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
