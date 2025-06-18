import { FaBullhorn } from "react-icons/fa";
import notices from "../data/noticeData.json";

export default function NoticeSection() {
  return (
    <section className="w-full py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white transition-colors duration-500">
      <h2 className="text-3xl font-bold text-green-700 dark:text-green-400 mb-10 text-center flex items-center justify-center gap-2">
        <FaBullhorn className="text-green-600 dark:text-green-400" />
        নোটিশ বোর্ড
      </h2>
      <div className="max-w-4xl mx-auto space-y-6 px-6">
        {notices.map((notice, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-green-600"
          >
            <h3 className="text-xl font-semibold text-green-800 dark:text-green-300 mb-2">
              {notice.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              তারিখ: {notice.date}
            </p>
            <p className="text-gray-700 dark:text-gray-200">{notice.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
