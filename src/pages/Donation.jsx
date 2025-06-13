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

  const [mosqueFilters, setMosqueFilters] = useState({
    date: "", name: "", minAmount: "", maxAmount: "",
  });
  const [graveyardFilters, setGraveyardFilters] = useState({
    date: "", name: "", minAmount: "", maxAmount: "",
  });

  const mosqueRef = useRef();
  const graveyardRef = useRef();

  const handlePrintMosque = useReactToPrint({
    content: () => mosqueRef.current,
    documentTitle: "Mosque Donation Report",
  });
  const handlePrintGraveyard = useReactToPrint({
    content: () => graveyardRef.current,
    documentTitle: "Graveyard Donation Report",
  });

  const filterDonations = (donations, filters) => {
    return donations.filter((d) => {
      const matchDate = filters.date ? d.date === filters.date : true;
      const matchName = filters.name ? d.name.includes(filters.name) : true;
      const matchMin = filters.minAmount ? d.amount >= parseFloat(filters.minAmount) : true;
      const matchMax = filters.maxAmount ? d.amount <= parseFloat(filters.maxAmount) : true;
      return matchDate && matchName && matchMin && matchMax;
    });
  };

  const filteredMosqueDonations = filterDonations(mosqueDonations, mosqueFilters);
  const filteredGraveyardDonations = filterDonations(graveyardDonations, graveyardFilters);

  const totalMosqueDonation = filteredMosqueDonations.reduce((sum, d) => sum + d.amount, 0);
  const totalGraveyardDonation = filteredGraveyardDonations.reduce((sum, d) => sum + d.amount, 0);

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

      {/* Mosque Donations */}
      {activeTab === "mosque" && (
        <section>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold text-green-700">📋 মসজিদের অনুদান</h2>
            <button
              onClick={handlePrintMosque}
              className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded"
            >
              <FiDownload /> PDF ডাউনলোড
            </button>
          </div>

          <div className="text-right font-semibold text-gray-700 mb-4">
            মোট অনুদান: <span className="text-green-800">৳ {totalMosqueDonation}</span>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <input
              type="date"
              value={mosqueFilters.date}
              onChange={(e) => setMosqueFilters({ ...mosqueFilters, date: e.target.value })}
              className="border p-2 rounded text-sm"
            />
            <input
              type="text"
              placeholder="দাতার নাম"
              value={mosqueFilters.name}
              onChange={(e) => setMosqueFilters({ ...mosqueFilters, name: e.target.value })}
              className="border p-2 rounded text-sm"
            />
            <input
              type="number"
              placeholder="সর্বনিম্ন পরিমাণ"
              value={mosqueFilters.minAmount}
              onChange={(e) => setMosqueFilters({ ...mosqueFilters, minAmount: e.target.value })}
              className="border p-2 rounded text-sm"
            />
            <input
              type="number"
              placeholder="সর্বোচ্চ পরিমাণ"
              value={mosqueFilters.maxAmount}
              onChange={(e) => setMosqueFilters({ ...mosqueFilters, maxAmount: e.target.value })}
              className="border p-2 rounded text-sm"
            />
          </div>

          {/* Table */}
          <div ref={mosqueRef}>
            <div className="w-full flex justify-center">
            <div className="w-full ">
              <table className="min-w-full border border-gray-200 text-sm">
                <thead>
                  <tr className="bg-green-100 text-left text-gray-700">
                    <th className="py-2 px-4 border">#</th>
                    <th className="py-2 px-4 border">দাতার নাম</th>
                    <th className="py-2 px-4 border">পরিমাণ</th>
                    <th className="py-2 px-4 border">তারিখ</th>
                    <th className="py-2 px-4 border">উদ্দেশ্য</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMosqueDonations.map((d, index) => (
                    <tr key={d.id} className="hover:bg-green-50">
                      <td className="py-2 px-4 border">{index + 1}</td>
                      <td className="py-2 px-4 border">{d.name}</td>
                      <td className="py-2 px-4 border">৳ {d.amount}</td>
                      <td className="py-2 px-4 border">{d.date}</td>
                      <td className="py-2 px-4 border">{d.purpose}</td>
                    </tr>
                  ))}
                  {filteredMosqueDonations.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-gray-500">কোনো অনুদান পাওয়া যায়নি।</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            </div>
          </div>
        </section>
      )}

      {/* Graveyard Donations */}
      {activeTab === "graveyard" && (
        <section>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold text-green-700">📋 কবরস্থানের অনুদান</h2>
            <button
              onClick={handlePrintGraveyard}
              className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded"
            >
              <FiDownload /> PDF ডাউনলোড
            </button>
          </div>

          <div className="text-right font-semibold text-gray-700 mb-4">
            মোট অনুদান: <span className="text-green-800">৳ {totalGraveyardDonation}</span>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <input
              type="date"
              value={graveyardFilters.date}
              onChange={(e) => setGraveyardFilters({ ...graveyardFilters, date: e.target.value })}
              className="border p-2 rounded text-sm"
            />
            <input
              type="text"
              placeholder="দাতার নাম"
              value={graveyardFilters.name}
              onChange={(e) => setGraveyardFilters({ ...graveyardFilters, name: e.target.value })}
              className="border p-2 rounded text-sm"
            />
            <input
              type="number"
              placeholder="সর্বনিম্ন পরিমাণ"
              value={graveyardFilters.minAmount}
              onChange={(e) => setGraveyardFilters({ ...graveyardFilters, minAmount: e.target.value })}
              className="border p-2 rounded text-sm"
            />
            <input
              type="number"
              placeholder="সর্বোচ্চ পরিমাণ"
              value={graveyardFilters.maxAmount}
              onChange={(e) => setGraveyardFilters({ ...graveyardFilters, maxAmount: e.target.value })}
              className="border p-2 rounded text-sm"
            />
          </div>

          {/* Table */}
          <div ref={graveyardRef}>
            <div className="w-full flex justify-center">
            <div className="w-full">
              <table className="min-w-full border border-gray-200 text-sm">
                <thead>
                  <tr className="bg-green-100 text-left text-gray-700">
                    <th className="py-2 px-4 border">#</th>
                    <th className="py-2 px-4 border">দাতার নাম</th>
                    <th className="py-2 px-4 border">পরিমাণ</th>
                    <th className="py-2 px-4 border">তারিখ</th>
                    <th className="py-2 px-4 border">উদ্দেশ্য</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGraveyardDonations.map((d, index) => (
                    <tr key={d.id} className="hover:bg-green-50">
                      <td className="py-2 px-4 border">{index + 1}</td>
                      <td className="py-2 px-4 border">{d.name}</td>
                      <td className="py-2 px-4 border">৳ {d.amount}</td>
                      <td className="py-2 px-4 border">{d.date}</td>
                      <td className="py-2 px-4 border">{d.purpose}</td>
                    </tr>
                  ))}
                  {filteredGraveyardDonations.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-gray-500">কোনো অনুদান পাওয়া যায়নি।</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
