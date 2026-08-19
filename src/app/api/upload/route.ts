import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  try {
    const { fileName, contentType } = await request.json();

    if (typeof fileName !== "string" || typeof contentType !== "string") {
      return NextResponse.json(
        { error: "File name and content type are required" },
        { status: 400 }
      );
    }

    if (!contentType.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only image files are supported" },
        { status: 400 }
      );
    }

    const extension = fileName.split(".").pop()?.replace(/[^a-zA-Z0-9]/g, "") || "jpg";
    const filePath = `vehicles/${crypto.randomUUID()}.${extension}`;

    const { data, error } = await supabaseAdmin.storage
      .from("vehicle-images")
      .createSignedUploadUrl(filePath);

    if (error) {
      console.error("Failed to create vehicle-image upload URL:", error);
      return NextResponse.json(
        { error: `Failed to prepare image upload: ${error.message}` },
        { status: 500 }
      );
    }

    const { data: { publicUrl } } = supabaseAdmin.storage
      .from("vehicle-images")
      .getPublicUrl(filePath);

    return NextResponse.json({
      path: filePath,
      token: data.token,
      url: publicUrl,
    });
  } catch (error) {
    console.error("Failed to prepare vehicle-image upload:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? `Failed to prepare image upload: ${error.message}`
            : "Failed to prepare image upload",
      },
      { status: 500 }
    );
  }
}
