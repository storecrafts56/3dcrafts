import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow flex items-center justify-between px-6 py-4">
      <div className="text-2xl font-bold text-blue-600">
        <Link to="/">3dCrafts</Link>
      </div>
      <nav>
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/catalog"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Catalog
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Cart
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
