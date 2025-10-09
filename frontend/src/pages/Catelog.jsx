import React, { useEffect, useState } from "react";
import { fetchProducts } from "../utils/api";
import { Link } from "react-router-dom";
import ProductCard from "../components/Product";

const Catelog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Fetch product data from API
    const fetchProduct = async () => {
      try {
        const data = await fetchProducts();
        console.log(data.products);
        // const newD = await response.json();
        setProducts(data.products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchProduct();
  }, []);

  if (loading) {
    return <div className="text-center py-10 text-lg">Loading products...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Product Catalog</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            No products found.
          </div>
        ) : (
          products.map((productD) => <ProductCard product={productD} />)
        )}
      </div>
    </div>
  );
};

export default Catelog;
