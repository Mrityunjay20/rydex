import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

// POST - Validate coupon code
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json(
        { error: "Coupon code is required" },
        { status: 400 }
      );
    }

    // Fetch coupon
    const { data: coupon, error } = await supabaseAdmin
      .from("Coupon")
      .select("*")
      .eq("code", code.toUpperCase())
      .single();

    if (error || !coupon) {
      return NextResponse.json(
        { error: "Invalid coupon code", valid: false },
        { status: 404 }
      );
    }

    // Check if coupon is active
    if (!coupon.isActive) {
      return NextResponse.json(
        { error: "This coupon is no longer active", valid: false },
        { status: 400 }
      );
    }

    // Check expiry date
    if (coupon.expiryDate) {
      const expiryDate = new Date(coupon.expiryDate);
      const now = new Date();
      if (now > expiryDate) {
        return NextResponse.json(
          { error: "This coupon has expired", valid: false },
          { status: 400 }
        );
      }
    }

    // Check max uses
    if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) {
      return NextResponse.json(
        { error: "This coupon has reached its usage limit", valid: false },
        { status: 400 }
      );
    }

    // Coupon is valid
    return NextResponse.json({
      valid: true,
      coupon: {
        id: coupon.id,
        code: coupon.code,
        discountPercent: coupon.discountPercent,
        description: coupon.description,
      },
    });
  } catch (error) {
    console.error("Error validating coupon:", error);
    return NextResponse.json(
      { error: "Internal server error", valid: false },
      { status: 500 }
    );
  }
}
