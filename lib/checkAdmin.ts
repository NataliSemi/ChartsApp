import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";

export async function isAdminRequest(): Promise<boolean> {
    const cookieStore = await cookies(); // 👈 Now awaited
    const token = cookieStore.get("admin-token")?.value;

    if (!token) return false;

    try {
        const decoded = verify(token, process.env.ADMIN_SECRET!);
        return !!decoded;
    } catch {
        return false;
    }
}
