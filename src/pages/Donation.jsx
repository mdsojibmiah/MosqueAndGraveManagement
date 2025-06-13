// src/pages/Donation.jsx
import { FaMosque, FaDonate } from "react-icons/fa";
import { GiGraveyard } from "react-icons/gi";

const mosqueDonations = [
  {
    id: 1,
    name: "মোঃ আবু সাঈদ",
    amount: 1500,
    purpose: "মসজিদের পাখা",
    date: "২০২৫-০৬-১০",
  },
  {
    id: 2,
    name: "আসিফা বেগম",
    amount: 1000,
    purpose: "মাইকে সার্ভিস",
    date: "২০২৫-০৬-১২",
  },
];

const graveyardDonations = [
  {
    id: 1,
    name: "মোঃ শহিদুল ইসলাম",
    amount: 2000,
    purpose: "কবরস্থান ঘাস কাটা",
    date: "২০২৫-০৬-১১",
  },
  {
    id: 2,
    name: "জান্নাতুল নাঈম",
    amount: 800,
    purpose: "জল সরবরাহ",
    date: "২০২৫-০৬-১২",
  },
];

export default function Donation() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-green-800 mb-2">
          <FaDonate className="inline mr-2 text-green-700" />
          অনুদানের তালিকা
        </h1>
        <p className="text-gray-600 text-lg">
          এখানে মসজিদ ও কবরস্থানের জন্য প্রদত্ত সকল অনুদান তালিকাভুক্ত করা হয়েছে।
        </p>
      </div>

      {/* মসজিদের অনুদান */}
      <DonationSection
        title="মসজিদের অনুদান"
        icon={<FaMosque />}
        donations={mosqueDonations}
      />

      {/* কবরস্থানের অনুদান */}
      <DonationSection
        title="কবরস্থানের অনুদান"
        icon={<GiGraveyard />}
        donations={graveyardDonations}
      />
    </section>
  );
}

function DonationSection({ title, donations, icon }) {
  const total = donations.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="mb-14">
      <div className="flex items-center gap-2 text-2xl font-semibold text-green-700 mb-4">
        <span className="text-3xl">{icon}</span> {title}
      </div>

      {/* Summary Card */}
      <div className="bg-green-50 border border-green-100 rounded-md p-4 mb-4 flex justify-between items-center text-sm text-gray-700 shadow-sm">
        <span>মোট অনুদান: <strong>{donations.length}</strong> জন</span>
        <span>
          মোট অর্থঃ <strong className="text-green-700">৳ {total.toLocaleString()}</strong>
        </span>
      </div>

      <DonationTable donations={donations} />
    </div>
  );
}

function DonationTable({ donations }) {
  return (
  <div className="w-full flex justify-center">
    <div className="w-full max-w-4xl">
      <table className="w-full table-auto bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden text-center">
        <thead className="bg-green-700 text-white text-sm md:text-base">
          <tr>
            <th className="py-3 px-2">নাম</th>
            <th className="py-3 px-2">পরিমাণ (৳)</th>
            <th className="py-3 px-2">উদ্দেশ্য</th>
            <th className="py-3 px-2">তারিখ</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((d, index) => (
            <tr
              key={d.id}
              className={`border-b ${
                index % 2 === 0 ? "bg-white" : "bg-green-50"
              } hover:bg-green-100 transition`}
            >
              <td className="py-3 px-2 text-sm break-words">{d.name}</td>
              <td className="py-3 px-2 text-sm">৳ {d.amount}</td>
              <td className="py-3 px-2 text-sm break-words">{d.purpose}</td>
              <td className="py-3 px-2 text-sm">{d.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
}
