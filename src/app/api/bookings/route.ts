import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { resend } from "@/lib/resend";
import { getBookingConfirmationEmail, getAdminBookingNotification } from "@/lib/email-templates";

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
      vehicleId,
      startDate,
      endDate,
      pickupLocation,
      dropLocation,
      totalAmount,
      addOns,
      razorpayOrderId,
      userEmail,
      userName,
      couponCode,
      discountAmount,
      originalAmount,
    } = body;

    // Check vehicle availability - prevent double bookings
    const requestedStart = new Date(startDate);
    const requestedEnd = new Date(endDate);

    const { data: existingBookings } = await supabaseAdmin
      .from("Booking")
      .select("id, startDate, endDate, status")
      .eq("vehicleId", vehicleId)
      .in("status", ["PENDING", "CONFIRMED", "ACTIVE"]);

    // Check for overlapping bookings
    const hasConflict = existingBookings?.some((booking) => {
      const bookingStart = new Date(booking.startDate);
      const bookingEnd = new Date(booking.endDate);
      // Add 1-hour buffer after booking ends (for cleaning/preparation)
      const bookingEndWithBuffer = new Date(bookingEnd.getTime() + (60 * 60 * 1000));
      
      // Check if dates overlap (including 1-hour buffer after each booking)
      return (
        (requestedStart >= bookingStart && requestedStart < bookingEndWithBuffer) ||
        (requestedEnd > bookingStart && requestedEnd <= bookingEndWithBuffer) ||
        (requestedStart <= bookingStart && requestedEnd >= bookingEndWithBuffer)
      );
    });

    if (hasConflict) {
      return NextResponse.json(
        { 
          error: "Vehicle is not available for the selected dates. Please choose different dates or another vehicle.",
          code: "VEHICLE_UNAVAILABLE"
        },
        { status: 409 }
      );
    }

    const { data: booking, error: bookingError } = await supabaseAdmin
      .from("Booking")
      .insert({
        userId: null,
        vehicleId,
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
        pickupLocation,
        dropLocation,
        totalAmount,
        addOns: addOns || [],
        status: "PENDING",
        paymentStatus: "PENDING",
        userEmail: userEmail || null,
        userName: userName || null,
        couponCode: couponCode || null,
        discountAmount: discountAmount || 0,
        originalAmount: originalAmount || totalAmount,
      })
      .select("*, vehicle:Vehicle(*)")
      .single();

    if (bookingError) throw bookingError;

    await supabaseAdmin.from("Payment").insert({
      bookingId: booking.id,
      amount: totalAmount,
      method: "ONLINE",
      razorpayOrderId: razorpayOrderId || null,
      status: "PENDING",
    });

    // Send confirmation emails
    try {
      // Use email and name from request body
      const customerEmail = userEmail || null;
      const customerName = userName || "Customer";

      // Get admin settings for admin email
      const { data: settings } = await supabaseAdmin
        .from("Settings")
        .select("data")
        .eq("id", "default")
        .single();

      const adminEmail = settings?.data?.contactEmail || "admin@rydex.in";

      const emailData = {
        bookingId: booking.id,
        customerName: customerName,
        customerEmail: customerEmail || "guest@example.com",
        vehicleName: booking.vehicle.name,
        vehicleModel: booking.vehicle.model,
        startDate: booking.startDate,
        endDate: booking.endDate,
        pickupLocation: booking.pickupLocation,
        dropLocation: booking.dropLocation,
        totalAmount: booking.totalAmount,
        addOns: booking.addOns || [],
      };

      // Note: Emails will be sent after payment verification
      // See /api/payment/verify endpoint
    } catch (emailError) {
      console.error("Error preparing booking data:", emailError);
    }

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}
