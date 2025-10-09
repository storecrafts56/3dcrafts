import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Payment from "../components/Payment";

const Checkout = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  // User information state
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
    phone: "",
  });

  // Form errors
  const [errors, setErrors] = useState({});

  // Load cart items and calculate total
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const items = JSON.parse(savedCart);
      setCartItems(items);
      const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      setTotalAmount(total);
    } else {
      // Redirect if cart is empty
      navigate("/cart");
    }
  }, [navigate]);

  // Handle user info input changes
  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  // Validate user information form
  const validateUserInfoForm = () => {
    const newErrors = {};

    // Required fields
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "address",
      "city",
      "state",
      "zipCode",
      "phone",
    ];
    requiredFields.forEach((field) => {
      if (!userInfo[field].trim()) {
        newErrors[field] = "This field is required";
      }
    });

    // Email validation
    if (userInfo.email && !/\S+@\S+\.\S+/.test(userInfo.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    if (userInfo.phone && !/^\d{10}$/.test(userInfo.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit user information and move to payment
  const handleUserInfoSubmit = (e) => {
    e.preventDefault();

    if (validateUserInfoForm()) {
      setCurrentStep(2);
    }
  };

  // Go back to user info step
  const handleBackToUserInfo = () => {
    setCurrentStep(1);
  };

  // Complete payment and checkout
  const handlePaymentComplete = (paymentDetails) => {
    // Combine order data
    const orderData = {
      user: userInfo,
      items: cartItems,
      total: totalAmount,
      payment: paymentDetails,
      orderDate: new Date().toISOString(),
    };

    // In a real app, you would send this to your backend
    console.log("Order completed:", orderData);

    // Clear cart and redirect to success page
    localStorage.removeItem("cart");
    navigate("/order-success", { state: { orderDetails: orderData } });
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-4">
      {/* Progress Indicator */}
      <div className="flex mb-8">
        <div
          className={`flex-1 text-center ${
            currentStep === 1 ? "font-bold" : ""
          }`}
        >
          <div
            className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center ${
              currentStep === 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            1
          </div>
          <div className="mt-2">Shipping Info</div>
        </div>
        <div className="flex-1 text-center">
          <div
            className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center ${
              currentStep === 2
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            2
          </div>
          <div className="mt-2">Payment</div>
        </div>
      </div>

      {currentStep === 1 && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
          <form onSubmit={handleUserInfoSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* First Name */}
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-gray-700 font-medium mb-1"
                >
                  First Name*
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={userInfo.firstName}
                  onChange={handleUserInfoChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Last Name*
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={userInfo.lastName}
                  onChange={handleUserInfoChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Email Address*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleUserInfoChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Phone Number*
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={userInfo.phone}
                  onChange={handleUserInfoChange}
                  placeholder="(123) 456-7890"
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label
                  htmlFor="address"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Address*
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={userInfo.address}
                  onChange={handleUserInfoChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.address ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                )}
              </div>

              {/* City */}
              <div>
                <label
                  htmlFor="city"
                  className="block text-gray-700 font-medium mb-1"
                >
                  City*
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={userInfo.city}
                  onChange={handleUserInfoChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.city ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                )}
              </div>

              {/* State */}
              <div>
                <label
                  htmlFor="state"
                  className="block text-gray-700 font-medium mb-1"
                >
                  State/Province*
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={userInfo.state}
                  onChange={handleUserInfoChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.state ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.state && (
                  <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                )}
              </div>

              {/* Zip Code */}
              <div>
                <label
                  htmlFor="zipCode"
                  className="block text-gray-700 font-medium mb-1"
                >
                  ZIP/Postal Code*
                </label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={userInfo.zipCode}
                  onChange={handleUserInfoChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.zipCode ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.zipCode && (
                  <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>
                )}
              </div>

              {/* Country */}
              <div>
                <label
                  htmlFor="country"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Country*
                </label>
                <select
                  id="country"
                  name="country"
                  value={userInfo.country}
                  onChange={handleUserInfoChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="MX">Mexico</option>
                  <option value="UK">United Kingdom</option>
                  {/* Add more countries as needed */}
                </select>
              </div>
            </div>

            <div className="mt-6 text-right">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Continue to Payment
              </button>
            </div>
          </form>
        </div>
      )}

      {currentStep === 2 && (
        <Payment
          onComplete={handlePaymentComplete}
          onBack={handleBackToUserInfo}
          totalAmount={totalAmount}
          cartItems={cartItems}
        />
      )}
    </div>
  );
};

export default Checkout;
