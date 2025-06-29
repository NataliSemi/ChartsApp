"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Loader from "@/components/Loader";
import ArrangementUploadForm from "@/components/ArrangementUploadForm";

type Arrangement = {
    _id: string;
    title: string;
    description: string;
    price: number;
    pdfUrl: string;
    coverImageUrl?: string;
};

export default function ArrangementsPage() {
    const [arrangements, setArrangements] = useState<Arrangement[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/arrangements")
            .then(async (res) => {
                if (!res.ok) {
                    const errorText = await res.text();
                    throw new Error(`API error: ${res.status} - ${errorText}`);
                }
                return res.json();
            })
            .then((data) => {
                setArrangements(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setArrangements([]);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <main className="min-h-screen bg-neutral-950 text-neutral-100 px-6 py-16 max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold mb-10">Arrangements</h1>




            {(!arrangements || arrangements.length === 0) ? (
                <p className="mt-10 text-xl text-neutral-400">No arrangements yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                    {arrangements.map((arr) => (
                        <div
                            key={arr._id}
                            className="bg-neutral-900 rounded-2xl p-6 border border-neutral-800 hover:border-blue-600 transition"
                        >
                            {arr.coverImageUrl && (
                                <img
                                    src={arr.coverImageUrl}
                                    alt={arr.title}
                                    className="rounded-lg mb-4 w-full h-48 object-cover"
                                />
                            )}
                            <h2 className="text-xl font-semibold mb-2">
                                {arr.title}
                            </h2>
                            <p className="text-neutral-400 mb-4">
                                {arr.description}
                            </p>
                            <p className="mb-4 font-semibold">
                                ${arr.price.toFixed(2)}
                            </p>
                            <Link
                                href={`/arrangements/${arr._id}`}
                                className="text-blue-400 hover:text-blue-300 font-medium"
                            >
                                View Details →
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}
