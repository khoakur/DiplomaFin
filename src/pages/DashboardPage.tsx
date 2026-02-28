import { useContext } from "react";
import DashboardCard from "../components/DashboardCard";
import { TransactionsContext } from "../context/TransactionsContext";

export default function DashboardPage() {
  const { transactions } = useContext(TransactionsContext);

  const income = transactions.filter(t => t.amount > 0).reduce((a,b)=>a+b.amount,0);
  const expense = transactions.filter(t => t.amount < 0).reduce((a,b)=>a+b.amount,0);
  const balance = income + expense;

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '30px' }}>
        <DashboardCard title="Баланс" amount={balance} color="#0ea5e9" />
        <DashboardCard title="Доход" amount={income} color="#10b981" />
        <DashboardCard title="Расход" amount={Math.abs(expense)} color="#ef4444" />
      </div>
    </div>
  );
}