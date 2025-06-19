import { useRef, useState } from "react";
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
    donations.filter(({ date, name, amount }) => {
      const matchDate = filters.date ? date === filters.date : true;
      const matchName = filters.name ? name.includes(filters.name) : true;
      const matchMin = filters.minAmount ? amount >= parseFloat(filters.minAmount) : true;
      const matchMax = filters.maxAmount ? amount <= parseFloat(filters.maxAmount) : true;
      return matchDate && matchName && matchMin && matchMax;
    });

  const filteredMosqueDonations = filterDonations(mosqueDonations, mosqueFilters);
  const filteredGraveyardDonations = filterDonations(graveyardDonations, graveyardFilters);

  const totalAmount = (donations) => donations.reduce((sum, { amount }) => sum + amount, 0);

  const inputStyle =
    "bg-[#1e293b] border border-gray-600 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-none rounded px-3 py-2 w-full";

  const DonationTable = ({ data, refProp }) => (
    <section className="w-full py-16 px-4 sm:px-8 lg:px-16 bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-lg mb-20">
      <div ref={refProp} className="w-full overflow-x-auto">
        <table className="w-full table-fixed border border-gray-300 text-sm sm:text-base text-left">
          <thead className="bg-green-100 text-gray-700">
            <tr>
              <th className="border p-2 w-6 sm:w-12">#</th>
              <th className="border p-2">দাতার নাম</th>
              <th className="border p-2">পরিমাণ (৳)</th>
              <th className="border p-2">তারিখ</th>
              <th className="border p-2">উদ্দেশ্য</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map(({ id, name, amount, date, purpose }, index) => (
                <tr key={id} className="hover:bg-green-50 text-black">
                  <td className="border p-2 text-center">{index + 1}</td>
                  <td className="border p-2 break-words">{name}</td>
                  <td className="border p-2">৳ {amount}</td>
                  <td className="border p-2">{date}</td>
                  <td className="border p-2 break-words">{purpose}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  কোনো অনুদান পাওয়া যায়নি।
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );

  return (
    <div className="pt-24 sm:pt-32 md:pt-44 px-4 sm:px-8 md:px-16 min-h-screen bg-gradient-to-b from-[#0b1120] via-[#0f172a] to-[#0f172a] text-white">
      <div className="flex justify-center mb-6 gap-4 flex-wrap">
        <button
          onClick={() => setActiveTab("mosque")}
          className={`px-6 py-2 rounded font-semibold transition-all duration-200 ${
            activeTab === "mosque"
              ? "bg-green-600 text-white shadow"
              : "bg-white text-gray-800 hover:bg-green-100"
          }`}
        >
          মসজিদের অনুদান
        </button>
        <button
          onClick={() => setActiveTab("graveyard")}
          className={`px-6 py-2 rounded font-semibold transition-all duration-200 ${
            activeTab === "graveyard"
              ? "bg-green-600 text-white shadow"
              : "bg-white text-gray-800 hover:bg-green-100"
          }`}
        >
          কবরস্থানের অনুদান
        </button>
      </div>

      {activeTab === "mosque" && (
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <h2 className="text-2xl font-bold text-green-400 text-center sm:text-left">
              📋 মসজিদের অনুদানের তালিকা
            </h2>
            <button
              onClick={handlePrintMosque}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              <FiDownload /> PDF ডাউনলোড
            </button>
          </div>

          <div className="text-right font-semibold text-green-300 mb-4">
            মোট অনুদান: <span className="text-green-500">৳ {totalAmount(filteredMosqueDonations)}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6 ">
            <input type="date" value={mosqueFilters.date} onChange={(e) => setMosqueFilters({ ...mosqueFilters, date: e.target.value })} className={inputStyle} />

            <input type="text" placeholder="দাতার নাম" value={mosqueFilters.name} onChange={(e) => setMosqueFilters({ ...mosqueFilters, name: e.target.value })} className={inputStyle} />

            <input type="number" placeholder="সর্বনিম্ন পরিমাণ" value={mosqueFilters.minAmount} onChange={(e) => setMosqueFilters({ ...mosqueFilters, minAmount: e.target.value })} className={inputStyle} />
            
            <input  type="number" placeholder="সর্বোচ্চ পরিমাণ" value={mosqueFilters.maxAmount} onChange={(e) => setMosqueFilters({ ...mosqueFilters, maxAmount: e.target.value })} className={inputStyle} />
          </div>

          <DonationTable data={filteredMosqueDonations} refProp={mosqueRef} />
        </section>
      )}

      {activeTab === "graveyard" && (
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <h2 className="text-2xl font-bold text-green-400 text-center sm:text-left">
              📋 কবরস্থানের অনুদানের তালিকা
            </h2>
            <button
              onClick={handlePrintGraveyard}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              <FiDownload /> PDF ডাউনলোড
            </button>
          </div>

          <div className="text-right font-semibold text-white mb-4">
            মোট অনুদান: <span className="text-green-500">৳ {totalAmount(filteredGraveyardDonations)}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <input type="date" value={graveyardFilters.date} onChange={(e) => setGraveyardFilters({ ...graveyardFilters, date: e.target.value })} className={inputStyle} />
            <input type="text" placeholder="দাতার নাম" value={graveyardFilters.name} onChange={(e) => setGraveyardFilters({ ...graveyardFilters, name: e.target.value })} className={inputStyle} />
            <input type="number" placeholder="সর্বনিম্ন পরিমাণ" value={graveyardFilters.minAmount} onChange={(e) => setGraveyardFilters({ ...graveyardFilters, minAmount: e.target.value })} className={inputStyle} />
            <input type="number" placeholder="সর্বোচ্চ পরিমাণ" value={graveyardFilters.maxAmount} onChange={(e) => setGraveyardFilters({ ...graveyardFilters, maxAmount: e.target.value })} className={inputStyle} />
          </div>

          <DonationTable data={filteredGraveyardDonations} refProp={graveyardRef} />
        </section>
      )}

      <footer className="mt-20 border-t border-gray-700 pt-10 pb-4 text-center text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} আমাদের মসজিদ ও কবরস্থান | সর্বস্বত্ব সংরক্ষিত</p>
      </footer>
    </div>
  );
}