import React, { useState } from "react";

const initialState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      setError("Please fill in all fields.");
      return;
    }
    alert("Message sent successfully!");

    setSubmitted(true);
    setForm(initialState);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
      <p className="mb-6 text-gray-600">
        Have questions, feedback, or need support? Fill out the form below and
        our team will get back to you as soon as possible.
      </p>
      <div className="mb-6 text-gray-700">
        <div>
          <span className="font-semibold">Email:</span> support@3dCrafts.com
        </div>
        <div>
          <span className="font-semibold">Phone:</span> +1 (800) 123-4567
        </div>
        <div>
          <span className="font-semibold">Address:</span> 123 Gift Avenue, Suite
          100, City, Country
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
          className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          rows={5}
          className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && <div className="text-red-600">{error}</div>}
        {submitted && (
          <div className="text-green-600">
            Thank you for contacting us! We will respond soon.
          </div>
        )}
        <button
          type="submit"
          className="py-3 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
