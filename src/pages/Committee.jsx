import { useState } from "react";
import {
  FaPhone,
  FaFacebookF,
  FaWhatsapp,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

const committeeMembers = [
  {
    id: 1,
    name: "মোঃ আনোয়ার হোসেন",
    position: "সভাপতি",
    phone: "01712345678",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "তিনি মসজিদের জন্য ১০ বছরের বেশি সময় ধরে অবদান রাখছেন। তার নেতৃত্বে বহু উন্নয়নমূলক কাজ হয়েছে।",
    facebook: "#",
    whatsapp: "01712345678",
    twitter: "#",
    linkedin: "#",
  },
  {
    id: 2,
    name: "মোঃ কামরুল হাসান",
    position: "সাধারণ সম্পাদক",
    phone: "01812345678",
    photo: "https://randomuser.me/api/portraits/men/44.jpg",
    bio: "তিনি দায়িত্ববান ও সংগঠক হিসেবে পরিচিত। সমাজসেবায় তার অনেক উদ্যোগ আছে।",
    facebook: "#",
    whatsapp: "01812345678",
    twitter: "#",
    linkedin: "#",
  },
  {
    id: 3,
    name: "সুলতান",
    position: "অর্থ সম্পাদক",
    phone: "01912345678",
    photo: "https://randomuser.me/api/portraits/men/65.jpg",
    bio: "তিনি মসজিদের আর্থিক স্বচ্ছতার জন্য কাজ করে যাচ্ছেন। খুবই বিশ্বস্ত ও অভিজ্ঞ।",
    facebook: "#",
    whatsapp: "01912345678",
    twitter: "#",
    linkedin: "#",
  },
    {
    id: 4,
    name: "সুলতান",
    position: "অর্থ সম্পাদক",
    phone: "01912345678",
    photo: "https://randomuser.me/api/portraits/men/65.jpg",
    bio: "তিনি মসজিদের আর্থিক স্বচ্ছতার জন্য কাজ করে যাচ্ছেন। খুবই বিশ্বস্ত ও অভিজ্ঞ।",
    facebook: "#",
    whatsapp: "01912345678",
    twitter: "#",
    linkedin: "#",
  },
];

export default function Committee() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMembers = committeeMembers.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-green-800 mb-2 leading-tight">
          মসজিদ কমিটির সদস্যগণ
        </h1>
        <p className="text-gray-700 max-w-2xl mx-auto text-sm sm:text-base md:text-lg mb-6 leading-relaxed">
          কমিটির সক্রিয় সদস্যদের পরিচিতি, অভিজ্ঞতা এবং যোগাযোগের তথ্য এখানে দেওয়া হলো।
        </p>

        {/* 🔍 সার্চ বক্স */}
        <input
          type="text"
          placeholder="সদস্যের নাম দিয়ে খুঁজুন..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 w-full max-w-md"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition duration-300"
          >
            <img
              src={member.photo}
              alt={member.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full mb-4 object-cover border-4 border-green-600"
              loading="lazy"
            />
            <h2 className="text-xl sm:text-2xl font-semibold text-green-700 mb-1 leading-snug">
              {member.name}
            </h2>
            <p className="text-green-600 font-medium mb-1 text-sm sm:text-base">
              {member.position}
            </p>
            <p className="text-gray-700 text-xs sm:text-sm italic mb-2 leading-relaxed">
              {member.bio}
            </p>

            <a
              href={`tel:${member.phone}`}
              className="flex items-center gap-2 text-gray-800 font-medium mb-4 hover:text-green-600 transition text-sm sm:text-base"
            >
              <FaPhone /> {member.phone}
            </a>

            <div className="flex gap-4 text-green-700 text-lg sm:text-xl">
              <a
                href={member.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <FaFacebookF className="hover:text-blue-600" />
              </a>
              <a
                href={`https://wa.me/88${member.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="hover:text-green-500" />
              </a>
              <a
                href={member.twitter}
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
              >
                <FaTwitter className="hover:text-blue-400" />
              </a>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="hover:text-blue-700" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
