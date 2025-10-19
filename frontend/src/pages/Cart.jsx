// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// const Cart = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Load cart items from localStorage
//     const loadCart = () => {
//       const savedCart = localStorage.getItem("cart");
//       if (savedCart) {
//         setCartItems(JSON.parse(savedCart));
//       }
//       setLoading(false);
//     };
//     loadCart();
//   }, []);

//   // Update localStorage whenever cartItems change
//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cartItems));
//   }, [cartItems]);

//   const handleQuantityChange = (id, quantity) => {
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
//       )
//     );
//   };

//   const handleRemove = (id) => {
//     setCartItems((prev) => prev.filter((item) => item.id !== id));
//   };

//   const getTotal = () =>
//     cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   if (loading)
//     return (
//       <div className="text-center py-10 text-gray-500">Loading cart...</div>
//     );

//   return (
//     <div className="max-w-3xl mx-auto my-10 p-6 bg-white rounded-lg shadow">
//       <h1 className="text-2xl font-bold mb-6">Your Shopping Cart</h1>
//       {cartItems.length === 0 ? (
//         <div className="text-center py-10 text-gray-500">
//           <p>Your cart is empty.</p>
//           <Link to="/" className="text-blue-600 hover:underline mt-4 block">
//             Continue Shopping
//           </Link>
//         </div>
//       ) : (
//         <div>
//           {cartItems.map((item) => (
//             <div
//               className="flex items-center border-b border-gray-200 py-4"
//               key={item.id}
//             >
//               <Link to={`/product/${item.id}`}>
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-20 h-20 object-cover rounded-lg mr-6"
//                 />
//               </Link>
//               <div className="flex-1">
//                 <Link to={`/product/${item.id}`}>
//                   <h2 className="text-lg font-semibold hover:text-blue-600">
//                     {item.name}
//                   </h2>
//                 </Link>
//                 <p className="text-gray-700">${item.price.toFixed(2)}</p>
//                 {item.selectedSize && (
//                   <p className="text-gray-600">Size: {item.selectedSize}"</p>
//                 )}
//                 <div className="flex items-center mt-2">
//                   <label className="mr-2 text-gray-600">Qty:</label>
//                   <input
//                     type="number"
//                     min="1"
//                     value={item.quantity}
//                     onChange={(e) =>
//                       handleQuantityChange(
//                         item.id,
//                         parseInt(e.target.value, 10)
//                       )
//                     }
//                     className="w-16 px-2 py-1 border border-gray-300 rounded"
//                   />
//                 </div>
//                 <button
//                   className="mt-3 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
//                   onClick={() => handleRemove(item.id)}
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ))}
//           <div className="text-right mt-8">
//             <h3 className="text-xl font-bold mb-2">
//               Subtotal: ${getTotal().toFixed(2)}
//             </h3>
//             <button className="bg-blue-600 text-white px-8 py-3 rounded font-semibold hover:bg-blue-700 transition">
//               Proceed to Checkout
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCart = () => {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
      setLoading(false);
    };
    loadCart();
  }, []);

  // useEffect(() => {
  //   localStorage.setItem("cart", JSON.stringify(cartItems));
  // }, [cartItems]);

  const handleQuantityChange = (id, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === id
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    localStorage.removeItem("cart");
    setCartItems((prev) => prev.filter((item) => item.productId !== id));
  };

  const getTotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (loading)
    return (
      <div className="text-center py-10 text-gray-500">Loading cart...</div>
    );

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <p>Your cart is empty.</p>
          <Link to="/" className="text-blue-600 hover:underline mt-4 block">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div
              className="flex flex-col md:flex-row items-start md:items-center border-b border-gray-200 py-4"
              key={item.productId}
            >
              <Link to={`/product/${item.productId}`}>
                <img
                  src={`https://threedcrafts-1.onrender.com/products/images/${item.image.replace(
                    "/uploads/",
                    ""
                  )}`}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg mb-4 md:mb-0 md:mr-6"
                />
              </Link>
              <div className="flex-1">
                <Link to={`/product/${item.productId}`}>
                  <h2 className="text-lg font-semibold hover:text-blue-600">
                    {item.name}
                  </h2>
                </Link>
                <p className="text-gray-700">₹{item.price.toFixed(2)}</p>
                <p className="text-gray-600">Size: {item.size}"</p>
                <p className="text-gray-600">Payment: {item.paymentType}</p>
                {item.customerPhoto && (
                  <div className="mt-2">
                    <p className="text-gray-600">Customer Photo:</p>
                    <img
                      src={item.customerPhoto}
                      alt="Customer"
                      className="w-20 h-20 object-cover rounded mt-1"
                    />
                  </div>
                )}
                <div className="flex items-center mt-2">
                  <label className="mr-2 text-gray-600">Qty:</label>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(
                        item.productId,
                        parseInt(e.target.value, 10)
                      )
                    }
                    className="w-16 px-2 py-1 border border-gray-300 rounded"
                  />
                </div>
                <button
                  className="mt-3 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                  onClick={() => handleRemove(item.productId)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="text-right mt-8">
            <h3 className="text-xl font-bold mb-2">
              Subtotal: ₹{getTotal().toFixed(2)}
            </h3>
            <Link to="/checkout">
              <button className="bg-blue-600 text-white px-8 py-3 rounded font-semibold hover:bg-blue-700 transition">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
