import mongoose, { Schema, model, models } from "mongoose";

const ArrangementSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  pdfUrl: { type: String, required: true },
  coverImageUrl: { type: String },
  isFeatured: { type: Boolean, default: false }, // 👈 Add this
}, { timestamps: true });

export default models.Arrangement || model("Arrangement", ArrangementSchema);
