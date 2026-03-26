import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

// GET - List all coupons (admin only)
export async function GET() {
  try {
    const { data: coupons, error } = await supabaseAdmin
      .from("Coupon")
      .select("*")
      .order("createdAt", { ascending: false });

    if (error) {
      console.error("Error fetching coupons:", error);
      return NextResponse.json(
        { error: "Failed to fetch coupons" },
        { status: 500 }
      );
    }

    return NextResponse.json(coupons);
  } catch (error) {
    console.error("Error in GET /api/coupons:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Create new coupon (admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, discountPercent, isActive, expiryDate, maxUses, description } = body;

    // Validation
    if (!code || !discountPercent) {
      return NextResponse.json(
        { error: "Code and discount percentage are required" },
        { status: 400 }
      );
    }

    if (discountPercent < 1 || discountPercent > 100) {
      return NextResponse.json(
        { error: "Discount percentage must be between 1 and 100" },
        { status: 400 }
      );
    }

    // Check if coupon code already exists
    const { data: existing } = await supabaseAdmin
      .from("Coupon")
      .select("id")
      .eq("code", code.toUpperCase())
      .single();

    if (existing) {
      return NextResponse.json(
        { error: "Coupon code already exists" },
        { status: 409 }
      );
    }

    // Create coupon
    const { data: coupon, error } = await supabaseAdmin
      .from("Coupon")
      .insert({
        code: code.toUpperCase(),
        discountPercent: parseInt(discountPercent),
        isActive: isActive !== undefined ? isActive : true,
        expiryDate: expiryDate || null,
        maxUses: maxUses ? parseInt(maxUses) : null,
        usedCount: 0,
        description: description || null,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating coupon:", error);
      return NextResponse.json(
        { error: "Failed to create coupon" },
        { status: 500 }
      );
    }

    return NextResponse.json(coupon, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/coupons:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
