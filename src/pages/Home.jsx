// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import homeimage from '../assets/images/homeimg.jpg';
import images from "../data/galleryImages.json";

// Function to convert 24-hour time to 12-hour AM/PM format
function convertTo12Hour(time24) {
  let [hour, minute] = time24.split(":").map(Number);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour}:${minute.toString().padStart(2, "0")} ${ampm}`;
}
// map of English to Bangla names
const banglaNames = {
  Fajr: "ফজর",
  Dhuhr: "যোহর",
  Asr: "আসর",
  Maghrib: "মাগরিব",
  Isha: "ইশা"
};


export default function Home() {
  // State for prayer times, loading status, and error message
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // List of website feature points
  const points = [
    "সমস্ত মসজিদ ও কবরস্থান তথ্য ডিজিটালভাবে সংরক্ষিত।",
    "দান ও ব্যয়ের স্বচ্ছ হিসাব সংরক্ষণ।",
    "কমিটির সদস্যদের বিস্তারিত তথ্য সহজে পাওয়া যায়।",
    "সবার জন্য সহজবোধ্য ও নিরাপদ ওয়েবসাইট।",
    "মোবাইল ও ডেস্কটপ — উভয় ডিভাইসেই ব্যবহারযোগ্য।",
  ];

  // Fetch prayer times from AlAdhan API
  useEffect(() => {
    async function fetchPrayerTimes() {
      setLoading(true);
      try {
        const response = await fetch(
          "https://api.aladhan.com/v1/timingsByCity?city=Dhaka&country=Bangladesh&method=2"
        );
        const data = await response.json();
        if (data.code === 200 && data.data?.timings) {
          const { Fajr, Dhuhr, Asr, Maghrib, Isha } = data.data.timings;
          setPrayerTimes({ Fajr, Dhuhr, Asr, Maghrib, Isha });
          setError(null);
        } else {
          setError("নামাজের সময় পাওয়া যাচ্ছে না। অনুগ্রহ করে পরে চেষ্টা করুন।");
        }
      } catch {
        setError("API থেকে নামাজের সময় আনতে সমস্যা হয়েছে।");
      } finally {
        setLoading(false);
      }
    }
    fetchPrayerTimes();
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-6 py-20 space-y-24">

      {/* Header Section */}
      <section className="text-center mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-green-700 drop-shadow-md mb-6 leading-tight">
          আমাদের মসজিদ ও কবরস্থান
        </h1>
        <p className="max-w-3xl mx-auto text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed">
          আমাদের এলাকার মসজিদ ও কবরস্থান ব্যবস্থাপনা এখন সম্পূর্ণ ডিজিটাল। কমিটির সদস্য তালিকা, দানের বিবরণ, ও ব্যয়ের হিসাব এখন সহজেই দেখা যাবে স্বচ্ছভাবে। আধুনিক প্রযুক্তির মাধ্যমে স্থানীয়দের জন্য এই সেবা সহজ করে তোলা হয়েছে।
        </p>
      </section>

      {/* Image and Features Section */}
      <section className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
        <img
          src={homeimage}
          alt="Mosque"
          className="rounded-2xl shadow-2xl w-full md:w-1/2 object-cover border-4 border-green-300"
          loading="lazy"
        />
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-green-800 border-l-4 border-green-500 pl-4 leading-snug">
            কেন এই ওয়েবসাইট?
          </h2>
          <ul className="space-y-4">
            {points.map((point, idx) => (
              <li
                key={idx}
                className="flex items-start text-gray-700 text-base sm:text-lg md:text-xl"
              >
                <FaCheckCircle className="text-green-600 mr-3 flex-shrink-0 text-lg sm:text-xl md:text-2xl mt-1" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Live Prayer Times Section */}
      <section className="bg-green-50 p-6 rounded-lg shadow-inner text-center max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-green-700 mb-6">আজকের নামাজের সময়</h2>
        {loading ? (
          <p className="text-gray-600 text-lg">নামাজের সময় লোড হচ্ছে...</p>
        ) : error ? (
          <p className="text-red-600 text-lg">{error}</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {prayerTimes &&
              Object.entries(prayerTimes).map(([name, time]) => (
                <div
                  key={name}
                  className="bg-white p-4 rounded shadow text-green-800 font-semibold text-lg"
                >
                  <p className="capitalize">{banglaNames[name]}</p>
                  <p className="text-gray-700 mt-1 text-base">{convertTo12Hour(time)}</p>
                </div>
              ))}
          </div>
        )}
      </section>

      {/* Gallery Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-green-700 mb-12 text-center">
          গ্যালারি: মসজিদ ও কবরস্থান
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {images.map(({ src, alt }, idx) => (
            <div
              key={idx}
              className="overflow-hidden rounded-xl shadow-lg cursor-pointer transform hover:scale-105 transition duration-300"
            >
              <img
                src={src}
                alt={alt}
                loading="lazy"
                className="w-full h-64 object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Committee Members Button */}
      <section className="text-center mt-20">
        <a
          href="/committee"
          className="inline-block bg-gradient-to-r from-green-600 to-green-800 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-lg text-lg sm:text-xl font-semibold shadow-lg hover:scale-105 transform transition duration-300"
          aria-label="কমিটির সদস্য তালিকা দেখুন"
        >
          কমিটির সদস্য দেখুন
        </a>
      </section>

      {/* Footer */}
      <footer className="mt-20 border-t pt-10 text-center text-gray-600 text-sm">
        <p>© {new Date().getFullYear()} আমাদের মসজিদ ও কবরস্থান | সর্বস্বত্ব সংরক্ষিত</p>
      </footer>
    </main>
  );
}
