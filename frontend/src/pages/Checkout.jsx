// // import React, { useState } from "react";

// // const Checkout = () => {
// //   const [form, setForm] = useState({
// //     name: "",
// //     email: "",
// //     address: "",
// //     city: "",
// //     state: "",
// //     zip: "",
// //   });
// //   const [submitted, setSubmitted] = useState(false);

// //   const handleChange = (e) => {
// //     setForm({ ...form, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     setSubmitted(true);
// //   };

// //   if (submitted) {
// //     return (
// //       <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-lg shadow-md mt-8">
// //         <h2 className="text-2xl font-semibold mb-2">
// //           Thank you for your purchase!
// //         </h2>
// //         <p className="text-gray-700">
// //           Your order has been received and is being processed.
// //         </p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="max-w-lg mx-auto mt-8 p-8 bg-white rounded-lg shadow-md">
// //       <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>
// //       <form className="space-y-6" onSubmit={handleSubmit}>
// //         <div>
// //           <h2 className="text-xl font-semibold mb-4">Billing Information</h2>
// //           <div className="space-y-4">
// //             <label className="block">
// //               <span className="text-gray-700">Name</span>
// //               <input
// //                 type="text"
// //                 name="name"
// //                 value={form.name}
// //                 onChange={handleChange}
// //                 required
// //                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
// //               />
// //             </label>
// //             <label className="block">
// //               <span className="text-gray-700">Email</span>
// //               <input
// //                 type="email"
// //                 name="email"
// //                 value={form.email}
// //                 onChange={handleChange}
// //                 required
// //                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
// //               />
// //             </label>
// //             <label className="block">
// //               <span className="text-gray-700">Address</span>
// //               <input
// //                 type="text"
// //                 name="address"
// //                 value={form.address}
// //                 onChange={handleChange}
// //                 required
// //                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
// //               />
// //             </label>
// //             <label className="block">
// //               <span className="text-gray-700">City</span>
// //               <input
// //                 type="text"
// //                 name="city"
// //                 value={form.city}
// //                 onChange={handleChange}
// //                 required
// //                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
// //               />
// //             </label>
// //             <label className="block">
// //               <span className="text-gray-700">State</span>
// //               <input
// //                 type="text"
// //                 name="state"
// //                 value={form.state}
// //                 onChange={handleChange}
// //                 required
// //                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
// //               />
// //             </label>
// //             <label className="block">
// //               <span className="text-gray-700">ZIP Code</span>
// //               <input
// //                 type="text"
// //                 name="zip"
// //                 value={form.zip}
// //                 onChange={handleChange}
// //                 required
// //                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
// //               />
// //             </label>
// //           </div>
// //         </div>

// //         <button
// //           type="submit"
// //           className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition"
// //         >
// //           Next
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default Checkout;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Payment from "../components/Payment";

// const Checkout = () => {
//   const navigate = useNavigate();
//   const [step, setStep] = useState(1);
//   const [cartItems, setCartItems] = useState([]);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [orderId, setOrderId] = useState("");
//   const [transactionId, setTransactionId] = useState("");
//   const [isScanning, setIsScanning] = useState(false);
//   const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     address: "",
//     city: "",
//     state: "",
//     zip: "",
//     phone: "",
//   });

//   // Load cart items when component mounts
//   useEffect(() => {
//     const savedCart = localStorage.getItem("cart");
//     if (savedCart) {
//       const items = JSON.parse(savedCart);
//       setCartItems(items);

//       // Calculate total price
//       const total = items.reduce(
//         (sum, item) => sum + item.price * item.quantity,
//         0
//       );
//       setTotalAmount(total);

//       // Generate random order ID
//       setOrderId("ORD-" + Math.floor(100000 + Math.random() * 900000));
//     } else {
//       // If cart is empty, redirect to cart page
//       navigate("/cart");
//     }
//   }, [navigate]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmitUserInfo = (e) => {
//     e.preventDefault();
//     setStep(2);
//   };

//   // const handleScanCode = () => {
//   //   setIsScanning(true);

