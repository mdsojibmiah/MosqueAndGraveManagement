import notices from '../data/notices.json';

const NoticeSection = () => {
  return (
    <section className="w-full 
 py-12 px-4 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
      {/* 🟢 Left Side */}
      <div className="h-fit">
        <div className="flex items-center gap-3 mb-4">
          {/* SVG Icon */}
          <div className="p-2 rounded-full bg-green-100">
            <svg
              className="w-6 h-6 text-green-700"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9 12h1v2H9v-2zm0-8h1v6H9V4zm10-2H1a1 1 0 00-1 1v14a1 1 0 001 1h7l2 2 2-2h7a1 1 0 001-1V3a1 1 0 00-1-1z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white">নোটিশ</h2>
        </div>

        <p className="text-gray-300 text-base leading-relaxed max-w-md">
          আমাদের মসজিদ ও কবরস্থান এলাকায় প্রতিদিনের বিভিন্ন গুরুত্বপূর্ণ নোটিশ,
          ইভেন্ট ও ধর্মীয় কার্যক্রমের তথ্য জানানো হয় এই অংশে। জুমার খুতবা,
          জানাজা, মিলাদ মাহফিল, বিশেষ দোয়া কিংবা মসজিদ সংস্কার সংক্রান্ত সকল
          ঘোষণা নিয়মিতভাবে আপডেট করা হয়। ডান পাশে আপনি সর্বশেষ নোটিশসমূহ দেখতে
          পারবেন। ইন-শা-আল্লাহ এই অংশের মাধ্যমে সবার মাঝে তথ্য আরও সহজে পৌঁছে যাবে।
        </p>
      </div>


        {/* 🔵 Right Side - Dynamic Notice Cards */}
        <div className="h-[400px] overflow-y-auto pr-2 space-y-4">
          <h2 className="text-3xl font-bold text-white text-center mb-4">নোটিশ দেখুন</h2>
          {notices.map((notice, index) => (
            <div
              key={index}
              className={`bg-gray-100 border-l-4 p-4 rounded-lg shadow-sm ${notice.color}`}
            >
              <h4 className={`text-lg font-semibold mb-1 flex items-center gap-2`}>
                <span className="text-2xl">{notice.icon}</span> {notice.title}
              </h4>
              <p className="text-sm text-gray-500 mb-1">📅 {notice.date}</p>
              <p className="text-gray-700">{notice.details}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default NoticeSection;
