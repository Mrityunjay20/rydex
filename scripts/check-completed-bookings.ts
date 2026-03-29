import "dotenv/config";
import { supabaseAdmin } from "../src/lib/supabase/admin";

async function checkCompletedBookings() {
  console.log("🔍 Checking for COMPLETED bookings...\n");

  // Check all bookings
  const { data: allBookings, error: allError } = await supabaseAdmin
    .from("Booking")
    .select("id, status, startDate, endDate, vehicleId, totalAmount")
    .order("createdAt", { ascending: false });

  if (allError) {
    console.error("❌ Error fetching all bookings:", allError);
    return;
  }

  console.log(`📊 Total bookings: ${allBookings?.length || 0}`);
  
  // Group by status
  const statusGroups = allBookings?.reduce((acc, booking) => {
    acc[booking.status] = (acc[booking.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  console.log("\n📈 Bookings by status:");
  Object.entries(statusGroups || {}).forEach(([status, count]) => {
    console.log(`  ${status}: ${count}`);
  });

  // Check specifically for COMPLETED bookings
  const { data: completedBookings, error: completedError } = await supabaseAdmin
    .from("Booking")
    .select("id, status, startDate, endDate, vehicleId, totalAmount")
    .eq("status", "COMPLETED");

  if (completedError) {
    console.error("\n❌ Error fetching COMPLETED bookings:", completedError);
    return;
  }

  console.log(`\n✅ COMPLETED bookings found: ${completedBookings?.length || 0}`);
  
  if (completedBookings && completedBookings.length > 0) {
    console.log("\n📋 COMPLETED bookings details:");
    completedBookings.forEach((booking, index) => {
      console.log(`  ${index + 1}. ID: ${booking.id}`);
      console.log(`     Status: ${booking.status}`);
      console.log(`     Amount: ₹${booking.totalAmount}`);
      console.log(`     Period: ${new Date(booking.startDate).toLocaleDateString()} - ${new Date(booking.endDate).toLocaleDateString()}`);
    });
  } else {
    console.log("\n⚠️  No COMPLETED bookings found in database.");
    console.log("This explains why they don't appear in the admin dashboard.");
  }

  console.log("\n🔧 Database schema check:");
  console.log("  BookingStatus enum should include: PENDING, CONFIRMED, ACTIVE, COMPLETED, CANCELLED");
  
  process.exit(0);
}

checkCompletedBookings();
