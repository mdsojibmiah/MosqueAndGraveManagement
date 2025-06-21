// src/pages/Home.jsx
import { FaCheckCircle } from "react-icons/fa";
import homeimage from '../assets/images/homeimg.jpg';
import images from "../data/galleryImages.json";
import FaqSection from "./FaqSection";
import NoticeSection from "./NoticeSection";
import PrayerTimeSection from "./PrayerTimeSection";


export default function Home() {
  // State for prayer times, loading status, and error message

  // List of website feature points
  const points = [
    "সমস্ত মসজিদ ও কবরস্থান তথ্য ডিজিটালভাবে সংরক্ষিত।",
    "দান ও ব্যয়ের স্বচ্ছ হিসাব সংরক্ষণ।",
    "কমিটির সদস্যদের বিস্তারিত তথ্য সহজে পাওয়া যায়।",
    "সবার জন্য সহজবোধ্য ও নিরাপদ ওয়েবসাইট।",
    "মোবাইল ও ডেস্কটপ — উভয় ডিভাইসেই ব্যবহারযোগ্য।",
  ];

  return (
      <main className="w-full min-h-screen px-4 sm:px-6 py-16 space-y-24 bg-gradient-to-b from-[#0b1120] via-[#0f172a] to-[#0f172a] text-white">

        {/* Header Section */}
        <section className="text-center mb-16 max-w-5xl mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-green-400 drop-shadow mt-10 mb-6 leading-tight">
            আমাদের মসজিদ ও কবরস্থান
          </h1>
          <p className="text-gray-200 text-base sm:text-lg md:text-xl leading-relaxed">
            আমাদের এলাকার মসজিদ ও কবরস্থান ব্যবস্থাপনায় এনেছি আধুনিকতার ছোঁয়া। কমিটি সদস্যদের তথ্য, দানের হিসাব, এবং অন্যান্য গুরুত্বপূর্ণ তথ্য এখন সহজেই পাওয়া যাবে ডিজিটাল মাধ্যমেই — স্বচ্ছতা ও নিরাপত্তা নিশ্চিত করে।
          </p>

        </section>

        {/* Image and Features Section */}
        <section className="flex flex-col md:flex-row items-center gap-12 md:gap-20 max-w-7xl mx-auto px-4">
          <img
            src={homeimage}
            alt="Mosque"
            className="rounded-2xl shadow-2xl w-full md:w-1/2 object-cover border-4 border-green-400"
          />
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-semibold text-green-300 border-l-4 border-green-400 pl-4 leading-snug">
              কেন এই ওয়েবসাইট?
            </h2>
            <ul className="space-y-4">
              {points.map((point, idx) => (
                <li key={idx} className="flex items-start text-gray-100 text-base sm:text-lg md:text-xl">
                  <FaCheckCircle className="text-green-400 mr-3 flex-shrink-0 text-xl mt-1" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Prayer Time Section */}
        <PrayerTimeSection/>
        {/* <section className=" backdrop-blur-md p-6 rounded-lg shadow-xl text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-green-300 mb-6">আজকের নামাজের সময়</h2>
          {loading ? (
            <p className="text-gray-200 text-lg">নামাজের সময় লোড হচ্ছে...</p>
          ) : error ? (
            <p className="text-red-300 text-lg">{error}</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {prayerTimes &&
                Object.entries(prayerTimes).map(([name, time]) => (
                  <div
                    key={name}
                    className="bg-white/20 p-4 rounded shadow text-green-100 font-semibold text-lg"
                  >
                    <p className="capitalize">{banglaNames[name]}</p>
                    <p className="text-gray-200 mt-1 text-base">{convertTo12Hour(time)}</p>
                  </div>
                ))}
            </div>
          )}
        </section> */}

        {/* Gallery Section */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold text-green-300 mb-12 text-center">
            গ্যালারি: মসজিদ ও কবরস্থান
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {images.map(({ src, alt }, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-xl shadow-lg cursor-pointer transform hover:scale-105 transition duration-300"
              >
                <img src={src} alt={alt} loading="lazy" className="w-full h-64 object-cover" />
              </div>
            ))}
          </div>
        </section>

        <FaqSection />
        <NoticeSection />

        {/* Footer */}
        <footer className="mt-20 border-t border-gray-700 pt-10 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} আমাদের মসজিদ ও কবরস্থান | সর্বস্বত্ব সংরক্ষিত</p>
        </footer>
      </main>

  );
}
