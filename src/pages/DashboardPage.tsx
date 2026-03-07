import { useContext, useEffect, useState } from "react";
import { TransactionsContext } from "../context/TransactionsContext";
import ExpensesPieChart from "../components/ExpensesPieChart";
import ExpensesLineChart from "../components/ExpensesLineChart";
import TopCategories from "../components/TopCategories";
import GoalProgress from "../components/GoalProgress";

export default function DashboardPage() {
  const { transactions } = useContext(TransactionsContext);

  const [currency, setCurrency] = useState("BYN");
  const [rates, setRates] = useState<any>({ BYN: 1 });

  const [monthFilter, setMonthFilter] = useState<string>("Все");

  useEffect(() => {
    fetch("https://open.er-api.com/v6/latest/USD")
      .then((res) => res.json())
      .then((data) => setRates(data.rates))
      .catch((err) => console.log(err));
  }, []);

  // Фильтруем транзакции по выбранному месяцу
  const filteredTransactions = transactions.filter((t) => {
    if (monthFilter === "Все") return true;
    const txMonth = new Date(t.date).getMonth();
    return txMonth === Number(monthFilter);
  });

  const rate = rates[currency] || 1;

  // Доход, расход и баланс по фильтрованным транзакциям
  const income = filteredTransactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = filteredTransactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income + expense;

  const convert = (value: number) => {
    if (currency === "BYN") return value.toFixed(2);

    const bynRate = rates["BYN"];
    if (!bynRate) return "0.00";

    const valueInUsd = value / bynRate;
    const result = valueInUsd * rate;

    return result.toFixed(2);
  };

  const lastTransactions = [...filteredTransactions].slice(-5).reverse();

  return (
    <div className="container">
      <h1>Dashboard</h1>

      {/* Выбор валюты и месяца */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "20px", alignItems: "center" }}>
        <div>
          <label>Валюта: </label>
          <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="BYN">BYN</option>
          </select>
        </div>

        <div>
          <label>Месяц: </label>
          <select value={monthFilter} onChange={(e) => setMonthFilter(e.target.value)}>
            <option value="Все">Все</option>
            <option value="0">Январь</option>
            <option value="1">Февраль</option>
            <option value="2">Март</option>
            <option value="3">Апрель</option>
            <option value="4">Май</option>
            <option value="5">Июнь</option>
            <option value="6">Июль</option>
            <option value="7">Август</option>
            <option value="8">Сентябрь</option>
            <option value="9">Октябрь</option>
            <option value="10">Ноябрь</option>
            <option value="11">Декабрь</option>
          </select>
        </div>
      </div>

      {/* Статистика */}
      <div className="dashboard-cards">
        <div className="card stat">
          <h3>Баланс</h3>
          <p>{convert(balance)} {currency}</p>
        </div>

        <div className="card stat">
          <h3>Доход</h3>
          <p className="income">{convert(income)} {currency}</p>
        </div>

        <div className="card stat">
          <h3>Расход</h3>
          <p className="expense">{convert(expense)} {currency}</p>
        </div>
      </div>

      {/* График расходов */}
      <div className="card">
        <h3>Расходы по категориям</h3>
        <ExpensesPieChart transactions={filteredTransactions} />
      </div>

      {/* Последние транзакции */}
      <div className="card">
        <h3>Последние транзакции</h3>
        {lastTransactions.length === 0 && <p>Нет транзакций</p>}
        {lastTransactions.map((tx) => (
          <div key={tx.id} className="last-transaction">
            <span>{tx.description}</span>
            <span className={tx.amount < 0 ? "expense" : "income"}>
              {convert(tx.amount)} {currency}
            </span>
          </div>
        ))}
      </div>

      {/* Динамика расходов */}
      <div className="card">
        <h3>Динамика расходов</h3>
        <ExpensesLineChart transactions={filteredTransactions} />
      </div>

      {/* Топ категорий и цель накоплений */}
      <div className="dashboard-cards" style={{ gap: "20px", flexWrap: "wrap" }}>
        <div className="card" style={{ flex: "1 1 250px" }}>
          <h3>Топ категорий расходов</h3>
          <TopCategories transactions={filteredTransactions} />
        </div>

        <div className="card" style={{ flex: "1 1 250px" }}>
          <GoalProgress transactions={filteredTransactions} goal={10000} />
        </div>
      </div>
    </div>
  );
}