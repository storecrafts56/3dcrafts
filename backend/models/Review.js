const mongoose = require("mongoose");

// Define Review Schema
const reviewSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
    approved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// ✅ Remove any existing conflicting index if it exists
reviewSchema.index({ productId: 1, approved: 1 });

// ✅ Optional: if you previously had an index involving userId, drop it when the app starts
reviewSchema.pre("save", async function (next) {
  const Review = mongoose.model("Review", reviewSchema);
  try {
    const indexes = await Review.collection.getIndexes({ full: true });
    const oldIndex = indexes.find((i) => i.name === "userId_1_productId_1");
    if (oldIndex) {
      await Review.collection.dropIndex("userId_1_productId_1");
      console.log("Dropped old index userId_1_productId_1");
    }
  } catch (err) {
    // Ignore if index doesn’t exist
    if (err.codeName !== "IndexNotFound") {
      console.error("Error checking/dropping index:", err);
    }
  }
  next();
});

module.exports = mongoose.model("Review", reviewSchema);
