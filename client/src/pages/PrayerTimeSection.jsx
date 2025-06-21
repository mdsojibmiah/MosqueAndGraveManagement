import { useEffect, useState } from "react";

const banglaNames = {
  fajr: "ফজর",
  dhuhr: "যোহর",
  asr: "আসর",
  maghrib: "মাগরিব",
  isha: "ইশা",
};

function convertTo12Hour(time24) {
  const [hour, minute] = time24.split(":").map(Number);
  let suffix = hour >= 12 ? "PM" : "AM";
  let hour12 = hour % 12 || 12;
  return `${hour12}:${minute.toString().padStart(2, "0")} ${suffix}`;
}

function getHijriDate() {
  try {
    return new Intl.DateTimeFormat("en-TN-u-ca-islamic", {
      day: "numeric",
      month: "long",
      year: "numeric",
      numberingSystem: "arab",
    }).format(new Date());
  } catch {
    return "হিজরি তারিখ পাওয়া যায়নি";
  }
}

export default function PrayerTimeSection() {
  const [gregorianDate, setGregorianDate] = useState("");
  const [hijriDate, setHijriDate] = useState("");
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const now = new Date();
    setGregorianDate(
      now.toLocaleDateString("bn-BD", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
    setHijriDate(getHijriDate());
  }, []);

  useEffect(() => {
    async function fetchPrayerTimes() {
      setLoading(true);
      try {
        const res = await fetch(
          "https://api.aladhan.com/v1/timingsByCity?city=Tangail&country=Bangladesh&method=2"
        );
        const data = await res.json();
        if (data.code === 200 && data.data?.timings) {
          const { Fajr, Dhuhr, Asr, Maghrib, Isha } = data.data.timings;
          setPrayerTimes({
            fajr: Fajr,
            dhuhr: Dhuhr,
            asr: Asr,
            maghrib: Maghrib,
            isha: Isha,
          });
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
    <section className="max-w-4xl mx-auto p-8 rounded-xl bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] backdrop-blur-sm shadow-lg text-center text-gray-300">
      <h2 className="text-4xl font-extrabold text-emerald-400 mb-4 tracking-wide">
        আজকের নামাজের সময়
      </h2>

      <p className="text-gray-400 mb-2 italic">
        {gregorianDate} | হিজরি: {hijriDate}
      </p>

      {loading ? (
        <p className="text-yellow-400 text-lg my-8 animate-pulse">
          নামাজের সময় লোড হচ্ছে...
        </p>
      ) : error ? (
        <p className="text-red-500 text-lg my-8">{error}</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 mt-6">
          {prayerTimes &&
            Object.entries(prayerTimes).map(([name, time]) => (
              <div
                key={name}
                className="bg-gradient-to-tr from-green-900/60 to-green-700/40 backdrop-blur-md rounded-lg p-5 shadow-md border border-green-600 text-emerald-300 font-semibold"
              >
                <p className="text-xl mb-1">{banglaNames[name]}</p>
                <p className="text-gray-300 text-lg">{convertTo12Hour(time)}</p>
              </div>
            ))}
        </div>
      )}

      <blockquote className="mt-10 italic text-gray-400 max-w-xl mx-auto px-4">
        <p>
          “সৎ ইবাদত ও নামাজের মাধ্যমে হৃদয়কে শান্তি দাও এবং আল্লাহর নৈকট্য অর্জন করো।” <br />
          <span className="text-green-400 font-semibold">— দোয়া ও মুনাজাত</span>
        </p>
      </blockquote>
    </section>
  );
}
