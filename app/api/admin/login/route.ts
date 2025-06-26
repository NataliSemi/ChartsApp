import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
    const { email, password } = await req.json();

    const isEmailValid = email === process.env.ADMIN_EMAIL;
    const isPasswordValid = bcrypt.compareSync(password, process.env.ADMIN_PASSWORD_HASH!);

    if (isEmailValid && isPasswordValid) {
        const token = jwt.sign({ admin: true }, process.env.JWT_SECRET!, { expiresIn: "2h" });

        const response = NextResponse.json({ success: true });
        response.cookies.set("admin-token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 60 * 60 * 2, // 2 hours
        });
        return response;
    }

    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
