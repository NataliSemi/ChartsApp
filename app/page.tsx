"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Loader from "@/components/Loader";
import Hero from "@/components/Hero";

type Arrangement = {
    _id: string;
    title: string;
    description: string;
    coverImageUrl?: string;
};

export default function FeaturedArrangements() {
    const [arrangements, setArrangements] = useState<Arrangement[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/arrangements/featured")
            .then((res) => res.json())
            .then((data) => {
                setArrangements(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <Loader />;
    }

    if (!loading && arrangements.length === 0) {
        return (
            <main className="min-h-screen bg-neutral-950 text-neutral-100">
                <Hero />
                <section className="py-16 px-6 max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4 text-neutral-100">
                        Featured Arrangements
                    </h2>
                    <p className="text-neutral-400 text-lg">
                        No arrangements found.
                    </p>
                </section>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-neutral-950 text-neutral-100">
            {/* Hero Section */}
            <Hero />
            <section className="py-16 px-6 max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center text-neutral-100">
                    Featured Arrangements
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {arrangements.map((arr) => (
                        <div
                            key={arr._id}
                            className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 hover:border-blue-600 transition"
                        >
                            {arr.coverImageUrl && (
                                <img
                                    src={arr.coverImageUrl}
                                    alt={arr.title}
                                    className="rounded-lg mb-4 w-full h-48 object-cover"
                                />
                            )}
                            <h3 className="text-xl font-semibold mb-2">
                                {arr.title}
                            </h3>
                            <p className="text-neutral-400 text-sm mb-4">
                                {arr.description}
                            </p>
                            <Link
                                href={`/arrangements/${arr._id}`}
                                className="text-blue-400 hover:text-blue-300 font-medium"
                            >
                                View Arrangement →
                            </Link>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
