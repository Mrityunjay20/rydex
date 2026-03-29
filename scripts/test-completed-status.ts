import "dotenv/config";
import { supabaseAdmin } from "../src/lib/supabase/admin";

async function testCompletedStatus() {
  console.log("🧪 Testing COMPLETED status functionality...\n");

  // Get a CONFIRMED booking to mark as COMPLETED
  const { data: confirmedBookings, error: fetchError } = await supabaseAdmin
    .from("Booking")
    .select("id, status, vehicleId, totalAmount, startDate, endDate")
    .eq("status", "CONFIRMED")
    .limit(1);

  if (fetchError) {
    console.error("❌ Error fetching CONFIRMED bookings:", fetchError);
    return;
  }

  if (!confirmedBookings || confirmedBookings.length === 0) {
    console.log("⚠️  No CONFIRMED bookings found to test with.");
    console.log("Creating a test COMPLETED booking instead...\n");

    // Get any booking and mark it as COMPLETED
    const { data: anyBooking } = await supabaseAdmin
      .from("Booking")
      .select("id, status")
      .limit(1)
      .single();

    if (!anyBooking) {
      console.log("❌ No bookings found in database at all!");
      process.exit(1);
    }

    const { data: updated, error: updateError } = await supabaseAdmin
      .from("Booking")
      .update({ status: "COMPLETED" })
      .eq("id", anyBooking.id)
      .select()
      .single();

    if (updateError) {
      console.error("❌ Error updating booking:", updateError);
      process.exit(1);
    }

    console.log(`✅ Updated booking ${anyBooking.id} from ${anyBooking.status} to COMPLETED`);
  } else {
    const booking = confirmedBookings[0];
    console.log(`📝 Found CONFIRMED booking: ${booking.id}`);
    console.log(`   Amount: ₹${booking.totalAmount}`);
    console.log(`   Period: ${new Date(booking.startDate).toLocaleDateString()} - ${new Date(booking.endDate).toLocaleDateString()}\n`);

    // Update to COMPLETED
    const { data: updated, error: updateError } = await supabaseAdmin
      .from("Booking")
      .update({ status: "COMPLETED" })
      .eq("id", booking.id)
      .select()
      .single();

    if (updateError) {
      console.error("❌ Error updating booking to COMPLETED:", updateError);
      process.exit(1);
    }

    console.log(`✅ Successfully updated booking ${booking.id} to COMPLETED\n`);
  }

  // Verify COMPLETED bookings now exist
  const { data: completedBookings, error: verifyError } = await supabaseAdmin
    .from("Booking")
    .select("id, status, totalAmount")
    .eq("status", "COMPLETED");

  if (verifyError) {
    console.error("❌ Error verifying COMPLETED bookings:", verifyError);
    process.exit(1);
  }

  console.log(`🎉 Total COMPLETED bookings in database: ${completedBookings?.length || 0}`);
  
  if (completedBookings && completedBookings.length > 0) {
    console.log("\n📋 COMPLETED bookings:");
    completedBookings.forEach((booking, index) => {
      console.log(`  ${index + 1}. ID: ${booking.id} - ₹${booking.totalAmount}`);
    });
    console.log("\n✅ SUCCESS! COMPLETED bookings should now appear in the admin dashboard.");
    console.log("   Visit: http://localhost:3000/admin/bookings");
    console.log("   Click on the 'COMPLETED' filter to see them.");
  }

  process.exit(0);
}

testCompletedStatus();
