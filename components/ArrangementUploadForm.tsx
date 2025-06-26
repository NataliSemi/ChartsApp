"use client";

import { useState } from "react";

export default function ArrangementUploadForm() {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        pdfUrl: "",
        coverImageUrl: "",
        isFeatured: false,
    });
    const [status, setStatus] = useState<
        "idle" | "submitting" | "success" | "error"
    >("idle");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");

        try {
            const res = await fetch("/api/arrangements/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    price: parseFloat(formData.price), // convert string to number
                }),
            });

            if (!res.ok) throw new Error("Upload failed");
            setStatus("success");
            setFormData({
                title: "",
                description: "",
                price: "",
                pdfUrl: "",
                coverImageUrl: "",
                isFeatured: false,
            });
        } catch (err) {
            console.error(err);
            setStatus("error");
        }
    };

    return (
        <div className="mb-8">
            <button
                onClick={() => setShowForm(!showForm)}
                className="mb-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition"
            >
                {showForm ? "Hide Upload Form" : "Upload New Arrangement"}
            </button>

            {showForm && (
                <form
                    onSubmit={handleSubmit}
                    className="bg-neutral-900 p-6 rounded-xl border border-neutral-700"
                >
                    <div className="mb-4">
                        <label className="block mb-1">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-3 py-2 rounded bg-neutral-800 text-white"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-3 py-2 rounded bg-neutral-800 text-white"
                            rows={3}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1">Price (USD)</label>
                        <input
                            type="number"
                            name="price"
                            step="0.01"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full px-3 py-2 rounded bg-neutral-800 text-white"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1">
                            PDF URL (Google Drive)
                        </label>
                        <input
                            type="url"
                            name="pdfUrl"
                            value={formData.pdfUrl}
                            onChange={handleChange}
                            className="w-full px-3 py-2 rounded bg-neutral-800 text-white"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1">
                            Cover Image URL (optional)
                        </label>
                        <input
                            type="url"
                            name="coverImageUrl"
                            value={formData.coverImageUrl}
                            onChange={handleChange}
                            className="w-full px-3 py-2 rounded bg-neutral-800 text-white"
                        />
                    </div>
                    <div className="mb-4 flex items-center gap-3">
                        <input
                            type="checkbox"
                            name="isFeatured"
                            checked={formData.isFeatured}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    isFeatured: e.target.checked,
                                }))
                            }
                            className="w-5 h-5 accent-blue-600 rounded focus:ring-blue-500"
                        />
                        <label
                            htmlFor="isFeatured"
                            className="text-sm text-neutral-200"
                        >
                            Mark as Featured
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-xl transition"
                        disabled={status === "submitting"}
                    >
                        {status === "submitting" ? "Submitting..." : "Submit"}
                    </button>

                    {status === "success" && (
                        <p className="text-green-400 mt-4">
                            Arrangement uploaded successfully!
                        </p>
                    )}
                    {status === "error" && (
                        <p className="text-red-400 mt-4">
                            Something went wrong. Try again.
                        </p>
                    )}
                </form>
            )}
        </div>
    );
}
