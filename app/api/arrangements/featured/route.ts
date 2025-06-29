import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Arrangement from "@/models/Arrangement";

export async function GET() {
  await dbConnect();

  try {
    const featured = await Arrangement.find({ isFeatured: true }).sort({ createdAt: -1 });
    return NextResponse.json(featured);
  } catch (error) {
    console.error("Failed to fetch featured arrangements:", error);
    return NextResponse.json({ error: "Failed to fetch featured arrangements" }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';