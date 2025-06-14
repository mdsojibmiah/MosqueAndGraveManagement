// src/components/admin/Header.jsx

export default function Header() {
  return (
    <header className="w-full md:w-[calc(100%-16rem)] bg-white shadow-md py-4 px-6 fixed top-0 left-0 md:left-64 z-20 flex justify-between items-center">
      <div className="text-xl font-semibold text-green-800">
        Welcome Admin
      </div>
    </header>
  );
}
