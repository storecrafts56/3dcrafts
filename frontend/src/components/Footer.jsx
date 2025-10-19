import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => (
  <footer className="bg-[#222] text-white pt-10 pb-5">
    <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-start gap-8 px-4">
      {/* Company Info */}
      <div className="flex-1 min-w-[220px]">
        <h2 className="text-2xl mb-3 font-bold">3dCrafts</h2>
        <p className="text-base leading-relaxed mb-4">
          Your one-stop shop for unique gifts. Fast shipping, secure payments,
          and excellent customer service.
        </p>
        <div className="flex gap-3">
          <a
            href="https://facebook.com"
            aria-label="Facebook"
            className="hover:text-[#f7c04a]"
          >
            <Facebook size={20} />
          </a>
          <a
            href="https://twitter.com"
            aria-label="Twitter"
            className="hover:text-[#f7c04a]"
          >
            <Twitter size={20} />
          </a>
          <a
            href="https://instagram.com"
            aria-label="Instagram"
            className="hover:text-[#f7c04a]"
          >
            <Instagram size={20} />
          </a>
          <a
            href="https://linkedin.com"
            aria-label="LinkedIn"
            className="hover:text-[#f7c04a]"
          >
            <Linkedin size={20} />
          </a>
        </div>
      </div>
      {/* Quick Links */}
      <div className="flex-1 min-w-[160px]">
        <h3 className="text-lg mb-3 font-semibold">Quick Links</h3>
        <ul className="list-none p-0 m-0 space-y-2">
          <li>
            <a href="/catalog" className="hover:text-[#f7c04a]">
              Catalog
            </a>
          </li>
          <li>
            <a href="/cart" className="hover:text-[#f7c04a]">
              Cart
            </a>
          </li>
          <li>
            <a href="/contact" className="hover:text-[#f7c04a]">
              Contact
            </a>
          </li>
         
        </ul>
      </div>
      {/* Customer Service */}
      <div className="flex-1 min-w-[160px]">
        <h3 className="text-lg mb-3 font-semibold">Customer Service</h3>
        <ul className="list-none p-0 m-0 space-y-2">
          <li>
            <a href="/returns" className="hover:text-[#f7c04a]">
              Returns & Refunds
            </a>
          </li>
          <li>
            <a href="/shipping_info" className="hover:text-[#f7c04a]">
              Shipping Info
            </a>
          </li>
          <li>
            <a href="/privacy_policy" className="hover:text-[#f7c04a]">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="/terms_conditions" className="hover:text-[#f7c04a]">
              Terms & Conditions
            </a>
          </li>
        </ul>
      </div>
      {/* Newsletter */}
      <div className="flex-1 min-w-[220px]">
        <h3 className="text-lg mb-3 font-semibold">Subscribe to Newsletter</h3>
        <form className="flex">
          <input
            type="email"
            placeholder="Your email address"
            className="p-2 rounded-l-md border-none outline-none w-7/12 bg-white text-black"
          />
          <button
            type="submit"
            className="p-2 px-4 rounded-r-md bg-[#f7c04a] text-[#222] font-bold hover:bg-yellow-400 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
    <div className="border-t border-[#444] mt-8 pt-4 text-center text-base">
      &copy; {new Date().getFullYear()} 3dCrafts. All rights reserved.
    </div>
  </footer>
);

export default Footer;
