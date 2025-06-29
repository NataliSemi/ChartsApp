"use client";

import Basket from "@/components/Basket";

export default function BasketPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 px-6 py-16 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Your Basket</h1>
      <Basket />
    </main>
  );
}
