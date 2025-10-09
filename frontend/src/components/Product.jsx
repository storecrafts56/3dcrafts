import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer bg-white"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative w-full h-64">
        <img
          src={`${
            hovered &&
            `http://localhost:5000/products/images/${product.images[1]?.replace(
              "/uploads/",
              ""
            )}`
              ? `http://localhost:5000/products/images/${product.images[1]?.replace(
                  "/uploads/",
                  ""
                )}`
              : `http://localhost:5000/products/images/${product.images[0]?.replace(
                  "/uploads/",
                  ""
                )}`
          }`}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {product.stock === 0 && (
          <span className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-xs font-semibold rounded">
            Out of Stock
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {product.name}
        </h3>

        <p className="text-sm text-gray-500 mt-1 truncate">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-3">
          <span className="text-blue-600 font-bold text-lg">
            ${product.price.toFixed(2)}
          </span>
          <div className="flex items-center text-yellow-500 text-sm">
            {"★".repeat(Math.floor(product.rating))}
            <span className="text-gray-500 ml-1 text-xs">
              ({product.reviews?.length})
            </span>
          </div>
        </div>
        <Link
          to={`/product/${product._id}`}
          className="inline-block mt-4 bg-blue-700 text-white px-6 py-2 rounded-full font-bold hover:bg-pink-600 transition"
        >
          View Details
        </Link>
        {/* <button
          disabled={product.stock === 0}
          className={`w-full mt-4 py-2 rounded-lg font-medium text-white transition ${
            product.stock === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {product.stock === 0 ? "Out of Stock" : "View Details"}
        </button> */}
      </div>
    </div>
  );
};

export default ProductCard;
