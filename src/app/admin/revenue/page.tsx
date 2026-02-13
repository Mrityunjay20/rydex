"use client";

import { useState } from "react";
import {
  IndianRupee,
  TrendingUp,
  ArrowUpRight,
  Download,
  Calendar,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  PieChart,
  Pie,
  Cell,
} from "recharts";

const monthlyRevenue = [
  { month: "Mar", revenue: 145000 },
  { month: "Apr", revenue: 168000 },
  { month: "May", revenue: 195000 },
  { month: "Jun", revenue: 210000 },
  { month: "Jul", revenue: 185000 },
  { month: "Aug", revenue: 230000 },
  { month: "Sep", revenue: 265000 },
  { month: "Oct", revenue: 290000 },
  { month: "Nov", revenue: 310000 },
  { month: "Dec", revenue: 380000 },
  { month: "Jan", revenue: 420000 },
  { month: "Feb", revenue: 345000 },
];

const dailyRevenue = [
  { day: "1", revenue: 12000 },
  { day: "3", revenue: 18000 },
  { day: "5", revenue: 15000 },
  { day: "7", revenue: 22000 },
  { day: "9", revenue: 19000 },
  { day: "11", revenue: 28000 },
  { day: "13", revenue: 25000 },
];

const revenueByType = [
  { name: "SUV", value: 42, color: "#3b82f6" },
  { name: "Sedan", value: 28, color: "#8b5cf6" },
  { name: "Luxury", value: 15, color: "#f59e0b" },
  { name: "Hatchback", value: 10, color: "#10b981" },
  { name: "MUV", value: 5, color: "#ef4444" },
];

const topVehicles = [
  { name: "Hyundai Creta", bookings: 45, revenue: 135000 },
  { name: "Toyota Fortuner", bookings: 28, revenue: 154000 },
  { name: "Mercedes E-Class", bookings: 12, revenue: 114000 },
  { name: "Honda City", bookings: 38, revenue: 91200 },
  { name: "Swift Dzire", bookings: 52, revenue: 93600 },
];

export default function AdminRevenuePage() {
  const [period, setPeriod] = useState("monthly");

  const totalRevenue = monthlyRevenue.reduce((sum, m) => sum + m.revenue, 0);
  const avgMonthly = Math.round(totalRevenue / 12);
  const lastMonth = monthlyRevenue[monthlyRevenue.length - 1].revenue;
  const prevMonth = monthlyRevenue[monthlyRevenue.length - 2].revenue;
  const growth = (((lastMonth - prevMonth) / prevMonth) * 100).toFixed(1);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Revenue</h1>
          <p className="text-muted-foreground">
            Financial overview and reports
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Revenue Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border shadow-sm">
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Total Revenue (FY)</p>
            <p className="mt-1 text-2xl font-bold">
              ₹{(totalRevenue / 100000).toFixed(1)}L
            </p>
            <div className="mt-1 flex items-center gap-1">
              <ArrowUpRight className="h-3.5 w-3.5 text-green-600" />
              <span className="text-xs text-green-600 font-medium">
                +18.5% YoY
              </span>
            </div>
          </CardContent>
        </Card>
        <Card className="border shadow-sm">
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">This Month</p>
            <p className="mt-1 text-2xl font-bold">
              ₹{(lastMonth / 1000).toFixed(0)}k
            </p>
            <div className="mt-1 flex items-center gap-1">
              <ArrowUpRight className={`h-3.5 w-3.5 ${Number(growth) >= 0 ? "text-green-600" : "text-red-600"}`} />
              <span className={`text-xs font-medium ${Number(growth) >= 0 ? "text-green-600" : "text-red-600"}`}>
                {growth}% vs last month
              </span>
            </div>
          </CardContent>
        </Card>
        <Card className="border shadow-sm">
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Avg Monthly</p>
            <p className="mt-1 text-2xl font-bold">
              ₹{(avgMonthly / 1000).toFixed(0)}k
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Last 12 months
            </p>
          </CardContent>
        </Card>
        <Card className="border shadow-sm">
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Avg Booking Value</p>
            <p className="mt-1 text-2xl font-bold">₹4,850</p>
            <div className="mt-1 flex items-center gap-1">
              <ArrowUpRight className="h-3.5 w-3.5 text-green-600" />
              <span className="text-xs text-green-600 font-medium">
                +8.2% vs last month
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="mb-8 grid gap-6 lg:grid-cols-3">
        <Card className="border shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Revenue Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={monthlyRevenue}>
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
            <CardTitle className="text-lg">Revenue by Vehicle Type</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={revenueByType}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {revenueByType.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, "Share"]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-2 space-y-1.5">
              {revenueByType.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Vehicles */}
      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Top Performing Vehicles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="pb-3 text-left font-medium text-muted-foreground">
                    Vehicle
                  </th>
                  <th className="pb-3 text-left font-medium text-muted-foreground">
                    Bookings
                  </th>
                  <th className="pb-3 text-left font-medium text-muted-foreground">
                    Revenue
                  </th>
                  <th className="pb-3 text-left font-medium text-muted-foreground">
                    Avg/Booking
                  </th>
                </tr>
              </thead>
              <tbody>
                {topVehicles.map((v) => (
                  <tr key={v.name} className="border-b last:border-0">
                    <td className="py-3 font-medium">{v.name}</td>
                    <td className="py-3">{v.bookings}</td>
                    <td className="py-3 font-semibold">
                      ₹{v.revenue.toLocaleString("en-IN")}
                    </td>
                    <td className="py-3 text-muted-foreground">
                      ₹{Math.round(v.revenue / v.bookings).toLocaleString("en-IN")}
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
