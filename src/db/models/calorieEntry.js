import mongoose from "mongoose";
const now = new Date();
const gmt3 = new Date(now.getTime() + 3 * 60 * 60 * 1000);
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
  },
  { timestamps: true }
);

const CalorieEntry = mongoose.model("CalorieEntry", calorieEntrySchema);

export default CalorieEntry;
