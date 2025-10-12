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
        <img src="https://res.cloudinary.com/dmomhs5ex/image/upload/v1760241756/w_app_tr_b9qj9a.png" alt="whats app"/>
      </button>
    </a>
  </div>
);

export default WhatsAppFloat;
