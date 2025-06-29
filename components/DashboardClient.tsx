"use client";

import { useState } from "react";
import ArrangementEditForm from "./ArrangementEditForm";
import type { ArrangementType } from "@/types/arrangement";


interface Props {
  arrangements: ArrangementType[];
}

export default function DashboardClient({ arrangements }: Props) {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [arrList, setArrList] = useState(arrangements);

    const handleSave = (updatedArrangement: ArrangementType) => {
        setArrList((prev) =>
            prev.map((arr) =>
                arr._id === updatedArrangement._id ? updatedArrangement : arr
            )
        );
        setEditingId(null);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this chart?")) return;

        const res = await fetch(`/api/arrangements/${id}/delete`, {
            method: "DELETE",
        });

        if (res.ok) {
            setArrList((prev) => prev.filter((arr) => arr._id !== id));
        } else {
            alert("Failed to delete chart.");
        }
    };

    return (
        <ul className="space-y-4">
            {arrList.map((arr) => (
                <li
                    key={arr._id}
                    className="p-4 border border-neutral-700 rounded-md"
                >
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-xl font-bold">{arr.title}</h3>
                            <p className="text-sm text-neutral-400">
                                {arr.description}
                            </p>
                            <p className="text-sm text-green-400">
                                ${arr.price}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setEditingId(arr._id!)}
                                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(arr._id!)}

                                className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-md"
                            >
                                Delete
                            </button>
                        </div>
                    </div>

                    {editingId === arr._id && (
                        <ArrangementEditForm
                            arrangement={arr}
                            onCancel={() => setEditingId(null)}
                            onSave={handleSave}
                        />
                    )}
                </li>
            ))}
        </ul>
    );
}
