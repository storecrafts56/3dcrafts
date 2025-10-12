import React from "react";

const whatsappNumber = "1234567890";
const message = encodeURIComponent(
  "Hello! I have a question about your products."
);
const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;

const WhatsAppFloat = () => (
  <div className="fixed bottom-6 right-6 z-50">
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
    >
      <button
        type="button"
        className="bg-[#25D366] rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
      >
        <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.stickpng.com%2Fimg%2Ficons-logos-emojis%2Ftech-companies%2Fwhatsapp-logo&psig=AOvVaw07qSqK3a3iTAckvaVYlh8u&ust=1760327015950000&source=images&cd=vfe&opi=89978449&ved=0CBYQjRxqFwoTCJCczKXfnZADFQAAAAAdAAAAABAE" alt="whats app"/>
      </button>
    </a>
  </div>
);

export default WhatsAppFloat;
