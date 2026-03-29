import { supabaseAdmin } from "../src/lib/supabase/admin";

async function checkPaymentStatus() {
  const { data: bookings, error } = await supabaseAdmin
    .from("Booking")
    .select("*, payment:Payment(*)");

  if (error) {
    console.error("Error:", error);
    return;
  }

  console.log("Total bookings:", bookings?.length);
  
  const paymentStatusCounts: Record<string, number> = {};
  const bookingStatusCounts: Record<string, number> = {};
  
  bookings?.forEach((b: any) => {
    const paymentStatus = b.payment?.status || "NO_PAYMENT";
    const bookingStatus = b.status;
    
    paymentStatusCounts[paymentStatus] = (paymentStatusCounts[paymentStatus] || 0) + 1;
    bookingStatusCounts[bookingStatus] = (bookingStatusCounts[bookingStatus] || 0) + 1;
  });
  
  console.log("\nPayment Status Counts:");
  console.log(paymentStatusCounts);
  
  console.log("\nBooking Status Counts:");
  console.log(bookingStatusCounts);
  
  console.log("\nSample bookings:");
  bookings?.slice(0, 3).forEach((b: any) => {
    console.log({
      id: b.id,
      status: b.status,
      paymentStatus: b.payment?.status || "NO_PAYMENT",
      amount: b.totalAmount,
      createdAt: b.createdAt,
    });
  });
}

checkPaymentStatus();
