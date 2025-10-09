const Review = require("../models/Review");
const Product = require("../models/Product");
const { reviewSchema } = require("../utils/validators");

const createReview = async (req, res) => {
  try {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { productId, userName, rating, comment } = req.body;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Check if user already reviewed this product
    // const existingReview = await Review.findOne({
    //   productId,
    //   userName: userName,
    // });

    // if (existingReview) {
    //   return res
    //     .status(400)
    //     .json({ error: "You have already reviewed this product" });
    // }

    const review = new Review({
      productId,
      userName: userName,
      rating,
      comment,
    });

    await review.save();

    res.status(201).json({
      message:
        "Review submitted successfully. It will be visible after approval.",
      review,
    });
  } catch (error) {
    console.error("Create review error:", error);
    res.status(500).json({ error: "Server error creating review" });
  }
};

// const getProductReviews = async (req, res) => {
//   try {
//     const { page = 1, limit = 10 } = req.query;
//     const mongoose = require('mongoose');

//     const reviews = await Review.find({
//       productId: req.params.productId,
//       approved: true
//     })
//       .sort({ createdAt: -1 })
//       .limit(limit * 1)
//       .skip((page - 1) * limit)
//       .populate('userId', 'name');

//     const totalReviews = await Review.countDocuments({
//       productId: req.params.productId,
//       approved: true
//     });

//     const totalPages = Math.ceil(totalReviews / limit);

//     // Calculate average rating
//     const ratingStats = await Review.aggregate([
//       {
//         $match: {
//           productId: require('mongoose').Types.ObjectId(req.params.productId),
//           approved: true
//         }
//       },
//       {
//         $group: {
//           _id: null,
//           averageRating: { $avg: '$rating' },
//           totalReviews: { $sum: 1 },
//           ratings: {
//             $push: '$rating'
//           }
//         }
//       }
//     ]);

//     const stats = ratingStats[0] || {
//       averageRating: 0,
//       totalReviews: 0,
//       ratings: []
//     };

//     // Update product rating
//     if (stats.totalReviews > 0) {
//       await Product.findByIdAndUpdate(req.params.productId, {
//         averageRating: Math.round(stats.averageRating * 10) / 10,
//         reviewCount: stats.totalReviews
//       });
//     }

//     res.json({
//       reviews,
//       currentPage: parseInt(page),
//       totalPages,
//       totalReviews,
//       averageRating: stats.averageRating,
//       ratingDistribution: {
//         5: stats.ratings.filter(r => r === 5).length,
//         4: stats.ratings.filter(r => r === 4).length,
//         3: stats.ratings.filter(r => r === 3).length,
//         2: stats.ratings.filter(r => r === 2).length,
//         1: stats.ratings.filter(r => r === 1).length
//       }
//     });
//   } catch (error) {
//     console.error('Get product reviews error:', error);
//     res.status(500).json({ error: 'Server error fetching reviews' });
//   }
// };

const getProductReviews = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const mongoose = require("mongoose");

    const reviews = await Review.find({
      productId: req.params.productId,
      approved: true,
    })
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const totalReviews = await Review.countDocuments({
      productId: req.params.productId,
      approved: true,
    });

    const totalPages = Math.ceil(totalReviews / limit);

    // Calculate average rating
    const ratingStats = await Review.aggregate([
      {
        $match: {
          productId: new mongoose.Types.ObjectId(req.params.productId),
          approved: true,
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 },
          ratings: {
            $push: "$rating",
          },
        },
      },
    ]);

    const stats = ratingStats[0] || {
      averageRating: 0,
      totalReviews: 0,
      ratings: [],
    };

    // Update product rating
    if (stats.totalReviews > 0) {
      await Product.findByIdAndUpdate(req.params.productId, {
        averageRating: Math.round(stats.averageRating * 10) / 10,
        reviewCount: stats.totalReviews,
      });
    }

    res.json({
      reviews,
      currentPage: parseInt(page),
      totalPages,
      totalReviews,
      averageRating: stats.averageRating,
      ratingDistribution: {
        5: stats.ratings.filter((r) => r === 5).length,
        4: stats.ratings.filter((r) => r === 4).length,
        3: stats.ratings.filter((r) => r === 3).length,
        2: stats.ratings.filter((r) => r === 2).length,
        1: stats.ratings.filter((r) => r === 1).length,
      },
    });
  } catch (error) {
    console.error("Get product reviews error:", error);
    res.status(500).json({ error: "Server error fetching reviews" });
  }
};

const getAllReviews = async (req, res) => {
  try {
    const { page = 1, limit = 20, approved = "all" } = req.query;

    const query = {};
    if (approved !== "all") {
      query.approved = approved === "true";
    }

    const reviews = await Review.find(query)
      .populate("productId", "name images")
      .populate("userId", "name email")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const totalReviews = await Review.countDocuments(query);
    const totalPages = Math.ceil(totalReviews / limit);

    const pendingCount = await Review.countDocuments({ approved: false });

    res.json({
      reviews,
      currentPage: parseInt(page),
      totalPages,
      totalReviews,
      pendingCount,
    });
  } catch (error) {
    console.error("Get all reviews error:", error);
    res.status(500).json({ error: "Server error fetching reviews" });
  }
};

const approveReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    ).populate("productId", "name");

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.json({
      message: "Review approved successfully",
      review,
    });
  } catch (error) {
    console.error("Approve review error:", error);
    res.status(500).json({ error: "Server error approving review" });
  }
};

const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    await Review.findByIdAndDelete(req.params.id);

    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Delete review error:", error);
    res.status(500).json({ error: "Server error deleting review" });
  }
};

module.exports = {
  createReview,
  getProductReviews,
  getAllReviews,
  approveReview,
  deleteReview,
};
