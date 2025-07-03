import React, { useState } from 'react';

const faqList = [
  {
    question: "How do I reset my password?",
    answer: "Go to Settings > Account > Reset Password and follow the instructions sent to your email.",
  },
  {
    question: "How can I report a bug?",
    answer: "Click on the 'Report Issue' button below and describe the problem you’re facing.",
  },
  {
    question: "How do I contact support?",
    answer: "Email us at support@yourapp.com or use the contact form below.",
  },
];

const HelpSupport = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    // <div className="min-h-screen bg-gray-100 p-6 md:p-10 ">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-md dark:bg-gray-800 dark:text-gray-100 ">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Help & Support</h1>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
          {faqList.map((faq, index) => (
            <div key={index} className="mb-3 border-b pb-2 ">
              <button
                className="w-full text-left font-medium text-gray-800 hover:text-blue-500  dark:text-gray-100"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
              </button>
              {activeIndex === index && (
                <p className="mt-2 text-gray-600 transition-all duration-300  dark:text-gray-100">{faq.answer}</p>
              )}
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <form className="space-y-4 ">
            <div>
              <label className="block font-medium text-gray-700  dark:text-gray-100">Name</label>
              <input
                type="text"
                className="w-full mt-1 px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700  dark:text-gray-100">Email</label>
              <input
                type="email"
                className="w-full mt-1 px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700  dark:text-gray-100">Message</label>
              <textarea
                rows="4"
                className="w-full mt-1 px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Describe your issue..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition-all duration-300  dark:text-gray-100"
            >
              Submit
            </button>
          </form>
        </section>
      </div>
    // </div>
  );
};

export default HelpSupport;
