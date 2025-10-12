import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/Product";
import { fetchProducts } from "../utils/api";

// Example product data (replace with API or props)
const products = [
  {
    id: 1,
    name: "Luxury Gift Box",
    price: 49.99,
    image: "/images/giftbox1.jpg",
    description: "Elegant gift box for special occasions.",
  },
  {
    id: 2,
    name: "Personalized Mug",
    price: 19.99,
    image: "/images/mug.jpg",
    description: "Customizable mug for your loved ones.",
  },
  {
    id: 3,
    name: "Flower Bouquet",
    price: 29.99,
    image: "/images/flowers.jpg",
    description: "Fresh flowers delivered to your door.",
  },
];

export default function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    // Fetch product data from API
    const fetchProduct = async () => {
      try {
        const data = await fetchProducts();
        console.log(data.products);
        // const newD = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchProduct();
  }, []);
  return (
    <div>
      {/* Hero Section */}
      <section
        className="bg-cover md:h-[60vh] h-[65vh] w-[100%] bg-center py-20 text-blue-900 text-center"
        style={{
          backgroundImage: "url('https://res.cloudinary.com/dmomhs5ex/image/upload/v1760241813/wallpaper_uamg3y.jpg')",
        }}
      >
        <h1 className="md:text-5xl text-3xl font-bold">Welcome to 3dCrafts</h1>
        <p className="md:text-2xl text-xl  mt-5 mb-8">
          Find the perfect gift for every occasion
        </p>
        <Link
          to="/catalog"
          className="bg-blue-700 text-white px-10 py-4 rounded-full md:text-lg text-md font-bold shadow-md hover:bg-pink-600 transition"
        >
          Shop Now
        </Link>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-3xl font-semibold mb-10">
            Featured Gifts
          </h2>
          <div className="flex flex-wrap gap-8 justify-center">
            {products.map((productD) => (
              // <div
              //   key={product.id}
              //   className="bg-white rounded-xl shadow-lg w-72 p-6 text-center hover:scale-105 transition"
              // >
              //   <img
              //     src={product.image}
              //     alt={product.name}
              //     className="w-full h-44 object-cover rounded-md"
              //   />
              //   <h3 className="mt-5 mb-2 text-xl font-medium">
              //     {product.name}
              //   </h3>
              //   <p className="text-gray-500 mb-3">{product.description}</p>
              //   <div className="font-bold text-lg mb-2">
              //     ${product.price.toFixed(2)}
              //   </div>
              //   <Link
              //     to={`/product/${product.id}`}
              //     className="inline-block mt-4 bg-blue-700 text-white px-6 py-2 rounded-full font-bold hover:bg-pink-600 transition"
              //   >
              //     View Details
              //   </Link>
              // </div>
              <ProductCard product={productD} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-semibold">Why Choose 3dCrafts?</h2>
          <p className="text-lg mt-6 mb-0">
            We curate the best gifts for every occasion, ensuring quality, fast
            delivery, and a seamless shopping experience. Discover unique,
            personalized, and memorable gifts for your loved ones.
          </p>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-10 bg-blue-700 text-white">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-semibold">Stay Updated!</h2>
          <p className="mt-2">
            Sign up for our newsletter to get exclusive offers and updates.
          </p>
          <form className="mt-6 flex justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="py-3 px-4 rounded-l-full border-none w-2/3 text-black text-base focus:outline-none"
            />
            <button
              type="submit"
              className="py-3 px-6 rounded-r-full bg-white text-pink-500 font-bold text-base hover:bg-gray-100 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
