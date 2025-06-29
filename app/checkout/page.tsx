"use client";

import { useBasket } from "@/context/BasketContext";
import { useState } from "react";
import FondyRedirectForm from "@/components/FondyRedirectForm";

export default function CheckoutPage() {
    const { items, totalPrice, clearBasket } = useBasket();
    const [redirecting, setRedirecting] = useState(false);

    const handlePay = async () => {
        setRedirecting(true); // Optional: disable UI

        const orderData = {
            items: items.map(({ _id, title, price }) => ({
                arrangementId: _id,
                title,
                price,
            })),
            total: totalPrice * 100, // in cents
            email: "test@example.com", // Replace with real email or logged in user later
        };

        const res = await fetch("/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData),
        });

        if (res.ok) {
            clearBasket();
            setRedirecting(true);
        } else {
            alert("Failed to create order.");
            setRedirecting(false);
        }
    };

    const orderId = `ORDER-${Date.now()}`;
    const orderDesc = items.map((item) => item.title).join(", ");

    const fondyParams = {
        merchant_id: process.env.NEXT_PUBLIC_MERCHANT_ID || "",
        order_desc: orderDesc,
        amount: String(totalPrice * 100), // in cents
        currency: "USD",
        order_id: orderId,
    };

    if (redirecting) {
        return (
            <main className="min-h-screen flex items-center justify-center text-white">
                <div>
                    <h1 className="text-2xl font-bold">Order created!</h1>
                    <p>This is a mock redirect. You'd now be sent to Fondy.</p>
                    <pre className="mt-4 bg-black p-4 rounded text-sm overflow-auto">
                        {JSON.stringify(fondyParams, null, 2)}
                    </pre>
                </div>
            </main>
        );
    }

    if (items.length === 0) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-neutral-950 text-white">
                <p>Your basket is empty.</p>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-neutral-950 text-white px-6 py-12 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Checkout</h1>

            <ul className="space-y-4">
                {items.map((item) => (
                    <li key={item._id} className="flex justify-between">
                        <span>{item.title}</span>
                        <span>
                            {item.quantity} × ${item.price.toFixed(2)}
                        </span>
                    </li>
                ))}
            </ul>

            <p className="text-xl font-semibold mt-6">
                Total: ${totalPrice.toFixed(2)}
            </p>

            <button
                onClick={handlePay}
                className="mt-6 bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded"
            >
                Pay with Fondy
            </button>
        </main>
    );
}
