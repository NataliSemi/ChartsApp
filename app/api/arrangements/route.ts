import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Arrangement from "@/models/Arrangement";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const arrangements = await Arrangement.find().lean();
    return NextResponse.json(arrangements);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
