// components/LogoutButton.tsx
"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/"); // Redirect to homepage
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-md"
    >
      Logout
    </button>
  );
}
