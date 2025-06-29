import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";

export async function isAdminRequest(): Promise<boolean> {
    const cookieStore = await cookies(); // ✅ await here
    const token = cookieStore.get("admin-token")?.value;

    if (!token) return false;

    try {
        verify(token, process.env.JWT_SECRET!);
        return true;
    } catch {
        return false;
    }
}
