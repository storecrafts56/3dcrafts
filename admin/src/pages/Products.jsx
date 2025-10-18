import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addProductReview,
  fetchProductById,
  fetchProductReviews,
} from "../utils/api";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [viewImage, setViewImage] = useState();
  const [allReviews, setAllReviews] = useState([]);
  // New states for features
  const [paymentType, setPaymentType] = useState("full");
  const [selectedSize, setSelectedSize] = useState("5");
  const [photo, setPhoto] = useState(null);
  // Add new state for review form
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 0,
    comment: "",
  });
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const handleApplyCoupon = () => {
    if (coupon.trim().toLowerCase() === "3dcrafts10") {
      calculatePrice();
      setAppliedCoupon("3dcrafts10 - 10% OFF");
    }
  };

  const calculatePrice = () => {
    let newPrice = product.price;

    newPrice = newPrice - newPrice * 0.1; // 10% off

    console.log(newPrice);
    setProduct({
      ...product,
      price: newPrice,
    });
  };

  // Add handler for form submission
  const handleAddReview = async (e) => {
    e.preventDefault();

    if (!newReview.name || !newReview.comment || newReview.rating === 0) {
      alert("Please fill all fields");
      return;
    }

    // In a real app, this would be an API call
    // setProduct({
    //   ...product,
    //   reviews: [
    //     {
    //       user: newReview.name,
    //       rating: newReview.rating,
    //       comment: newReview.comment,
    //     },
    //     ...(product.reviews || []),
    //   ],
    // });

    const response = await addProductReview(id, {
      userName: newReview.name,
      rating: newReview.rating,
      comment: newReview.comment,
      productId: id,
    });
    alert("Review added successfully!");
    window.location.reload();
    setAllReviews({ ...allReviews, reviews: response.reviews });
    setNewReview({ name: "", rating: 0, comment: "" });
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data.product);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    const getReviews = async () => {
      try {
        const data = await fetchProductReviews(id);
        setAllReviews(data.reviews);

        // Compute professional-style rating summary
        const reviews = data.reviews || [];
        const totalReviews = reviews.length;

        // Initialize counts for 1-5 stars
        const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        let sumRatings = 0;
        reviews.forEach((r) => {
          const rating = Math.max(1, Math.min(5, Number(r.rating) || 0));
          ratingCounts[rating] = (ratingCounts[rating] || 0) + 1;
          sumRatings += rating;
        });

        // Average rating (one decimal) and percentage distribution
        const averageRating = totalReviews
          ? parseFloat((sumRatings / totalReviews).toFixed(1))
          : 0;
        const ratingPercentages = {};
        for (let i = 5; i >= 1; i--) {
          ratingPercentages[i] = totalReviews
            ? Math.round((ratingCounts[i] / totalReviews) * 100)
            : 0;
        }

        // Build distribution array (5 -> 1) for charts/UI
        const ratingDistribution = [5, 4, 3, 2, 1].map((star) => ({
          star,
          count: ratingCounts[star] || 0,
          percentage: ratingPercentages[star] || 0,
        }));

        // Attach summary to product state (safe when product might be null)
        setProduct((prev) => {
          const base = prev || {};
          return {
            ...base,
            // keep existing product fields, but ensure rating/reviews reflect fetched data
            rating: averageRating,
            reviews: reviews,
            reviewSummary: {
              totalReviews,
              averageRating,
              ratingCounts,
              ratingPercentages,
              ratingDistribution,
            },
          };
        });
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    getReviews();
    getProduct();
  }, [id]);

  if (!product) return <div className="text-center py-16">Loading...</div>;

  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if product already exists in cart
    const existingItemIndex = existingCart.findIndex(
      (item) => item.productId === product._id && item.size === selectedSize
    );

    if (existingItemIndex >= 0) {
      // Update quantity if product already in cart
      // existingCart[existingItemIndex].quantity += quantity;
      alert(
        "Product with selected size already in cart. Adjust quantity in cart."
      );
    } else {
      // Add new product to cart
      console.log(product, "product");
      existingCart.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        size: selectedSize,
        quantity: quantity,
        paymentType: paymentType,
        customerPhoto: photo ? URL.createObjectURL(photo) : null,
      });
    }

    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(existingCart));
    alert("Product added to cart!");
    navigate("/cart");
  };
  // Generate size options from 5" to 28"
  const sizeOptions = ["5", "8", "12", "16", "20", "24", "28"];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Images */}
        <div>
          {product.images && product.images.length > 0 && (
            <>
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-[350px] h-[350px] object-cover rounded-lg shadow"
              />
              <div className="flex gap-2 mt-3">
                {product.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className={`w-14 h-14 object-cover rounded cursor-pointer border ${
                      selectedImage === idx
                        ? "border-blue-600"
                        : "border-gray-300"
                    }`}
                    onClick={() => setSelectedImage(idx)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        {/* Details */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <div className="text-blue-600 text-xl font-semibold mb-2">
            ₹{product.price?.toFixed(2)}
          </div>
          <div className="mb-3 flex items-center">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, idx) => {
                const filledCount = Math.floor(product.rating || 0);
                const filled = idx < filledCount;
                return (
                  <span
                    key={idx}
                    className={`text-2xl transition-colors ${
                      filled ? "text-yellow-500" : "text-gray-300"
                    }`}
                    aria-hidden="true"
                    title={`${idx + 1} star${idx === 0 ? "" : "s"}`}
                  >
                    ★
                  </span>
                );
              })}
            </div>
            <span className="text-gray-500 ml-2">
              {product.rating || 0} / 5 ({product.reviews?.length || 0} reviews)
            </span>
          </div>
          <p className="mb-4 text-gray-700">{product.description}</p>
          {product.specifications && (
            <div className="mb-4">
              <strong>Specifications:</strong>
              <ul className="list-disc ml-5">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <li key={key} className="text-gray-600">
                    {key}: {value}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mb-4">
            {product.stock > 0 ? (
              <span className="text-green-600 font-medium">
                In Stock ({product.stock} available)
              </span>
            ) : (
              <span className="text-red-600 font-medium">Out of Stock</span>
            )}
          </div>
          <div className="flex items-center gap-3 mb-4">
            <label htmlFor="quantity" className="font-medium">
              Quantity:
            </label>
            <input
              id="quantity"
              type="number"
              min={1}
              max={product.stock}
              value={quantity}
              onChange={(e) =>
                setQuantity(
                  Math.max(1, Math.min(product.stock, Number(e.target.value)))
                )
              }
              className="w-16 px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-400"
              disabled={product.stock === 0}
            />
          </div>
          {/*Enter Coupon code  */}
          {/* Coupon Code Field */}
          {!appliedCoupon ? (
            <div className="mb-4">
              <label className="block font-medium mb-1">
                Enter Coupon Code
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Enter coupon"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 transition"
                >
                  Apply
                </button>
              </div>
            </div>
          ) : (
            <div className="mb-4 text-green-600 font-medium">
              Coupon Applied: {appliedCoupon}
            </div>
          )}

          {/* Payment Type */}

          {/* Size Selection */}
          <div className="mb-4">
            <span className="font-medium mr-2">Size:</span>
            <div className="flex flex-wrap gap-2">
              {product.sizes?.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => {
                    const sizesArr = product.sizes || [];
                    const baseSize = "5";
                    const origPrice = product.originalPrice ?? product.price;
                    const baseIndex =
                      sizesArr.indexOf(baseSize) === -1
                        ? 0
                        : sizesArr.indexOf(baseSize);
                    const idx =
                      sizesArr.indexOf(size) === -1
                        ? baseIndex
                        : sizesArr.indexOf(size);
                    const steps = Math.max(0, idx - baseIndex);

                    // 30% increase per size step (compounded). Use Math.pow(1.3, steps).
                    const newPrice = parseFloat(
                      (origPrice * Math.pow(1.3, steps)).toFixed(2)
                    );

                    setProduct({
                      ...product,
                      price: newPrice,
                      originalPrice: origPrice,
                    });
                    setSelectedSize(size);
                    setSelectedSize(size);
                  }}
                  className={`px-3 py-1 rounded border font-medium ${
                    selectedSize === size
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-800 border-gray-300 hover:bg-blue-50"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="photo" className="font-medium mr-2">
              Upload Photo (for miniature statue):
            </label>
            <input
              id="photo"
              type="file"
              accept="image/*"
              onChange={(e) => {
                setViewImage(URL.createObjectURL(e.target.files[0]));
                setPhoto(e.target.files[0]);
              }}
              className="border rounded px-2 py-1"
            />
            {photo && (
              <div className="mt-2 text-sm text-gray-600">
                Selected:
                <img
                  src={viewImage}
                  alt="customer_image"
                  width={100}
                  height={100}
                />
              </div>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`bg-blue-600 text-white px-8 py-3 rounded-lg text-base font-semibold shadow transition ${
              product.stock === 0
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-700"
            }`}
          >
            Add to Cart
          </button>
        </div>
      </div>
      {/* Reviews */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
        {!allReviews || allReviews.length === 0 ? (
          <div className="text-gray-500">No reviews yet.</div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {allReviews.map((review, idx) => (
              <li key={idx} className="py-4">
                <strong className="text-gray-800">{review.userName}</strong> -{" "}
                <span className="text-yellow-500">
                  {"★".repeat(review.rating)}
                </span>
                <div className="text-gray-700 mt-1">{review.comment}</div>
                <br />
                <hr />
                <br />
              </li>
            ))}
          </ul>
        )}
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-bold mb-4">Add a Review</h3>
          <form onSubmit={handleAddReview} className="space-y-4">
            <div>
              <label
                htmlFor="reviewName"
                className="block text-sm font-medium text-gray-700"
              >
                Your Name
              </label>
              <input
                type="text"
                id="reviewName"
                value={newReview.name}
                onChange={(e) =>
                  setNewReview({ ...newReview, name: e.target.value })
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Rating
              </label>
              <div className="flex gap-1 mt-2">
                {[5, 4, 3, 2, 1].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                    className={`text-2xl ${
                      newReview.rating >= star
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="reviewComment"
                className="block text-sm font-medium text-gray-700"
              >
                Your Review
              </label>
              <textarea
                id="reviewComment"
                rows={4}
                value={newReview.comment}
                onChange={(e) =>
                  setNewReview({ ...newReview, comment: e.target.value })
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
