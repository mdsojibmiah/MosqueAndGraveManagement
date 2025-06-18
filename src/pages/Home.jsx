// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { FaCheckCircle, FaRegNewspaper, FaClock, FaImages, FaDonate, FaQuestionCircle } from "react-icons/fa";

export default function Home() {
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [loadingPrayer, setLoadingPrayer] = useState(true);
  const [errorPrayer, setErrorPrayer] = useState(null);

  const points = [
    "মসজিদ ও কবরস্থানের সব তথ্য ডিজিটাল ফরম্যাটে সংরক্ষণ।",
    "অনুদান ও খরচের স্বচ্ছ হিসাব রাখা।",
    "কমিটির সদস্যদের বিস্তারিত তথ্য সহজে পাওয়া যায়।",
    "সবার জন্য সহজ ও নিরাপদ ওয়েবসাইট।",
    "মোবাইল ও ডেস্কটপে একসাথে কাজ করার সুবিধা।",
  ];

  // Live Prayer Time API call (AlAdhan)
  useEffect(() => {
    async function fetchPrayerTimes() {
      try {
        setLoadingPrayer(true);
        const res = await fetch(
          "https://api.aladhan.com/v1/timingsByCity?city=Dhaka&country=Bangladesh&method=2"
        );
        const data = await res.json();
        if (data.code === 200) {
          const timings = data.data.timings;
          setPrayerTimes({
            Fajr: timings.Fajr,
            Dhuhr: timings.Dhuhr,
            Asr: timings.Asr,
            Maghrib: timings.Maghrib,
            Isha: timings.Isha,
          });
          setErrorPrayer(null);
        } else {
          setErrorPrayer("নামাজের সময় পাওয়া যায়নি। পরে চেষ্টা করুন।");
        }
      } catch (err) {
        setErrorPrayer("নামাজের সময় API তে সমস্যা হয়েছে।");
      } finally {
        setLoadingPrayer(false);
      }
    }
    fetchPrayerTimes();
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-6 py-20 space-y-24">

      {/* হেডিং ও পরিচিতি */}
      <section className="text-center mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-green-700 drop-shadow-md mb-6 leading-tight">
          আমাদের মসজিদ ও কবরস্থান
        </h1>
        <p className="max-w-3xl mx-auto text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed">
          আমাদের এলাকার মসজিদ ও কবরস্থান ব্যবস্থাপনা এখন ডিজিটাল। এখানে আপনি কমিটির সদস্যদের তালিকা দেখতে পারবেন, অনুদান এবং খরচের তথ্য পাবেন সহজে। সমস্ত তথ্য থাকবে স্বচ্ছ এবং আপডেটেড। আমাদের লক্ষ্য স্থানীয় জনগণের সুবিধার্থে আধুনিক প্রযুক্তি ব্যবহার করা।
        </p>
      </section>

      {/* ছবি ও টেক্সট সেকশন */}
      <section className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=700&q=80"
          alt="Mosjid"
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

      {/* Live Prayer Time Section */}
      <section className="bg-green-50 p-6 rounded-lg shadow-inner text-center max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-green-700 mb-6">আজকের নামাজের সময়সূচি</h2>
        {loadingPrayer ? (
          <p className="text-gray-600 text-lg">নামাজের সময় লোড হচ্ছে...</p>
        ) : errorPrayer ? (
          <p className="text-red-600 text-lg">{errorPrayer}</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {prayerTimes &&
              Object.entries(prayerTimes).map(([name, time]) => (
                <div
                  key={name}
                  className="bg-white p-4 rounded shadow text-green-800 font-semibold text-lg"
                >
                  <p className="capitalize">{name}</p>
                  <p className="text-gray-700 mt-1 text-base">{time}</p>
                </div>
              ))}
          </div>
        )}
      </section>

      {/* বাড়তি সেকশন: সুবিধা, নোটিশ, গ্যালারি, ডোনেশন, FAQ */}
      <section>
        <h2 className="text-3xl font-bold text-green-800 mb-10 text-center">আরও সুবিধাসমূহ</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 max-w-6xl mx-auto">
          <FeatureCard title="নোটিশ বোর্ড" description="আসন্ন প্রোগ্রাম/ঘোষণা" />
          <FeatureCard title="প্রেয়ার টাইম API" description="লাইভ নামাজের সময় দেখানো" />
          <FeatureCard title="গ্যালারি সেকশন" description="ছবি ও স্মৃতিচারণা" />
          <FeatureCard title="ডোনেশন পেইজ লিঙ্ক" description="অনলাইন দানের বিস্তারিত" />
          <FeatureCard title="FAQ সেকশন" description="কমন প্রশ্নের উত্তর" />
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center mt-20">
        <a
          href="/committee"
          className="inline-block bg-gradient-to-r from-green-600 to-green-800 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-lg text-lg sm:text-xl font-semibold shadow-lg hover:scale-105 transform transition duration-300"
          aria-label="কমিটির সদস্য দেখুন"
        >
          কমিটির সদস্য দেখুন
        </a>
      </section>

      {/* Footer */}
      <footer className="mt-20 border-t pt-10 text-center text-gray-600 text-sm">
        <p>© {new Date().getFullYear()} আমাদের মসজিদ ও কবরস্থান | সর্বস্বত্ব সংরক্ষিত</p>
        {/* <p className="mt-2">
          ডেভেলপ করেছেন: <span className="text-green-600 font-medium">Sojib</span>
        </p> */}
      </footer>
    </main>
  );
}

function FeatureCard({ title, description }) {
  return (
    <div className="bg-white p-5 shadow-md rounded-md hover:shadow-lg transition text-center">
      <h4 className="text-lg font-semibold mb-2 text-green-700">{title}</h4>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}
