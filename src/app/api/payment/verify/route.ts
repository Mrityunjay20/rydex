import { NextRequest, NextResponse } from "next/server";
import { verifyPaymentSignature } from "@/lib/razorpay";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { Resend } from "resend";
import { getBookingConfirmationEmail, getAdminBookingNotification } from "@/lib/email-templates";

const resend = new Resend(process.env.RESEND_API_KEY);
const adminEmail = "admin@rydex.in";

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

      // Fetch booking details for email
      try {
        const { data: booking } = await supabaseAdmin
          .from("Booking")
          .select("*, vehicle:Vehicle(*)")
          .eq("id", bookingId)
          .single();

        // Increment coupon usage count if coupon was used
        if (booking && booking.couponCode) {
          const { data: coupon } = await supabaseAdmin
            .from("Coupon")
            .select("usedCount")
            .eq("code", booking.couponCode)
            .single();
          
          if (coupon) {
            await supabaseAdmin
              .from("Coupon")
              .update({ usedCount: (coupon.usedCount || 0) + 1 })
              .eq("code", booking.couponCode);
          }
        }

        if (booking && booking.userEmail) {
          const emailData = {
            bookingId: booking.id,
            customerName: booking.userName || "Customer",
            customerEmail: booking.userEmail,
            vehicleName: booking.vehicle.name,
            vehicleModel: booking.vehicle.model,
            startDate: booking.startDate,
            endDate: booking.endDate,
            pickupLocation: booking.pickupLocation,
            dropLocation: booking.dropLocation,
            totalAmount: booking.totalAmount,
            addOns: booking.addOns || [],
          };

          // Send confirmation email to customer
          const confirmationEmail = getBookingConfirmationEmail(emailData);
          await resend.emails.send({
            from: 'RydeX <bookings@rydexcar.com>',
            to: booking.userEmail,
            cc: ['support@ryderxcar.com'],
            subject: confirmationEmail.subject,
            html: confirmationEmail.html,
          });

          // Send notification to admin
          const adminNotification = getAdminBookingNotification(emailData);
          await resend.emails.send({
            from: 'RydeX <notifications@rydexcar.com>',
            to: adminEmail,
            cc: ['support@ryderxcar.com'],
            subject: adminNotification.subject,
            html: adminNotification.html,
          });

          console.log("Booking confirmation emails sent after payment verification");
        }
      } catch (emailError) {
        console.error("Error sending confirmation emails:", emailError);
        // Don't fail payment verification if email fails
      }
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
