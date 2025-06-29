"use client";

import { useState } from "react";
import type { ArrangementType } from "@/types/arrangement";

interface ArrangementEditFormProps {
  arrangement: ArrangementType;
  onCancel: () => void;
  onSave: (updatedArrangement: ArrangementType) => void;
}

export default function ArrangementEditForm({
  arrangement,
  onCancel,
  onSave,
}: ArrangementEditFormProps) {
  const [title, setTitle] = useState(arrangement.title);
  const [description, setDescription] = useState(arrangement.description || "");
  const [price, setPrice] = useState(arrangement.price);
  const [coverImageUrl, setCoverImageUrl] = useState(arrangement.coverImageUrl || "");
  const [pdfUrl, setPdfUrl] = useState(arrangement.pdfUrl);
  const [isFeatured, setIsFeatured] = useState(arrangement.isFeatured || false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updated: ArrangementType = {
      ...arrangement,
      title,
      description,
      price,
      coverImageUrl,
      pdfUrl,
      isFeatured,
    };

    const res = await fetch(`/api/arrangements/${arrangement._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });

    if (res.ok) {
      onSave(updated);
    } else {
      alert("Failed to update the arrangement.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 space-y-4 bg-neutral-800 p-4 rounded"
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full p-2 bg-neutral-900"
      />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="w-full p-2 bg-neutral-900"
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        placeholder="Price"
        className="w-full p-2 bg-neutral-900"
      />
      <input
        value={coverImageUrl}
        onChange={(e) => setCoverImageUrl(e.target.value)}
        placeholder="Cover Image URL"
        className="w-full p-2 bg-neutral-900"
      />
      <input
        value={pdfUrl}
        onChange={(e) => setPdfUrl(e.target.value)}
        placeholder="PDF URL"
        className="w-full p-2 bg-neutral-900"
      />
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={isFeatured}
          onChange={() => setIsFeatured(!isFeatured)}
        />
        <span>Featured</span>
      </label>
      <div className="flex gap-4">
        <button type="submit" className="bg-green-600 px-4 py-2 rounded">
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-red-600 px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
