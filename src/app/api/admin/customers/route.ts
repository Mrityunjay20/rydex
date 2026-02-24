import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET() {
  try {
    const { data: customers, error } = await supabaseAdmin
      .from("User")
      .select("*, bookings:Booking(id, totalAmount)")
      .eq("role", "CUSTOMER")
      .order("createdAt", { ascending: false });

    if (error) throw error;

    const result = (customers || []).map((c: any) => ({
      id: c.id,
      name: c.name,
      email: c.email,
      phone: c.phone || "",
      dlNumber: c.dlNumber || "",
      verified: c.verified,
      totalBookings: (c.bookings || []).length,
      totalSpent: (c.bookings || []).reduce((sum: number, b: any) => sum + b.totalAmount, 0),
      joinDate: c.createdAt,
      initials: c.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2),
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching customers:", error);
    return NextResponse.json(
      { error: "Failed to fetch customers" },
      { status: 500 }
    );
  }
}
