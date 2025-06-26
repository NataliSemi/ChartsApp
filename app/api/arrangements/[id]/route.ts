import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Arrangement from "@/models/Arrangement";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await params;

  try {
    const arrangement = await Arrangement.findById(id);
    if (!arrangement) {
      return NextResponse.json(
        { error: "Arrangement not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(arrangement);
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid ID format or server error" },
      { status: 500 }
    );
  }
}
