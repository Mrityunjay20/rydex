import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

// PATCH - Update coupon (admin only)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const { data: coupon, error } = await supabaseAdmin
      .from("Coupon")
      .update(body)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating coupon:", error);
      return NextResponse.json(
        { error: "Failed to update coupon" },
        { status: 500 }
      );
    }

    return NextResponse.json(coupon);
  } catch (error) {
    console.error("Error in PATCH /api/coupons/[id]:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE - Delete coupon (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { error } = await supabaseAdmin
      .from("Coupon")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting coupon:", error);
      return NextResponse.json(
        { error: "Failed to delete coupon" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in DELETE /api/coupons/[id]:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
