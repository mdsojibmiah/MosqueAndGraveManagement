import {
    FaBookOpen,
    FaMosque,
    FaPrayingHands,
    FaUserTie
} from 'react-icons/fa';

const Mosque = () => {
  return (
    <div className="w-full pt-32 min-h-screen px-4 sm:px-6 pb-16 bg-gradient-to-b from-[#0b1120] via-[#0f172a] to-[#0f172a] text-white">
      <div className="max-w-4xl mx-auto space-y-16">

        {/* Header */}
        <div className="bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600 shadow-xl rounded-xl p-6 text-center">
          <h1 className="text-4xl font-extrabold flex justify-center items-center gap-3 text-white">
            <FaMosque className="text-white text-5xl" />
            বারাপুষা উত্তরপাড়া জামে মসজিদ
          </h1>
          <p className="text-gray-100 mt-2">মসজিদ সড়ক, বারাপুষা, নাগরপুর, টাঙ্গাইল ১৯৩৬</p>
        </div>

        {/* About Mosque */}
        <section className="bg-white text-gray-900 rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-2 text-green-700">
            <FaBookOpen /> মসজিদ পরিচিতি
          </h2>
          <p>
            বারাপুষা উত্তরপাড়া জামে মসজিদ
            এখানে নিয়মিত পাঁচ ওয়াক্ত নামাজ, জুম্মার নামাজ, ইসলামী শিক্ষা কার্যক্রম এবং নানাবিধ
            সামাজিক কর্মকাণ্ড পরিচালিত হয়ে থাকে।
          </p>
        </section>

        {/* Imam Info */}
        <section className="bg-white text-gray-900 rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-2 text-green-700">
            <FaUserTie /> ইমাম সাহেব
          </h2>
          <p><span className="font-semibold">নাম:</span> মাওলানা নুরুজ্জামান</p>
          <p><span className="font-semibold">যোগাযোগ:</span> +৮৮০ ১২৩৪ ৫৬৭৮৯০</p>
        </section>

        {/* Mosque Services */}
        <section className="bg-white text-gray-900 rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-2 text-green-700">
            <FaPrayingHands /> মসজিদের সেবা সমূহ
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>মাদ্রাসা শিক্ষা কার্যক্রম</li>
            <li>হিফজুল কোরআন প্রোগ্রাম</li>
            <li>জানাজা ও দাফনের ব্যবস্থা</li>
            <li>বিয়ে/নিকাহ পরামর্শ সেবা</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Mosque;
