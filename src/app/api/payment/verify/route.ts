import { NextRequest, NextResponse } from "next/server";
import { verifyPaymentSignature } from "@/lib/razorpay";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      bookingId,
    } = body;

    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return NextResponse.json(
        { error: "Missing payment details" },
        { status: 400 }
      );
    }

    const isValid = verifyPaymentSignature(
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature
    );

    if (!isValid) {
      if (bookingId) {
        await supabaseAdmin
          .from("Booking")
          .update({ paymentStatus: "FAILED" })
          .eq("id", bookingId);

        await supabaseAdmin
          .from("Payment")
          .update({ status: "FAILED" })
          .eq("bookingId", bookingId);
      }

      return NextResponse.json(
        { error: "Invalid payment signature" },
        { status: 400 }
      );
    }

    if (bookingId) {
      await supabaseAdmin
        .from("Booking")
        .update({ 
          paymentStatus: "PAID",
          status: "CONFIRMED"
        })
        .eq("id", bookingId);

      await supabaseAdmin
        .from("Payment")
        .update({
          status: "PAID",
          razorpayOrderId,
          razorpayPaymentId,
        })
        .eq("bookingId", bookingId);
    }

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      { error: "Failed to verify payment" },
      { status: 500 }
    );
  }
}
