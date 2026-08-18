import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { data: vehicle, error } = await supabaseAdmin
      .from("Vehicle")
      .insert(body)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(vehicle, { status: 201 });
  } catch (error) {
    console.error("Error creating vehicle:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to create vehicle",
      },
      { status: 500 }
    );
  }
}
