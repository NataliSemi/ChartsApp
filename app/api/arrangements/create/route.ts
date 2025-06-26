import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Arrangement from "@/models/Arrangement";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, price, pdfUrl, coverImageUrl, isFeatured } = body;

    if (!title || !price || !pdfUrl) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    if (!mongoose.connection.readyState) {
      await mongoose.connect(process.env.MONGODB_URI!);
    }

    const newArrangement = await Arrangement.create({
      title,
      description,
      price,
      pdfUrl,
      coverImageUrl,
      isFeatured
    });

    return NextResponse.json(newArrangement, { status: 201 });
  } catch (err) {
    console.error("Error creating arrangement:", err);
    return NextResponse.json(
      { error: "Failed to create arrangement" },
      { status: 500 }
    );
  }
}
