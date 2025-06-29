import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export async function POST(req: Request) {
    const { email, password } = await req.json();

    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
    const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;
    const JWT_SECRET = process.env.JWT_SECRET;

    if (!ADMIN_EMAIL || !ADMIN_PASSWORD_HASH || !JWT_SECRET) {
        console.error("Missing environment variables.");
        return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
    }

    const isEmailValid = email === ADMIN_EMAIL;
    const isPasswordValid = bcrypt.compareSync(password, ADMIN_PASSWORD_HASH);

    if (isEmailValid && isPasswordValid) {
        const token = jwt.sign({ admin: true }, JWT_SECRET, { expiresIn: "2h" });

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
