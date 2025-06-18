import { useState } from "react";
import { FaMinus, FaPlus, FaQuestionCircle } from "react-icons/fa";
import faqData from "../data/faqData.json";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
<section className="py-16 px-4 sm:px-6 lg:px-0 transition-colors duration-500 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a]">

      <h2 className="text-3xl font-bold text-green-700 dark:text-green-400 mb-10 text-center flex items-center justify-center gap-2">
        <FaQuestionCircle className="text-green-600 dark:text-green-400" />
        সাধারণ প্রশ্নোত্তর
      </h2>
      <div className="max-w-4xl mx-auto space-y-4">
        {faqData.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md transition-all duration-300 overflow-hidden"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center p-5 text-left"
              >
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  প্র: {faq.question}
                </h3>
                {isOpen ? (
                  <FaMinus className="text-green-600" />
                ) : (
                  <FaPlus className="text-green-600" />
                )}
              </button>
              <div
                className={`px-5 pb-5 transition-all duration-300 ease-in-out ${
                  isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                } overflow-hidden`}
              >
                <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
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
