import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { bookingId, newEndDate } = body;

    if (!bookingId || !newEndDate) {
      return NextResponse.json(
        { error: "Missing booking ID or new end date" },
        { status: 400 }
      );
    }

    // Get existing booking
    const { data: booking, error: fetchError } = await supabaseAdmin
      .from("Booking")
      .select("*, vehicle:Vehicle(*)")
      .eq("id", bookingId)
      .single();

    if (fetchError || !booking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    // Check if booking can be extended (must be CONFIRMED or ACTIVE)
    if (!["CONFIRMED", "ACTIVE"].includes(booking.status)) {
      return NextResponse.json(
        { error: "Only confirmed or active bookings can be extended" },
        { status: 400 }
      );
    }

    const currentEndDate = new Date(booking.endDate);
    const requestedEndDate = new Date(newEndDate);

    // Validate new end date is after current end date
    if (requestedEndDate <= currentEndDate) {
      return NextResponse.json(
        { error: "New end date must be after current end date" },
        { status: 400 }
      );
    }

    // Check vehicle availability for extension period
    const { data: conflictingBookings } = await supabaseAdmin
      .from("Booking")
      .select("id, startDate, endDate, status")
      .eq("vehicleId", booking.vehicleId)
      .neq("id", bookingId) // Exclude current booking
      .in("status", ["PENDING", "CONFIRMED", "ACTIVE"]);

    // Check for overlapping bookings during extension period
    const hasConflict = conflictingBookings?.some((otherBooking) => {
      const otherStart = new Date(otherBooking.startDate);
      const otherEnd = new Date(otherBooking.endDate);
      
      // Check if extension period overlaps with other bookings
      return (
        (currentEndDate < otherEnd && requestedEndDate > otherStart)
      );
    });

    if (hasConflict) {
      return NextResponse.json(
        { 
          error: "Vehicle is not available for the requested extension period. Another booking exists.",
          code: "VEHICLE_UNAVAILABLE"
        },
        { status: 409 }
      );
    }

    // Calculate additional amount for extension
    const extensionHours = Math.ceil(
      (requestedEndDate.getTime() - currentEndDate.getTime()) / (1000 * 60 * 60)
    );
    
    // Always use hourly rate as set by admin
    const additionalAmount = extensionHours * booking.vehicle.pricePerHour;

    const newTotalAmount = booking.totalAmount + additionalAmount;

    // Return payment details - don't extend yet, wait for payment
    return NextResponse.json({
      success: true,
      requiresPayment: true,
      additionalAmount,
      newTotalAmount,
      newEndDate: requestedEndDate.toISOString(),
      bookingId,
      vehicleName: booking.vehicle.name,
    });
  } catch (error) {
    console.error("Error extending booking:", error);
    return NextResponse.json(
      { error: "Failed to extend booking" },
      { status: 500 }
    );
  }
}
