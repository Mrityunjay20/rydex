import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET() {
  try {
    const now = new Date();
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);

    // Fetch all necessary data in parallel
    const [
      vehiclesRes,
      allBookingsRes,
      activeBookingsRes,
      usersThisMonthRes,
      usersLastMonthRes,
      recentBookingsRes,
    ] = await Promise.all([
      // Total vehicles (not deleted)
      supabaseAdmin
        .from("Vehicle")
        .select("id", { count: "exact", head: true })
        .eq("isDeleted", false),
      
      // All bookings with payment info
      supabaseAdmin
        .from("Booking")
        .select("*, payment:Payment(*)")
        .order("createdAt", { ascending: false }),
      
      // Active bookings (currently ongoing)
      supabaseAdmin
        .from("Booking")
        .select("id, status, startDate, endDate")
        .in("status", ["ACTIVE", "CONFIRMED"]),
      
      // Users created this month
      supabaseAdmin
        .from("User")
        .select("id", { count: "exact", head: true })
        .eq("role", "CUSTOMER")
        .gte("createdAt", thisMonthStart.toISOString()),
      
      // Users created last month
      supabaseAdmin
        .from("User")
        .select("id", { count: "exact", head: true })
        .eq("role", "CUSTOMER")
        .gte("createdAt", lastMonthStart.toISOString())
        .lte("createdAt", lastMonthEnd.toISOString()),
      
      // Recent bookings with relations
      supabaseAdmin
        .from("Booking")
        .select("*, vehicle:Vehicle(*), user:User(*), payment:Payment(*)")
        .order("createdAt", { ascending: false })
        .limit(5),
    ]);

    const totalVehicles = vehiclesRes.count || 0;
    
    // Calculate active bookings - bookings that are currently ongoing
    const activeBookingsList = activeBookingsRes.data || [];
    const activeBookingsCount = activeBookingsList.filter((b: any) => {
      const now = new Date();
      const startDate = new Date(b.startDate);
      const endDate = new Date(b.endDate);
      return now >= startDate && now <= endDate;
    }).length;
    
    const allBookings = allBookingsRes.data || [];
    const recentBookings = recentBookingsRes.data || [];
    const newCustomersThisMonth = usersThisMonthRes.count || 0;
    const newCustomersLastMonth = usersLastMonthRes.count || 0;

    // Calculate total revenue from PAID bookings
    // Payment is an array, so check if any payment has PAID status
    // Or use the paymentStatus field directly from Booking
    const paidBookings = allBookings.filter(
      (b: any) => {
        if (b.paymentStatus === "PAID") return true;
        if (Array.isArray(b.payment) && b.payment.length > 0) {
          return b.payment.some((p: any) => p.status === "PAID");
        }
        return false;
      }
    );
    const totalRevenue = paidBookings.reduce(
      (sum: number, b: any) => sum + (b.totalAmount || 0),
      0
    );

    // Calculate revenue this month and last month
    const revenueThisMonth = paidBookings
      .filter((b: any) => {
        const date = new Date(b.createdAt);
        return date >= thisMonthStart;
      })
      .reduce((sum: number, b: any) => sum + (b.totalAmount || 0), 0);

    const revenueLastMonth = paidBookings
      .filter((b: any) => {
        const date = new Date(b.createdAt);
        return date >= lastMonthStart && date <= lastMonthEnd;
      })
      .reduce((sum: number, b: any) => sum + (b.totalAmount || 0), 0);

    // Calculate revenue growth percentage
    const revenueGrowth =
      revenueLastMonth > 0
        ? ((revenueThisMonth - revenueLastMonth) / revenueLastMonth) * 100
        : 0;

    // Calculate active bookings growth (compare current active to a snapshot from last month)
    // For simplicity, just show the change as the current count
    const activeBookingsGrowth = activeBookingsCount;

    // Calculate fleet utilization
    const fleetUtilization =
      totalVehicles > 0
        ? Math.round((activeBookingsCount / totalVehicles) * 100)
        : 0;

    // Calculate fleet utilization growth (simplified)
    const fleetUtilizationGrowth = 0; // Can be enhanced later with historical tracking

    // Calculate customer growth percentage
    const customerGrowth =
      newCustomersLastMonth > 0
        ? ((newCustomersThisMonth - newCustomersLastMonth) / newCustomersLastMonth) * 100
        : 0;

    // Monthly revenue data (last 7 months)
    const monthlyRevenueData: { month: string; revenue: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0, 23, 59, 59);
      const monthName = monthDate.toLocaleDateString("en-US", { month: "short" });
      
      const monthRevenue = paidBookings
        .filter((b: any) => {
          const date = new Date(b.createdAt);
          return date >= monthDate && date <= monthEnd;
        })
        .reduce((sum: number, b: any) => sum + (b.totalAmount || 0), 0);
      
      monthlyRevenueData.push({
        month: monthName,
        revenue: Math.round(monthRevenue),
      });
    }

    // Weekly bookings data (last 7 days)
    const weeklyBookingsData: { day: string; bookings: number }[] = [];
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    for (let i = 6; i >= 0; i--) {
      const dayDate = new Date(now);
      dayDate.setDate(now.getDate() - i);
      dayDate.setHours(0, 0, 0, 0);
      
      const dayEnd = new Date(dayDate);
      dayEnd.setHours(23, 59, 59, 999);
      
      const dayName = dayNames[dayDate.getDay()];
      
      const dayBookings = allBookings.filter((b: any) => {
        const date = new Date(b.createdAt);
        return date >= dayDate && date <= dayEnd;
      }).length;
      
      weeklyBookingsData.push({
        day: dayName,
        bookings: dayBookings,
      });
    }

    // Format recent bookings
    const formattedRecentBookings = recentBookings.map((booking: any) => ({
      id: booking.id,
      customer: booking.user?.name || "Guest",
      vehicle: booking.vehicle?.name || "Unknown Vehicle",
      amount: booking.totalAmount,
      status: booking.status,
    }));

    return NextResponse.json({
      stats: {
        totalRevenue: {
          value: Math.round(totalRevenue),
          growth: revenueGrowth,
        },
        activeBookings: {
          value: activeBookingsCount,
          growth: activeBookingsGrowth,
        },
        fleetUtilization: {
          value: fleetUtilization,
          growth: fleetUtilizationGrowth,
        },
        newCustomers: {
          value: newCustomersThisMonth,
          growth: customerGrowth,
        },
      },
      monthlyRevenue: monthlyRevenueData,
      weeklyBookings: weeklyBookingsData,
      recentBookings: formattedRecentBookings,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}
