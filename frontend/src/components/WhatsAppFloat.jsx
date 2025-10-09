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
        <svg
          className="w-8 h-8"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="16" cy="16" r="16" fill="#25D366" />
          <path
            d="M22.5 18.5c-.3-.2-1.7-.8-2-1-.3-.2-.5-.2-.7.1-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.2-.4-2.3-1.3-.8-.7-1.4-1.5-1.6-1.8-.2-.3-.1-.5.1-.7.2-.2.3-.4.5-.6.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6 0-.2-.7-1.7-.9-2.3-.2-.6-.4-.5-.6-.5-.2 0-.4 0-.6 0-.2 0-.5.1-.7.3-.2.2-1.1 1.1-1.1 2.7 0 1.6 1.2 3.1 1.4 3.3.2.2 2.4 3.7 6.1 3.7 1.1 0 2.2-.4 3-.9.8-.5 1.3-1.2 1.5-1.7.2-.5.2-.9.1-1.1z"
            fill="#fff"
          />
        </svg>
      </button>
    </a>
  </div>
);

export default WhatsAppFloat;
