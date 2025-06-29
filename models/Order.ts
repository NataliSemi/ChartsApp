// models/Order.ts
import mongoose, { Schema, models } from "mongoose";

const OrderSchema = new Schema(
  {
    items: [
      {
        arrangementId: { type: Schema.Types.ObjectId, ref: "Arrangement", required: true },
        title: String,
        price: Number,
      },
    ],
    total: { type: Number, required: true },
    email: { type: String, required: true }, // or userId if you implement accounts
    status: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    paymentIntentId: { type: String }, // Stripe, LiqPay, etc.
  },
  { timestamps: true }
);

export default models.Order || mongoose.model("Order", OrderSchema);
