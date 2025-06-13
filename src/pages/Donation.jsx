import { useState, useRef } from "react";
import { FaMosque, FaDonate } from "react-icons/fa";
import { GiGraveyard } from "react-icons/gi";
import { FiSearch } from "react-icons/fi";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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
  const printRef = useRef();

const handleDownloadPDF = () => {
  const input = printRef.current;
  if (!input) return;

  // Delay দিয়ে try block ব্যবহার
  setTimeout(() => {
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("donation-report.pdf");
    });
  }, 300); // ছোট delay
};


  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-green-800 mb-4 leading-tight flex items-center justify-center">
        <FaDonate className="inline mr-3 text-3xl sm:text-4xl" />
        অনুদানের তালিকা
        </h1>

        <button
          onClick={handleDownloadPDF}
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 text-sm"
        >
          📥 PDF ডাউনলোড
        </button>
      </div>

      {/* PDF এর জন্য রেফারেন্সড এলাকা */}
      <div ref={printRef}>
        <DonationSection title="মসজিদের অনুদান" icon={<FaMosque />} donations={mosqueDonations} />
        <DonationSection title="কবরস্থানের অনুদান" icon={<GiGraveyard />} donations={graveyardDonations} />
      </div>
    </section>
  );
}

function DonationSection({ title, donations, icon }) {
  const total = donations.reduce((sum, d) => sum + d.amount, 0);
  const [filters, setFilters] = useState({
    name: "",
    date: "",
    minAmount: "",
    maxAmount: "",
  });

  const filtered = donations.filter((d) => {
    const matchName = filters.name ? d.name.includes(filters.name) : true;
    const matchDate = filters.date ? d.date === filters.date : true;
    const matchMin = filters.minAmount ? d.amount >= parseFloat(filters.minAmount) : true;
    const matchMax = filters.maxAmount ? d.amount <= parseFloat(filters.maxAmount) : true;
    return matchName && matchDate && matchMin && matchMax;
  });

  return (
    <div className="mb-12">
      <div className="flex items-center gap-2 text-2xl font-semibold text-green-700 mb-4">
        <span className="text-3xl">{icon}</span> {title}
      </div>

      {/* সারাংশ */}
      <div className="bg-green-50 border border-green-100 rounded-md p-4 mb-4 flex flex-col md:flex-row justify-between items-start md:items-center text-sm text-gray-700 shadow-sm">
        <span>মোট অনুদান: <strong>{filtered.length}</strong> জন</span>
        <span>মোট অর্থঃ <strong className="text-green-700">৳ {filtered.reduce((s, d) => s + d.amount, 0).toLocaleString()}</strong></span>
      </div>

      {/* ফিল্টার */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <input
          type="text"
          placeholder="নাম দিয়ে খুঁজুন"
          className="border p-2 rounded text-sm"
          value={filters.name}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
        />
        <input
          type="date"
          className="border p-2 rounded text-sm"
          value={filters.date}
          onChange={(e) => setFilters({ ...filters, date: e.target.value })}
        />
        <input
          type="number"
          placeholder="সর্বনিম্ন পরিমাণ"
          className="border p-2 rounded text-sm"
          value={filters.minAmount}
          onChange={(e) => setFilters({ ...filters, minAmount: e.target.value })}
        />
        <input
          type="number"
          placeholder="সর্বোচ্চ পরিমাণ"
          className="border p-2 rounded text-sm"
          value={filters.maxAmount}
          onChange={(e) => setFilters({ ...filters, maxAmount: e.target.value })}
        />
      </div>

      {/* টেবিল */}
      <div className="overflow-x-auto">
        <DonationTable donations={filtered} />
      </div>
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
                className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-green-50"} hover:bg-green-100 transition`}
              >
                <td className="py-3 px-2 text-sm break-words">{d.name}</td>
                <td className="py-3 px-2 text-sm">৳ {d.amount}</td>
                <td className="py-3 px-2 text-sm break-words">{d.purpose}</td>
                <td className="py-3 px-2 text-sm">{d.date}</td>
              </tr>
            ))}
            {donations.length === 0 && (
              <tr>
                <td colSpan="4" className="py-4 text-gray-500">
                  অনুদান পাওয়া যায়নি।
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
