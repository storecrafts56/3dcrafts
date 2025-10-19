import React from 'react';

const ShippingInfo = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Shipping Information</h1>
      <p className="text-lg text-gray-700 mb-4">
        We offer fast and reliable shipping for all orders. Below is an overview of our shipping policies.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">Shipping Methods</h2>
      <p className="text-lg text-gray-700 mb-4">
        We provide various shipping options, including standard and expedited shipping. The available methods will be shown during checkout.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">Processing Time</h2>
      <p className="text-lg text-gray-700 mb-4">
        All orders are processed within 1-2 business days, excluding holidays and weekends. You will receive a tracking number once your order has shipped.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">Shipping Charges</h2>
      <p className="text-lg text-gray-700 mb-4">
        Shipping charges are calculated based on your delivery address and the shipping method chosen. The exact charges will be displayed at checkout.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">International Shipping</h2>
      <p className="text-lg text-gray-700 mb-4">
        We currently offer international shipping to select countries. International customers are responsible for any customs duties or import taxes.
      </p>
    </div>
  );
};

export default ShippingInfo;
