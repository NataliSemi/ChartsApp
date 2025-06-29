import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Arrangement from "@/models/Arrangement";
import { isAdminRequest } from "@/lib/checkAdmin";

// GET an arrangement by ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAdmin = await isAdminRequest();
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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

// DELETE an arrangement by ID
export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAdmin = await isAdminRequest();
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const { id } = await params;

  try {
    await Arrangement.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to delete" },
      { status: 500 }
    );
  }
}

// ✅ PUT: update an arrangement by ID
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAdmin = await isAdminRequest();
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const { id } = await params;
  const data = await req.json();

  try {
    const updated = await Arrangement.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json({ error: "Arrangement not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (err) {
    console.error("Update error:", err);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