//   //   // Simulate scanning process
//   //   setTimeout(() => {

//   //   }, 3000);
//   // };

//   const handleConfirmPayment = () => {
//     setIsPaymentConfirmed(true);
//     setStep(3);

//     // Clear cart from localStorage after successful purchase
//     localStorage.removeItem("cart");
//   };

//   const handleBack = () => {
//     setStep(1);
//   };

//   return (
//     <div className="max-w-3xl mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
//       {/* Progress Tracker */}
//       <div className="flex mb-8 justify-center">
//         <div className="w-full max-w-xs">
//           <div className="relative">
//             <div className="flex mb-2 items-center justify-between">
//               <div
//                 className={`${
//                   step >= 1 ? "text-blue-600 font-bold" : "text-gray-500"
//                 }`}
//               >
//                 Information
//               </div>
//               <div
//                 className={`${
//                   step >= 2 ? "text-blue-600 font-bold" : "text-gray-500"
//                 }`}
//               >
//                 Payment
//               </div>
//               <div
//                 className={`${
//                   step >= 3 ? "text-blue-600 font-bold" : "text-gray-500"
//                 }`}
//               >
//                 Confirmation
//               </div>
//             </div>
//             <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
//               <div
//                 style={{ width: `${((step - 1) / 2) * 100}%` }}
//                 className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600 transition-all duration-500"
//               ></div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Step 1: User Information */}
//       {step === 1 && (
//         <>
//           <h1 className="text-2xl font-bold mb-6">Shipping Information</h1>
//           <form className="space-y-4" onSubmit={handleSubmitUserInfo}>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <label className="block">
//                 <span className="text-gray-700">Full Name*</span>
//                 <input
//                   type="text"
//                   name="name"
//                   value={form.name}
//                   onChange={handleChange}
//                   required
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
//                 />
//               </label>

//               <label className="block">
//                 <span className="text-gray-700">Email*</span>
//                 <input
//                   type="email"
//                   name="email"
//                   value={form.email}
//                   onChange={handleChange}
//                   required
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
//                 />
//               </label>

//               <label className="block">
//                 <span className="text-gray-700">Phone*</span>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={form.phone}
//                   onChange={handleChange}
//                   required
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
//                 />
//               </label>

//               <label className="block md:col-span-2">
//                 <span className="text-gray-700">Address*</span>
//                 <input
//                   type="text"
//                   name="address"
//                   value={form.address}
//                   onChange={handleChange}
//                   required
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
//                 />
//               </label>

//               <label className="block">
//                 <span className="text-gray-700">City*</span>
//                 <input
//                   type="text"
//                   name="city"
//                   value={form.city}
//                   onChange={handleChange}
//                   required
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
//                 />
//               </label>

//               <label className="block">
//                 <span className="text-gray-700">State/Province*</span>
//                 <input
//                   type="text"
//                   name="state"
//                   value={form.state}
//                   onChange={handleChange}
//                   required
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
//                 />
//               </label>

//               <label className="block">
//                 <span className="text-gray-700">ZIP/Postal Code*</span>
//                 <input
//                   type="text"
//                   name="zip"
//                   value={form.zip}
//                   onChange={handleChange}
//                   required
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
//                 />
//               </label>
//             </div>

//             <button
//               type="submit"
//               className="w-full mt-6 bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition"
//             >
//               Continue to Payment
//             </button>
//           </form>
//         </>
//       )}

//       {/* Step 2: Payment */}
//       {step === 2 && (
//         <div>
//           <h1 className="text-2xl font-bold mb-6">Payment Details</h1>

//           {/* Order Summary */}
//           <div className="mb-6 p-4 bg-gray-50 rounded-md">
//             <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
//             <div className="mb-4">
//               <p className="text-sm text-gray-600 mb-1">Order ID: {orderId}</p>
//             </div>

