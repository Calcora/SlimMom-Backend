import mongoose from "mongoose";

const dailyFoodEntrySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      required: true,
      // Günün başlangıcı (00:00) olarak ayarlanır
      default: () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return today;
      },
    },
    foods: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        productName: {
          type: String,
          required: true,
        },
        weight: {
          type: Number,
          required: true,
          min: 0,
        },
        calories: {
          type: Number,
          required: true,
          min: 0,
        },
        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    totalCalories: {
      type: Number,
      default: 0,
      min: 0,
    },
    targetCalories: {
      type: Number,
      required: true,
      min: 0,
    },
    remainingCalories: {
      type: Number,
      default: function() {
        return this.targetCalories - this.totalCalories;
      },
    },
  },
  { 
    timestamps: true,
    // Bir kullanıcının bir günde sadece bir entry'si olsun
    indexes: [
      { 
        unique: true, 
        fields: { userId: 1, date: 1 } 
      }
    ]
  }
);

// Her kaydetmeden önce totalCalories'i güncelle
dailyFoodEntrySchema.pre('save', function(next) {
  this.totalCalories = this.foods.reduce((total, food) => total + food.calories, 0);
  this.remainingCalories = this.targetCalories - this.totalCalories;
  next();
});

const DailyFoodEntry = mongoose.model("DailyFoodEntry", dailyFoodEntrySchema);

export default DailyFoodEntry;