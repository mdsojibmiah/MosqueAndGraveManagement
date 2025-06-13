// src/pages/admin/Dashboard.jsx
import Sidebar from "../../components/admin/Sidebar";
import Header from "../../components/admin/Header";

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-0 md:ml-64">
        <Header />
        <main className="mt-20 p-6">
          <h1 className="text-3xl font-bold text-green-700 mb-4">📊 Admin Dashboard</h1>
          <p className="text-gray-600">এখান থেকে আপনি অনুদান, খরচ এবং কমিটি ম্যানেজ করতে পারবেন।</p>
        </main>
      </div>
    </div>
  );
}
