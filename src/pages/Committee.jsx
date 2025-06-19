import { useState } from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaPhone,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import members from "../data/committeeMembers.json";

export default function Committee() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="w-full min-h-screen px-4 sm:px-6 py-16 pt-40 space-y-24 bg-gradient-to-b from-[#0b1120] via-[#0f172a] to-[#0f172a] text-white">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-green-500 mb-4">
          মসজিদ কমিটির সদস্যগণ
        </h1>
        <p className="text-white max-w-2xl mx-auto text-base sm:text-lg mb-6 leading-relaxed">
          এখানে মসজিদ কমিটির গুরুত্বপূর্ণ সদস্যদের পরিচয় ও যোগাযোগের তথ্য দেওয়া হলো।
        </p>
        <input
          type="text"
          placeholder="সদস্যের নাম দিয়ে খুঁজুন..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-green-500 w-full max-w-md text-black"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="bg-[#f9f9f9] text-gray-800 rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-2xl hover:scale-[1.02] transition duration-300 border-t-4 border-green-600"
          >
            <img
              src={member.photo}
              alt={member.name}
              className="w-24 h-24 rounded-full mb-4 object-cover border-4 border-green-500"
              loading="lazy"
            />
            <h2 className="text-xl font-semibold text-green-800 mb-1">
              {member.name}
            </h2>
            <p className="text-green-700 font-medium mb-1">{member.position}</p>
            <p className="text-gray-600 text-sm italic mb-3">{member.bio}</p>
            <a
              href={`tel:${member.phone}`}
              className="flex items-center gap-2 text-sm text-gray-700 mb-3 hover:text-green-600"
            >
              <FaPhone /> {member.phone}
            </a>

            <div className="flex gap-3 text-green-600 text-lg">
              <a href={member.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
                <FaFacebookF className="hover:text-blue-600" />
              </a>
              <a href={`https://wa.me/88${member.whatsapp}`} target="_blank" rel="noreferrer" aria-label="WhatsApp">
                <FaWhatsapp className="hover:text-green-500" />
              </a>
              <a href={member.twitter} target="_blank" rel="noreferrer" aria-label="Twitter">
                <FaTwitter className="hover:text-blue-400" />
              </a>
              <a href={member.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <FaLinkedinIn className="hover:text-blue-700" />
              </a>
            </div>
          </div>
        ))}
      </div>

      <footer className="mt-20 border-t border-gray-700 pt-10 text-center text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} আমাদের মসজিদ ও কবরস্থান | সর্বস্বত্ব সংরক্ষিত</p>
      </footer>
    </section>
  );
}