//             {cartItems.map((item, index) => (
//               <div
//                 key={index}
//                 className="flex items-start mb-4 pb-4 border-b border-gray-200 last:border-b-0"
//               >
//                 <img
//                   src={`http://localhost:5000/products/images/${item.image.replace(
//                     "/uploads/",
//                     ""
//                   )} `}
//                   alt={item.name}
//                   className="w-16 h-16 object-cover rounded mr-4"
//                 />
//                 <div className="flex-1">
//                   <h3 className="font-medium">{item.name}</h3>
//                   <p className="text-gray-600 text-sm">
//                     Size: {item.size}"
//                     {item.paymentType === "half" && " (Half Payment)"}
//                   </p>
//                   <div className="flex justify-between mt-1">
//                     <p>Quantity: {item.quantity}</p>
//                     <p className="font-medium">
//                       ${(item.price * item.quantity).toFixed(2)}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}

//             <div className="flex justify-between font-semibold pt-2 border-t border-gray-200">
//               <span>Total:</span>
//               <span>${totalAmount.toFixed(2)}</span>
//             </div>
//           </div>

//           {/* Payment Scanner */}
//           <div className="mb-6 p-4 bg-gray-50 rounded-md">
//             <h2 className="text-lg font-semibold mb-4">Scan Payment Code</h2>
//             <p className="text-sm text-gray-600 mb-4">
//               Please scan the QR code to complete your payment of $
//               {totalAmount.toFixed(2)}
//             </p>

//             <div className="flex flex-col items-center justify-center">
//               {/* QR Code Image - in a real app, this would be generated */}
//               <div className="w-48 h-48 bg-white p-3 border rounded-md mb-4">
//                 <img
//                   src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Order"
//                   alt="QR Code"
//                   className="w-full h-full"
//                 />
//               </div>
//               <div className="w-full mt-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Transaction ID*
//                 </label>
//                 <input
//                   type="text"
//                   value={transactionId}
//                   onChange={(e) => setTransactionId(e.target.value)}
//                   placeholder="Enter transaction ID after payment"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
//                   required
//                 />
//                 {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
//               </div>

//               {/* {!transactionId ? (
//                 <button
//                   onClick={handleScanCode}
//                   disabled={isScanning}
//                   className={`px-4 py-2 bg-blue-600 text-white rounded-md ${
//                     isScanning ? "opacity-70" : "hover:bg-blue-700"
//                   }`}
//                 >
//                   {isScanning ? (
//                     <div className="flex items-center">
//                       <svg
//                         className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                       >
//                         <circle
//                           className="opacity-25"
//                           cx="12"
//                           cy="12"
//                           r="10"
//                           stroke="currentColor"
//                           strokeWidth="4"
//                         ></circle>
//                         <path
//                           className="opacity-75"
//                           fill="currentColor"
//                           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                         ></path>
//                       </svg>
//                       Scanning...
//                     </div>
//                   ) : (
//                     "Scan Code"
//                   )}
//                 </button>
//               ) : (
//                 <div className="text-center">
//                   <p className="text-green-600 font-medium mb-2">
//                     Payment code scanned successfully!
//                   </p>
//                   <p className="text-gray-800 mb-4">
//                     Transaction ID:{" "}
//                     <span className="font-medium">{transactionId}</span>
//                   </p>
//                 </div>
//               )} */}
//             </div>
//           </div>

//           <div className="flex justify-between">
//             <button
//               onClick={handleBack}
//               className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
//             >
//               Back
//             </button>
//             <button
//               onClick={handleConfirmPayment}
//               disabled={!transactionId}
//               className={`px-6 py-2 bg-blue-600 text-white rounded-md ${
//                 !transactionId
//                   ? "opacity-50 cursor-not-allowed"
//                   : "hover:bg-blue-700"
//               }`}
//             >
//               Confirm Payment
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Step 3: Confirmation */}
//       {step === 3 && (
//         <div className="flex flex-col items-center justify-center py-8">
//           <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-8 w-8 text-green-600"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M5 13l4 4L19 7"
//               />
//             </svg>
//           </div>
//           <h2 className="text-2xl font-bold mb-2 text-center">
//             Thank you for your purchase!
//           </h2>
//           <p className="text-gray-600 text-center mb-6">
//             Your order has been received and is being processed.
//           </p>
//           <div className="bg-gray-50 p-4 rounded-md w-full max-w-md mb-6">
//             <p className="text-sm mb-1">
//               <span className="font-medium">Order ID:</span> {orderId}
//             </p>
//             <p className="text-sm mb-1">
//               <span className="font-medium">Transaction ID:</span>{" "}
//               {transactionId}
//             </p>
//             <p className="text-sm">
//               <span className="font-medium">Order Total:</span> $
//               {totalAmount.toFixed(2)}
//             </p>
//           </div>
//           <p className="text-sm text-gray-500 mb-6">
//             A confirmation email has been sent to {form.email}.
//           </p>
//           <button
//             onClick={() => navigate("/")}
//             className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//           >
//             Continue Shopping
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Checkout;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { createOrder } from "../utils/api";

