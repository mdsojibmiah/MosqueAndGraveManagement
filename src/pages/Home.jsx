// src/pages/Home.jsx
import { FaCheckCircle } from "react-icons/fa";

export default function Home() {
  const points = [
    "মসজিদ ও কবরস্থানের সব তথ্য ডিজিটাল ফরম্যাটে সংরক্ষণ।",
    "অনুদান ও খরচের স্বচ্ছ হিসাব রাখা।",
    "কমিটির সদস্যদের বিস্তারিত তথ্য সহজে পাওয়া যায়।",
    "সবার জন্য সহজ ও নিরাপদ ওয়েবসাইট।",
    "মোবাইল ও ডেস্কটপে একসাথে কাজ করার সুবিধা।",
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      {/* হেডিং ও পরিচিতি */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold text-green-900 drop-shadow-md mb-6">
          আমার মসজিদ ও কবরস্থান
        </h1>
        <p className="max-w-3xl mx-auto text-gray-700 text-lg md:text-xl leading-relaxed">
          আমাদের এলাকার মসজিদ ও কবরস্থান ব্যবস্থাপনা এখন ডিজিটাল।  
          এখানে আপনি কমিটির সদস্যদের তালিকা দেখতে পারবেন, অনুদান এবং খরচের তথ্য পাবেন সহজে।  
          সমস্ত তথ্য থাকবে স্বচ্ছ এবং আপডেটেড।  
          আমাদের লক্ষ্য স্থানীয় জনগণের সুবিধার্থে আধুনিক প্রযুক্তি ব্যবহার করা।
        </p>
      </div>

      {/* ছবি ও টেক্সট সেকশন */}
      <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=700&q=80"
          alt="Mosjid"
          className="rounded-2xl shadow-2xl w-full md:w-1/2 object-cover border-4 border-green-300"
          loading="lazy"
        />

        <div className="md:w-1/2 space-y-6">
          <h2 className="text-3xl font-semibold text-green-800 border-l-4 border-green-500 pl-4">
            কেন এই ওয়েবসাইট?
          </h2>
          <ul className="space-y-4">
            {points.map((point, idx) => (
              <li
                key={idx}
                className="flex items-center text-gray-700 text-lg md:text-xl"
              >
                <FaCheckCircle className="text-green-600 mr-3 flex-shrink-0 text-xl md:text-2xl" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* কল টু একশন */}
      <div className="text-center mt-20">
        <a
          href="/committee"
          className="inline-block bg-gradient-to-r from-green-600 to-green-800 text-white px-10 py-4 rounded-lg text-xl font-semibold shadow-lg hover:scale-105 transform transition duration-300"
          aria-label="কমিটির সদস্য দেখুন"
        >
          কমিটির সদস্য দেখুন
        </a>
      </div>
    </section>
  );
}
