"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Loader from "@/components/Loader";
import { useBasket } from "@/context/BasketContext";

type Arrangement = {
    _id: string;
    title: string;
    description: string;
    price: number;
    pdfUrl: string;
    coverImageUrl?: string;
};

export default function ArrangementDetailsPage() {
    const { id } = useParams();
    const [arrangement, setArrangement] = useState<Arrangement | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { addItem } = useBasket();
    const [added, setAdded] = useState(false);

    useEffect(() => {
        fetch(`/api/arrangements/${id}`)
            .then(async (res) => {
                if (!res.ok) {
                    setError(true);
                    setLoading(false);
                    return;
                }
                const data = await res.json();
                setArrangement(data);
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <Loader />;
    }

    if (error || !arrangement) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-neutral-950 text-red-400">
                <p className="text-xl">
                    Arrangement not found or an error occurred.
                </p>
            </main>
        );
    }

    const handleAdd = () => {
        addItem({
            _id: arrangement._id,
            title: arrangement.title,
            price: arrangement.price,
        });
        setAdded(true);
        setTimeout(() => setAdded(false), 2000); // Hide notification after 2 seconds
    };

    return (
        <main className="min-h-screen bg-neutral-950 text-white px-6 py-12 max-w-3xl mx-auto">
            <Link
                href="/arrangements"
                className="text-blue-400 hover:underline mb-6 block"
            >
                ← Back to Arrangements
            </Link>

            <h1 className="text-3xl font-bold mb-4">{arrangement.title}</h1>

            {arrangement.coverImageUrl && (
                <img
                    src={arrangement.coverImageUrl}
                    alt={arrangement.title}
                    className="rounded-lg mb-6 w-full max-h-[400px] object-cover"
                />
            )}

            <p className="text-neutral-300 mb-4">{arrangement.description}</p>

            <p className="text-lg font-semibold mb-6">
                ${arrangement.price.toFixed(2)}
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4 sm:items-center">
                <a
                    href={arrangement.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl transition font-medium text-center"
                >
                    View / Download PDF
                </a>

                <div className="relative">
                    <button
                        onClick={handleAdd}
                        className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-xl font-medium transition"
                    >
                        Add to Basket
                    </button>

                    {added && (
                        <div className="absolute left-0 mt-2 bg-gradient-to-r from-purple-700 to-blue-500 text-white px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 animate-jazz-pop text-sm font-semibold z-50">
                            🎷 Added to basket! Keep swingin’!
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
