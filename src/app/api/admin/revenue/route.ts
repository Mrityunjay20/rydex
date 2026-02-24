import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET() {
  try {
    const { data: bookings, error } = await supabaseAdmin
      .from("Booking")
      .select("*, vehicle:Vehicle(*)")
      .eq("paymentStatus", "PAID")
      .order("createdAt", { ascending: false });

    if (error) throw error;
    if (!bookings) return NextResponse.json({ error: "No data" }, { status: 500 });

    // Monthly revenue (last 12 months)
    const now = new Date();
    const monthlyMap: Record<string, number> = {};
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = d.toLocaleDateString("en-IN", { month: "short", year: "2-digit" });
      monthlyMap[key] = 0;
    }
    for (const b of bookings) {
      const d = new Date(b.createdAt);
      const key = d.toLocaleDateString("en-IN", { month: "short", year: "2-digit" });
      if (key in monthlyMap) {
        monthlyMap[key] += b.totalAmount;
      }
    }
    const monthlyRevenue = Object.entries(monthlyMap).map(([month, revenue]) => ({
      month,
      revenue: Math.round(revenue),
    }));

    // Revenue by vehicle type
    const typeMap: Record<string, number> = {};
    for (const b of bookings) {
      const type = b.vehicle?.type || "OTHER";
      typeMap[type] = (typeMap[type] || 0) + b.totalAmount;
    }
    const totalRev = Object.values(typeMap).reduce((a, b) => a + b, 0) || 1;
    const typeColors: Record<string, string> = {
      SUV: "#3b82f6",
      SEDAN: "#8b5cf6",
      LUXURY: "#f59e0b",
      HATCHBACK: "#10b981",
      MUV: "#ef4444",
      OTHER: "#6b7280",
    };
    const revenueByType = Object.entries(typeMap).map(([name, value]) => ({
      name,
      value: Math.round((value / totalRev) * 100),
      color: typeColors[name] || "#6b7280",
    }));

    // Top performing vehicles
    const vehicleMap: Record<string, { name: string; bookings: number; revenue: number }> = {};
    for (const b of bookings) {
      const vid = b.vehicleId;
      const vname = b.vehicle?.name || "Unknown";
      if (!vehicleMap[vid]) {
        vehicleMap[vid] = { name: vname, bookings: 0, revenue: 0 };
      }
      vehicleMap[vid].bookings += 1;
      vehicleMap[vid].revenue += b.totalAmount;
    }
    const topVehicles = Object.values(vehicleMap)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5)
      .map((v) => ({
        name: v.name,
        bookings: v.bookings,
        revenue: Math.round(v.revenue),
      }));

    // Summary stats
    const totalRevenue = bookings.reduce((sum, b) => sum + b.totalAmount, 0);
    const thisMonth = bookings
      .filter((b) => {
        const d = new Date(b.createdAt);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      })
      .reduce((sum, b) => sum + b.totalAmount, 0);
    const lastMonth = bookings
      .filter((b) => {
        const d = new Date(b.createdAt);
        const lm = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        return d.getMonth() === lm.getMonth() && d.getFullYear() === lm.getFullYear();
      })
      .reduce((sum, b) => sum + b.totalAmount, 0);
    const avgMonthly = Math.round(totalRevenue / 12);
    const avgBookingValue = bookings.length > 0 ? Math.round(totalRevenue / bookings.length) : 0;
    const growth = lastMonth > 0 ? (((thisMonth - lastMonth) / lastMonth) * 100).toFixed(1) : "0";

    // Daily revenue (current month)
    const dailyMap: Record<string, number> = {};
    for (const b of bookings) {
      const d = new Date(b.createdAt);
      if (d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()) {
        const day = String(d.getDate());
        dailyMap[day] = (dailyMap[day] || 0) + b.totalAmount;
      }
    }
    const dailyRevenue = Object.entries(dailyMap)
      .map(([day, revenue]) => ({ day, revenue: Math.round(revenue) }))
      .sort((a, b) => Number(a.day) - Number(b.day));

    return NextResponse.json({
      monthlyRevenue,
      dailyRevenue,
      revenueByType,
      topVehicles,
      totalRevenue: Math.round(totalRevenue),
      thisMonth: Math.round(thisMonth),
      lastMonth: Math.round(lastMonth),
      avgMonthly,
      avgBookingValue,
      growth,
      totalBookings: bookings.length,
    });
  } catch (error) {
    console.error("Error fetching revenue data:", error);
    return NextResponse.json(
      { error: "Failed to fetch revenue data" },
      { status: 500 }
    );
  }
}
