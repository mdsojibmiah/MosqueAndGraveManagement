import Sidebar from "../../components/admin/Sidebar";
import Header from "../../components/admin/Header";
import ExpenseForm from "../../components/admin/ExpenseForm";


export default function AddExpense() {
  return (
<div className="flex min-h-screen bg-gray-50">
  <Sidebar />
  <div className="flex-1 flex flex-col">
    <Header />

    <main className="flex-1 flex items-center justify-center px-4 py-8">
      <ExpenseForm />
    </main>
  </div>
</div>

  );
}