const Checkout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);
  const [orderId, setOrderId] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [paymentType, setPaymentType] = useState("full");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "user@3dcrafts.com",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  // Load cart items when component mounts
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const items = JSON.parse(savedCart);
      setCartItems(items);

      // Calculate total price and determine payment type
      const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      setTotalAmount(total);
      setPaidAmount(total); // Default to full payment

      // Determine if any item has half payment
      const hasHalfPayment = items.some((item) => item.paymentType === "half");
      if (hasHalfPayment) {
        setPaymentType("half");
        // Calculate paid amount (50% of total)
        setPaidAmount(total / 2);
      }

      // Generate order ID placeholder (will be properly generated on server)
      setOrderId("ORD" + Date.now());
    } else {
      // If cart is empty, redirect to cart page
      navigate("/cart");
    }

    // Pre-fill user information if available
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      }));
    }
  }, [navigate, user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmitUserInfo = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleConfirmPayment = async () => {
    if (!transactionId) {
      setError("Transaction ID is required to complete your order");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Create order object based on schema
      console.log(cartItems);
      const orderData = {
        // userId: form?.email,
        products: cartItems.map((item) => ({
          productId: item.productId,
          name: item.name,
          size: item.size,
          quantity: item.quantity,
          price: item.price,
          customImage: item.customImage || "",
        })),
        // total: totalAmount,
        paymentType: paymentType,
        // paidAmount: paidAmount,
        transactionId: transactionId,
        // orderId: orderId,
        shippingAddress: {
          name: form.name,
          phone: form.phone,
          email: form.email,
          address: form.address,
          city: form.city,
          pincode: form.zip,
        },
        notes: notes,
      };

      // Make API call to create order
      // const response = await axios.post('/api/orders', orderDat(a);
      const response = await createOrder(orderData);
      // console.log("Order created:", response);
      // // Clear cart from localStorage after successful purchase
      localStorage.removeItem("cart");

      // Move to confirmation step
      setStep(3);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to process your order. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  return (
    <div className="max-w-3xl mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
      {/* Progress Tracker */}
      <div className="flex mb-8 justify-center">
        <div className="w-full max-w-xs">
          <div className="relative">
            <div className="flex mb-2 items-center justify-between">
              <div
                className={`${
                  step >= 1 ? "text-blue-600 font-bold" : "text-gray-500"
                }`}
              >
                Information
              </div>
              <div
                className={`${
                  step >= 2 ? "text-blue-600 font-bold" : "text-gray-500"
                }`}
              >
                Payment
              </div>
              <div
                className={`${
                  step >= 3 ? "text-blue-600 font-bold" : "text-gray-500"
                }`}
              >
                Confirmation
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
              <div
                style={{ width: `${((step - 1) / 2) * 100}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600 transition-all duration-500"
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Step 1: User Information */}
      {step === 1 && (
        <>
          <h1 className="text-2xl font-bold mb-6">Shipping Information</h1>
          <form className="space-y-4" onSubmit={handleSubmitUserInfo}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-gray-700">Full Name*</span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Phone*</span>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                />
              </label>

              <label className="block md:col-span-2">
                <span className="text-gray-700">Address*</span>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                />
              </label>

              <label className="block">
                <span className="text-gray-700">City*</span>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                />
              </label>

              <label className="block">
                <span className="text-gray-700">State/Province*</span>
                <input
                  type="text"
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                />
              </label>

              <label className="block">
                <span className="text-gray-700">ZIP/Postal Code*</span>
                <input
                  type="text"
                  name="zip"
                  value={form.zip}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                />
              </label>

              <label className="block md:col-span-2">
                <span className="text-gray-700">Order Notes (Optional)</span>
                <textarea
                  name="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  rows="3"
                  placeholder="Special instructions for delivery or any other notes"
                ></textarea>
              </label>
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition"
            >
              Continue to Payment
            </button>
          </form>
        </>
      )}

      {/* Step 2: Payment */}
      {step === 2 && (
        <div>
          <h1 className="text-2xl font-bold mb-6">Payment Details</h1>

          {/* Order Summary */}
          <div className="mb-6 p-4 bg-gray-50 rounded-md">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-1">Order ID: {orderId}</p>
              <p className="text-sm text-gray-600 mb-1">
                Payment Type:{" "}
                {paymentType === "half" ? "Half Payment (50%)" : "Full Payment"}
              </p>
            </div>

            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex items-start mb-4 pb-4 border-b border-gray-200 last:border-b-0"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded mr-4"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-gray-600 text-sm">
                    Size: {item.size}"
                    {item.paymentType === "half" && " (Half Payment)"}
                  </p>
                  <div className="flex justify-between mt-1">
                    <p>Quantity: {item.quantity}</p>
                    <p className="font-medium">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-between pt-2 border-t border-gray-200">
              <span className="font-medium">Total Amount:</span>
              <span className="font-medium">₹{totalAmount.toFixed(2)}</span>
            </div>

            {paymentType === "half" && (
              <div className="flex justify-between mt-1 text-blue-600">
                <span className="font-medium">Amount to Pay Now (50%):</span>
                <span className="font-medium">${paidAmount.toFixed(2)}</span>
              </div>
            )}
          </div>

          {/* Payment Scanner */}
          <div className="mb-6 p-4 bg-gray-50 rounded-md">
            <h2 className="text-lg font-semibold mb-4">Scan Payment Code</h2>
            <p className="text-sm text-gray-600 mb-4">
              Please scan the QR code to complete your payment of ₹
              {paidAmount.toFixed(2)}
            </p>

            <div className="flex flex-col items-center justify-center">
              {/* QR Code Image - in a real app, this would be generated */}
              <div className="w-48 h-48 bg-white p-3 border rounded-md mb-4">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Order"
                  alt="QR Code"
                  className="w-full h-full"
                />
              </div>
              <div className="w-full mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Transaction ID*
                </label>
                <input
                  type="text"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  placeholder="Enter transaction ID after payment"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  required
                />
                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={handleBack}
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Back
            </button>
            <button
              onClick={handleConfirmPayment}
              disabled={!transactionId || loading}
              className={`px-6 py-2 bg-blue-600 text-white rounded-md ${
                !transactionId || loading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-700"
              }`}
            >
              {loading ? "Processing..." : "Confirm Payment"}
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Confirmation */}
      {step === 3 && (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-center">
            Thank you for your purchase!
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Your order has been received and is being processed.
          </p>
          <div className="bg-gray-50 p-4 rounded-md w-full max-w-md mb-6">
            <p className="text-sm mb-1">
              <span className="font-medium">Order ID:</span> {orderId}
            </p>
            <p className="text-sm mb-1">
              <span className="font-medium">Transaction ID:</span>{" "}
              {transactionId}
            </p>
            <p className="text-sm mb-1">
              <span className="font-medium">Payment Type:</span>{" "}
              {paymentType === "half" ? "Half Payment (50%)" : "Full Payment"}
            </p>
            <p className="text-sm">
              <span className="font-medium">Amount Paid:</span> ₹
              {paidAmount.toFixed(2)}
              {paymentType === "half" && ` (of $${totalAmount.toFixed(2)})`}
            </p>
          </div>
          <p className="text-sm text-gray-500 mb-6">
            A confirmation email has been sent to {form.email}.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default Checkout;
