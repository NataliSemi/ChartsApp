"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch("/api/admin/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (res.ok) {
            router.push("/admin/dashboard");
        } else {
            alert("Invalid credentials.");
        }
    };

    return (
        <main className="min-h-screen bg-neutral-950 flex items-center justify-center text-white">
            <form onSubmit={handleLogin} className="p-6 bg-neutral-900 rounded-xl space-y-4 w-full max-w-sm">
                <h1 className="text-2xl font-bold">Admin Login</h1>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 rounded bg-neutral-800"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 rounded bg-neutral-800"
                    required
                />
                <button type="submit" className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500">
                    Login
                </button>
            </form>
        </main>
    );
}
