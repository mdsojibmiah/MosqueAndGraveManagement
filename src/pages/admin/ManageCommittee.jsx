// src/pages/admin/ManageCommittee.jsx

import CommitteeForm from "../../components/admin/CommitteeForm";
import { FaUserTie } from "react-icons/fa";
import Sidebar from "../../components/admin/Sidebar";
import Header from "../../components/admin/Header";

export default function ManageCommittee() {
  return (
<div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <Sidebar/>
  <div className="p-6 w-full max-w-2xl bg-white rounded-lg shadow">
    <Header/>
    <h2 className="text-2xl font-bold text-green-700 mb-6 mt-16 flex items-center gap-2 justify-center">
      <FaUserTie className="text-green-700" />
      কমিটি মেম্বার যোগ/পরিবর্তন
    </h2>
    <CommitteeForm />
  </div>
</div>

  );
}
