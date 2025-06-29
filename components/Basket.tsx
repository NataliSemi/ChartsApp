"use client";

import { useBasket } from "@/context/BasketContext";
import Link from "next/link";

export default function Basket() {
  const { items, updateQuantity, removeItem, clearBasket, totalPrice } = useBasket();

  if (items.length === 0)
    return (
      <main className="min-h-screen flex items-center justify-center text-white bg-neutral-950">
        <p className="text-lg">🎺 Your basket is empty. Go grab some charts!</p>
      </main>
    );

  return (
    <main className="min-h-screen px-6 py-12 bg-neutral-950 text-white">
      <div className="max-w-3xl mx-auto bg-neutral-900 p-6 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold mb-6">🥁 Your Basket</h2>

        <ul className="space-y-6">
          {items.map((item) => (
            <li
              key={item._id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-neutral-800 pb-4"
            >
              <div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-neutral-400">${item.price.toFixed(2)} each</p>
              </div>
              <div className="flex items-center space-x-3 mt-2 sm:mt-0">
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item._id, Number(e.target.value))}
                  className="w-20 p-2 rounded bg-neutral-800 text-white border border-neutral-700"
                />
                <button
                  onClick={() => removeItem(item._id)}
                  className="bg-red-600 px-3 py-1 rounded hover:bg-red-500"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 text-lg font-semibold">
          Total: ${totalPrice.toFixed(2)}
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={() => clearBasket()}
            className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600"
          >
            Clear Basket
          </button>

          <Link
            href="/checkout"
            className="bg-green-600 px-4 py-2 rounded hover:bg-green-500 text-white font-medium"
          >
            Checkout
          </Link>
        </div>
      </div>
    </main>
  );
}
