"use client";

import { useState, useEffect } from "react";
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

interface RevenueData {
  monthlyRevenue: { month: string; revenue: number }[];
  dailyRevenue: { day: string; revenue: number }[];
  revenueByType: { name: string; value: number; color: string }[];
  topVehicles: { name: string; bookings: number; revenue: number }[];
  totalRevenue: number;
  thisMonth: number;
  lastMonth: number;
  avgMonthly: number;
  avgBookingValue: number;
  growth: string;
  totalBookings: number;
}

export default function AdminRevenuePage() {
  const [period, setPeriod] = useState("monthly");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<RevenueData>({
    monthlyRevenue: [],
    dailyRevenue: [],
    revenueByType: [],
    topVehicles: [],
    totalRevenue: 0,
    thisMonth: 0,
    lastMonth: 0,
    avgMonthly: 0,
    avgBookingValue: 0,
    growth: "0",
    totalBookings: 0,
  });

  useEffect(() => {
    fetchRevenueData();
  }, []);

  const fetchRevenueData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/revenue");
      if (!response.ok) throw new Error("Failed to fetch revenue data");
      const result = await response.json();
      setData(result);
      setError(null);
    } catch (err) {
      console.error("Error fetching revenue data:", err);
      setError("Failed to load revenue data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <div className="mb-2 h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent mx-auto"></div>
          <p className="text-muted-foreground">Loading revenue data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-2">{error}</p>
          <Button onClick={fetchRevenueData}>Retry</Button>
        </div>
      </div>
    );
  }

  const { monthlyRevenue, dailyRevenue, revenueByType, topVehicles, totalRevenue, thisMonth, lastMonth, avgMonthly, avgBookingValue, growth } = data;

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
              ₹{totalRevenue >= 100000 ? (totalRevenue / 100000).toFixed(1) + 'L' : (totalRevenue / 1000).toFixed(0) + 'k'}
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
              ₹{thisMonth >= 100000 ? (thisMonth / 100000).toFixed(1) + 'L' : (thisMonth / 1000).toFixed(0) + 'k'}
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
            <p className="mt-1 text-2xl font-bold">₹{avgBookingValue.toLocaleString('en-IN')}</p>
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
