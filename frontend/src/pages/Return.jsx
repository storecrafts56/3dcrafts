import React from 'react';

const ReturnRefunds = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Return and Refund Policy</h1>
      <p className="text-lg text-gray-700 mb-4">
        At 3dCrafts, we want you to be satisfied with your purchase. If you're not happy with your order, you can return it within 30 days of receipt.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">Returns</h2>
      <p className="text-lg text-gray-700 mb-4">
        To return an item, it must be unused and in the same condition that you received it. You’ll need to provide a receipt or proof of purchase.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">Refunds</h2>
      <p className="text-lg text-gray-700 mb-4">
        Once we receive your return, we will inspect it and notify you of the approval or rejection of your refund. If approved, we will process the refund to your original payment method.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">Non-returnable Items</h2>
      <p className="text-lg text-gray-700 mb-4">
        Some items, such as personalized or custom orders, are not eligible for return or refund.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">Shipping for Returns</h2>
      <p className="text-lg text-gray-700 mb-4">
        You will be responsible for paying for your own shipping costs for returning the item. Shipping costs are non-refundable.
      </p>
    </div>
    )
}


export default ReturnRefunds;
