import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

const DEFAULT_SETTINGS = {
  businessName: "RydeX",
  contactEmail: "hello@rydex.in",
  phone: "+91 12345 67890",
  whatsapp: "+91 12345 67890",
  address: "Connaught Place, New Delhi, 110001",
  minRentalHours: 4,
  securityDeposit: 5000,
  lateReturnPenalty: 150,
  cancellationFee: 25,
  weekendSurge: true,
  holidayPricing: true,
  autoApproveBookings: false,
  is24x7: true,
  gracePeriodMinutes: 60,
  minAdvanceBookingHours: 2,
  emailNotifications: true,
  timerExpiryAlerts: true,
  locations: [
    "Connaught Place, Delhi",
    "Aerocity, Delhi",
    "Gurugram, Haryana",
    "Noida, UP",
    "Dwarka, Delhi",
    "Karol Bagh, Delhi",
    "Rajouri Garden, Delhi",
    "Greater Noida, UP",
    "Faridabad, Haryana",
    "Ghaziabad, UP",
  ],
};

export async function GET() {
  try {
    const { data: settings } = await supabaseAdmin
      .from("Settings")
      .select("data")
      .eq("id", "default")
      .single();

    if (!settings) {
      const { data: created, error } = await supabaseAdmin
        .from("Settings")
        .insert({ id: "default", data: DEFAULT_SETTINGS })
        .select("data")
        .single();
      if (error) throw error;
      return NextResponse.json(created.data);
    }

    return NextResponse.json(settings.data);
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    // Try update first, then insert if not found
    const { data: existing } = await supabaseAdmin
      .from("Settings")
      .select("id")
      .eq("id", "default")
      .single();

    let result;
    if (existing) {
      const { data, error } = await supabaseAdmin
        .from("Settings")
        .update({ data: body })
        .eq("id", "default")
        .select("data")
        .single();
      if (error) throw error;
      result = data;
    } else {
      const { data, error } = await supabaseAdmin
        .from("Settings")
        .insert({ id: "default", data: body })
        .select("data")
        .single();
      if (error) throw error;
      result = data;
    }

    return NextResponse.json(result.data);
  } catch (error) {
    console.error("Error saving settings:", error);
    return NextResponse.json(
      { error: "Failed to save settings" },
      { status: 500 }
    );
  }
}
