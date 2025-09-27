import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    categories: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    calories: {
      type: Number,
      required: true,
    },
    groupBloodNotAllowed: {
      type: [Boolean],
    },
    // yenilen yiyecekler
    eaten: {
      
    },
  },
  { timestamps: false }
);

export default mongoose.model("Product", productSchema);
