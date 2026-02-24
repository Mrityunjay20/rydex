import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { data: vehicle, error } = await supabaseAdmin
      .from("Vehicle")
      .select("*, Review(*, User(*))")
      .eq("id", id)
      .single();

    if (error || !vehicle) {
      return NextResponse.json(
        { error: "Vehicle not found" },
        { status: 404 }
      );
    }

    // Reshape to match expected format
    const result = { ...vehicle, reviews: vehicle.Review || [] };
    delete result.Review;

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching vehicle:", error);
    return NextResponse.json(
      { error: "Failed to fetch vehicle" },
      { status: 500 }
    );
  }
}
