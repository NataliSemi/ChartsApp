// /app/api/orders/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Order from "@/models/Order";
import { isAdminRequest } from "@/lib/checkAdmin";

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();

  const { items, total, email } = body;

  if (!items || !total || !email) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const newOrder = await Order.create({
      items,
      total,
      email,
      status: "pending"
    });

    return NextResponse.json(newOrder);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}



export async function GET(req: NextRequest) {
  const isAdmin = await isAdminRequest();
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}