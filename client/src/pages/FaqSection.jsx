import { useState } from "react";
import { FaMinus, FaPlus, FaQuestionCircle } from "react-icons/fa";
import faqData from "../data/faqData.json";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-0  transition-colors duration-500">
      {/* Header */}
      {/* bg-gradient-to-b from-[#0b1120] via-[#0f172a] to-[#0f172a] */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-emerald-400 flex justify-center items-center gap-3">
          <FaQuestionCircle className="text-emerald-500 text-2xl" />
          সাধারণ প্রশ্নোত্তর
        </h2>
        <p className="mt-2 text-gray-400 text-sm md:text-base max-w-xl mx-auto">
          প্রায়ই জিজ্ঞাসিত কিছু প্রশ্ন এবং উত্তর এখানে দেওয়া হলো — আশা করি আপনার জিজ্ঞাসার সমাধান পেয়ে যাবেন।
        </p>
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-4xl mx-auto space-y-4">
        {faqData.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className={`rounded-lg border border-slate-700 shadow-md overflow-hidden transition-all duration-300 bg-[#1e293b]/50`}
            >
              {/* Question */}
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center px-6 py-4 focus:outline-none hover:bg-[#1e293b]/60 transition-all"
              >
                <h3 className="text-lg md:text-xl font-medium text-white text-left">
                  প্র: {faq.question}
                </h3>
                {isOpen ? (
                  <FaMinus className="text-emerald-400 text-xl" />
                ) : (
                  <FaPlus className="text-emerald-400 text-xl" />
                )}
              </button>

              {/* Answer */}
              <div
                className={`px-6 pb-5 transition-all duration-300 ease-in-out ${
                  isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                } overflow-hidden`}
              >
                <p className="text-gray-300 text-base leading-relaxed">
                  উ: {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
