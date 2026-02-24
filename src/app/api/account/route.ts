import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    if (!authUser) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Try to find user in our DB by email
    const { data: dbUser } = await supabaseAdmin
      .from("User")
      .select("*, bookings:Booking(*, vehicle:Vehicle(*), payment:Payment(*))")
      .eq("email", authUser.email!)
      .single();

    if (!dbUser) {
      // Auto-create DB user from Supabase auth so bookings FK works
      const name = authUser.user_metadata?.full_name || authUser.email?.split("@")[0] || "User";
      const phone = authUser.user_metadata?.phone || null;
      const { data: newUser, error: createError } = await supabaseAdmin
        .from("User")
        .insert({
          name,
          email: authUser.email!,
          phone,
          password: "",
          role: "CUSTOMER",
          verified: !!authUser.email_confirmed_at,
        })
        .select()
        .single();

      if (createError) throw createError;

      return NextResponse.json({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone || "",
        role: newUser.role,
        verified: newUser.verified,
        bookings: [],
        totalBookings: 0,
        totalSpent: 0,
      });
    }

    const bookings = dbUser.bookings || [];
    return NextResponse.json({
      id: dbUser.id,
      name: dbUser.name,
      email: dbUser.email,
      phone: dbUser.phone || "",
      role: dbUser.role,
      dlNumber: dbUser.dlNumber || "",
      verified: dbUser.verified,
      bookings,
      totalBookings: bookings.length,
      totalSpent: bookings.reduce((sum: number, b: any) => sum + b.totalAmount, 0),
      createdAt: dbUser.createdAt,
    });
  } catch (error) {
    console.error("Error fetching account:", error);
    return NextResponse.json(
      { error: "Failed to fetch account" },
      { status: 500 }
    );
  }
}
