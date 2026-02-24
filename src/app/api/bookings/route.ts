import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const status = searchParams.get("status");

    let query = supabaseAdmin
      .from("Booking")
      .select("*, vehicle:Vehicle(*), user:User(*), payment:Payment(*)")
      .order("createdAt", { ascending: false });

    if (userId) query = query.eq("userId", userId);
    if (status) query = query.eq("status", status);

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userId,
      vehicleId,
      startDate,
      endDate,
      pickupLocation,
      dropLocation,
      totalAmount,
      addOns,
    } = body;

    const { data: booking, error: bookingError } = await supabaseAdmin
      .from("Booking")
      .insert({
        userId,
        vehicleId,
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
        pickupLocation,
        dropLocation,
        totalAmount,
        addOns: addOns || [],
        status: "CONFIRMED",
        paymentStatus: "PAID",
      })
      .select("*, vehicle:Vehicle(*)")
      .single();

    if (bookingError) throw bookingError;

    // Create payment record
    await supabaseAdmin.from("Payment").insert({
      bookingId: booking.id,
      amount: totalAmount,
      method: "ONLINE",
      status: "PAID",
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}
