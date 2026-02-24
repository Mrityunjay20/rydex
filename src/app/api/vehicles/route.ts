import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const fuelType = searchParams.get("fuelType");
    const transmission = searchParams.get("transmission");
    const search = searchParams.get("search");
    const sortBy = searchParams.get("sortBy");

    let query = supabaseAdmin.from("Vehicle").select("*");

    if (type) query = query.eq("type", type);
    if (fuelType) query = query.eq("fuelType", fuelType);
    if (transmission) query = query.eq("transmission", transmission);
    if (search) {
      query = query.or(
        `name.ilike.%${search}%,brand.ilike.%${search}%,model.ilike.%${search}%`
      );
    }

    if (sortBy === "price_asc") query = query.order("pricePerDay", { ascending: true });
    else if (sortBy === "price_desc") query = query.order("pricePerDay", { ascending: false });
    else if (sortBy === "newest") query = query.order("year", { ascending: false });
    else query = query.order("createdAt", { ascending: false });

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    return NextResponse.json(
      { error: "Failed to fetch vehicles" },
      { status: 500 }
    );
  }
}
