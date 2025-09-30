import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // userData: {
    //   height: { type: Number, required: true },
    //   age: { type: Number, required: true },
    //   currentWeight: { type: Number, required: true },
    //   desiredWeight: { type: Number, required: true },
    //   bloodType: { type: Number, enum: [1, 2, 3, 4], default: 1 },
    // },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
