import { useState, useRef } from "react";
import { FiDownload } from "react-icons/fi";
import { useReactToPrint } from "react-to-print";

export default function DonationList() {
  const [activeTab, setActiveTab] = useState("mosque");

  const [mosqueDonations, setMosqueDonations] = useState([
    { id: 1, name: "মাহমুদুল", amount: 2000, date: "2025-06-10", purpose: "জুম্মার অনুদান" },
    { id: 2, name: "সাবিহা", amount: 1500, date: "2025-06-11", purpose: "বিদ্যুৎ বিল অনুদান" },
  ]);
  const [graveyardDonations, setGraveyardDonations] = useState([
    { id: 1, name: "রাহিম", amount: 3000, date: "2025-06-09", purpose: "মাটি ভরাট" },
    { id: 2, name: "করিমা", amount: 1000, date: "2025-06-08", purpose: "পরিচ্ছন্নতা খরচ" },
  ]);

  const [mosqueFilters, setMosqueFilters] = useState({ date: "", name: "", minAmount: "", maxAmount: "" });
  const [graveyardFilters, setGraveyardFilters] = useState({ date: "", name: "", minAmount: "", maxAmount: "" });

  const mosqueRef = useRef();
  const graveyardRef = useRef();

  const handlePrintMosque = useReactToPrint({ content: () => mosqueRef.current, documentTitle: "Mosque Donations" });
  const handlePrintGraveyard = useReactToPrint({ content: () => graveyardRef.current, documentTitle: "Graveyard Donations" });

  const filterDonations = (donations, filters) =>
    donations.filter((d) => {
      const matchDate = filters.date ? d.date === filters.date : true;
      const matchName = filters.name ? d.name.includes(filters.name) : true;
      const matchMin = filters.minAmount ? d.amount >= parseFloat(filters.minAmount) : true;
      const matchMax = filters.maxAmount ? d.amount <= parseFloat(filters.maxAmount) : true;
      return matchDate && matchName && matchMin && matchMax;
    });

  const filteredMosqueDonations = filterDonations(mosqueDonations, mosqueFilters);
  const filteredGraveyardDonations = filterDonations(graveyardDonations, graveyardFilters);

  const totalMosqueDonation = filteredMosqueDonations.reduce((sum, d) => sum + d.amount, 0);
  const totalGraveyardDonation = filteredGraveyardDonations.reduce((sum, d) => sum + d.amount, 0);

  const DonationSection = ({ title, filters, setFilters, donations, total, refProp, handlePrint }) => (
    <section>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-green-700">📋 {title}</h2>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded"
        >
          <FiDownload /> PDF ডাউনলোড
        </button>
      </div>

      <div className="text-right font-semibold text-gray-700 mb-4">
        মোট অনুদান: <span className="text-green-800">৳ {total}</span>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <input
          type="date"
          value={filters.date}
          onChange={(e) => setFilters({ ...filters, date: e.target.value })}
          className="border p-2 rounded text-sm"
        />
        <input
          type="text"
          placeholder="দাতার নাম"
          value={filters.name}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          className="border p-2 rounded text-sm"
        />
        <input
          type="number"
          placeholder="সর্বনিম্ন পরিমাণ"
          value={filters.minAmount}
          onChange={(e) => setFilters({ ...filters, minAmount: e.target.value })}
          className="border p-2 rounded text-sm"
        />
        <input
          type="number"
          placeholder="সর্বোচ্চ পরিমাণ"
          value={filters.maxAmount}
          onChange={(e) => setFilters({ ...filters, maxAmount: e.target.value })}
          className="border p-2 rounded text-sm"
        />
      </div>

      {/* Table */}
      <div ref={refProp}>
        <table className="w-full table-fixed border border-gray-200 text-sm text-left">
          <thead>
            <tr className="bg-green-100 text-gray-700">
              <th className="py-2 px-2 border w-[5%]">#</th>
              <th className="py-2 px-2 border w-[25%] break-words">দাতার নাম</th>
              <th className="py-2 px-2 border w-[15%]">পরিমাণ</th>
              <th className="py-2 px-2 border w-[20%]">তারিখ</th>
              <th className="py-2 px-2 border w-[35%] break-words">উদ্দেশ্য</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((d, index) => (
              <tr key={d.id} className="hover:bg-green-50">
                <td className="py-2 px-2 border">{index + 1}</td>
                <td className="py-2 px-2 border">{d.name}</td>
                <td className="py-2 px-2 border">৳ {d.amount}</td>
                <td className="py-2 px-2 border">{d.date}</td>
                <td className="py-2 px-2 border">{d.purpose}</td>
              </tr>
            ))}
            {donations.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">কোনো অনুদান পাওয়া যায়নি।</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );

  return (
    <div className="max-w-7xl mx-auto p-4 mt-6 bg-white shadow-md rounded-lg">
      {/* Tab Buttons */}
      <div className="flex justify-center gap-6 mb-6">
        <button
          onClick={() => setActiveTab("mosque")}
          className={`px-6 py-2 rounded font-semibold ${
            activeTab === "mosque"
              ? "bg-green-700 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-green-100"
          }`}
        >
          মসজিদের অনুদান
        </button>
        <button
          onClick={() => setActiveTab("graveyard")}
          className={`px-6 py-2 rounded font-semibold ${
            activeTab === "graveyard"
              ? "bg-green-700 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-green-100"
          }`}
        >
          কবরস্থানের অনুদান
        </button>
      </div>

      {/* Conditional Sections */}
      {activeTab === "mosque" &&
        <DonationSection
          title="মসজিদের অনুদান"
          filters={mosqueFilters}
          setFilters={setMosqueFilters}
          donations={filteredMosqueDonations}
          total={totalMosqueDonation}
          refProp={mosqueRef}
          handlePrint={handlePrintMosque}
        />
      }

      {activeTab === "graveyard" &&
        <DonationSection
          title="কবরস্থানের অনুদান"
          filters={graveyardFilters}
          setFilters={setGraveyardFilters}
          donations={filteredGraveyardDonations}
          total={totalGraveyardDonation}
          refProp={graveyardRef}
          handlePrint={handlePrintGraveyard}
        />
      }
    </div>
  );
}
