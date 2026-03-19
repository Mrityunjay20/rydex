import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { bookingId, newEndDate, additionalAmount } = body;

    if (!bookingId || !newEndDate || !additionalAmount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get existing booking with vehicle details
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

    // Update booking with new end date and amount
    const newTotalAmount = booking.totalAmount + additionalAmount;

    const { error: updateError } = await supabaseAdmin
      .from("Booking")
      .update({
        endDate: new Date(newEndDate).toISOString(),
        totalAmount: newTotalAmount,
      })
      .eq("id", bookingId);

    if (updateError) {
      throw updateError;
    }

    // Create payment record for extension
    await supabaseAdmin.from("Payment").insert({
      bookingId: bookingId,
      amount: additionalAmount,
      method: "ONLINE",
      status: "PAID",
    });

    // Send extension confirmation email
    if (booking.userEmail) {
      try {
        const formattedNewEndDate = new Date(newEndDate).toLocaleString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });

        const formattedOriginalEndDate = new Date(booking.endDate).toLocaleString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });

        await resend.emails.send({
          from: 'RydeX <bookings@rydexcar.com>',
          to: booking.userEmail,
          subject: `Booking Extended - ${booking.vehicle?.name || 'Vehicle'}`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                <h1 style="color: white; margin: 0; font-size: 28px;">Booking Extended!</h1>
              </div>
              
              <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px;">
                <p style="font-size: 16px; margin-bottom: 20px;">
                  Hi ${booking.userName || 'Customer'},
                </p>
                
                <p style="font-size: 16px; margin-bottom: 20px;">
                  Your booking has been successfully extended. Here are the updated details:
                </p>
                
                <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #2563eb;">
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Booking ID:</td>
                      <td style="padding: 8px 0; text-align: right;">${bookingId}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Vehicle:</td>
                      <td style="padding: 8px 0; text-align: right;">${booking.vehicle?.name || 'N/A'} ${booking.vehicle?.model || ''}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Original End Date:</td>
                      <td style="padding: 8px 0; text-align: right; text-decoration: line-through; color: #94a3b8;">${formattedOriginalEndDate}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #64748b; font-weight: 600;">New End Date:</td>
                      <td style="padding: 8px 0; text-align: right; color: #16a34a; font-weight: 600;">${formattedNewEndDate}</td>
                    </tr>
                    <tr style="border-top: 2px solid #e2e8f0;">
                      <td style="padding: 12px 0; color: #1e293b; font-weight: 700; font-size: 16px;">Extension Amount:</td>
                      <td style="padding: 12px 0; text-align: right; color: #2563eb; font-weight: 700; font-size: 16px;">₹${additionalAmount.toLocaleString('en-IN')}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #1e293b; font-weight: 700; font-size: 18px;">New Total Amount:</td>
                      <td style="padding: 8px 0; text-align: right; color: #2563eb; font-weight: 700; font-size: 18px;">₹${newTotalAmount.toLocaleString('en-IN')}</td>
                    </tr>
                  </table>
                </div>
                
                <p style="font-size: 14px; color: #64748b; margin-bottom: 20px;">
                  Your payment has been processed successfully. You can continue enjoying your rental until the new end date.
                </p>
                
                <div style="text-align: center; margin-top: 30px;">
                  <p style="font-size: 12px; color: #94a3b8;">
                    Thank you for choosing RydeX!
                  </p>
                </div>
              </div>
            </body>
            </html>
          `,
        });
      } catch (emailError) {
        console.error("Error sending extension email:", emailError);
        // Don't fail the extension if email fails
      }
    }

    return NextResponse.json({
      success: true,
      message: "Booking extended successfully",
      newTotalAmount,
    });
  } catch (error) {
    console.error("Error confirming extension:", error);
    return NextResponse.json(
      { error: "Failed to confirm extension" },
      { status: 500 }
    );
  }
}
