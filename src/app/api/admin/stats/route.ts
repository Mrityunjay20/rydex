import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET() {
  try {
    const [vehiclesRes, bookingsCountRes, usersRes, bookingsRes] =
      await Promise.all([
        supabaseAdmin.from("Vehicle").select("id", { count: "exact", head: true }),
        supabaseAdmin.from("Booking").select("id", { count: "exact", head: true }),
        supabaseAdmin.from("User").select("id", { count: "exact", head: true }).eq("role", "CUSTOMER"),
        supabaseAdmin
          .from("Booking")
          .select("*, vehicle:Vehicle(*), user:User(*), payment:Payment(*)")
          .order("createdAt", { ascending: false })
          .limit(10),
      ]);

    const bookings = bookingsRes.data || [];
    const totalRevenue = bookings.reduce((sum, b: any) => sum + b.totalAmount, 0);

    return NextResponse.json({
      totalVehicles: vehiclesRes.count || 0,
      totalBookings: bookingsCountRes.count || 0,
      totalUsers: usersRes.count || 0,
      totalRevenue,
      recentBookings: bookings,
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
