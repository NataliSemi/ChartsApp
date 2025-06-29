import Link from "next/link";
import { isAdminRequest } from "@/lib/checkAdmin";

export default async function Navbar() {
    const isAdmin = await isAdminRequest();

    return (
        <header className="bg-neutral-900 border-b border-neutral-800 text-neutral-100">
            <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold text-white">
                    🎶 [Your Name]
                </Link>
                <ul className="flex gap-6 text-sm font-medium">
                    <li>
                        <Link
                            href="/"
                            className="hover:text-blue-400 transition"
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/arrangements"
                            className="hover:text-blue-400 transition"
                        >
                            Arrangements
                        </Link>
                    </li>
                    {isAdmin && (
                        <li>
                            <Link
                                href="/admin/dashboard"
                                className="hover:text-blue-400 transition"
                            >
                                Dashboard
                            </Link>
                        </li>
                    )}
                    <li>
                        <Link
                            href="/basket"
                            className="hover:text-blue-400 transition"
                        >
                            Basket
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
