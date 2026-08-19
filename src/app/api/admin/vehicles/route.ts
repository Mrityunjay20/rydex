import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { data: vehicle, error } = await supabaseAdmin
      .from("Vehicle")
      .insert({
        ...body,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(vehicle, { status: 201 });
  } catch (error) {
    console.error("Error creating vehicle:", error);
    const supabaseError = error as {
      message?: string;
      details?: string;
      hint?: string;
      code?: string;
    };
    const message = [
      supabaseError.message,
      supabaseError.details,
      supabaseError.hint,
    ]
      .filter(Boolean)
      .join(" ");

    return NextResponse.json(
      {
        error: message || "Failed to create vehicle",
      },
      { status: supabaseError.code === "23505" ? 409 : 500 }
    );
  }
}
