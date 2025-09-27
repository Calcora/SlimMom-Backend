import mongoose from "mongoose";

const calorieEntrySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    left: { type: Number, required: true },
    consumed: { type: Number, required: true },
    dailyRate: { type: Number, required: true },
    nOfNormal: { type: Number, required: true },
    notAllowedProducts: [
      {
        type: String,
        ref: "Product",
        required: true,
      },
    ],
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const CalorieEntry = mongoose.model("CalorieEntry", calorieEntrySchema);

export default CalorieEntry;
