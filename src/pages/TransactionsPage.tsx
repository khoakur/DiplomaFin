import { useState, useContext } from "react";
import { TransactionsContext } from "../context/TransactionsContext";
import type { Transaction } from "../context/TransactionsContext";

export default function TransactionsPage() {
  const { transactions, addTransaction } = useContext(TransactionsContext);

  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Еда");
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState("");

  const categories = ["Еда", "Транспорт", "Развлечения", "Доход", "Другое"];

  const handleAdd = () => {
    if (!description || !amount || !date) return;
    addTransaction({ date, description, category, amount });
    setDescription("");
    setAmount(0);
    setDate("");
    setCategory("Еда");
  };

  return (
    <div className="container">
      <h1>Транзакции</h1>

      {/* Форма добавления */}
      <div className="card" style={{ marginBottom: "20px" }}>
        <h3>Добавить транзакцию</h3>
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            marginTop: "10px",
          }}
        >
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{ flex: 1, padding: "6px" }}
          />
          <input
            type="text"
            placeholder="Описание"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ flex: 2, padding: "6px" }}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ flex: 1, padding: "6px" }}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Сумма"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            style={{ flex: 1, padding: "6px" }}
          />
          <button onClick={handleAdd}>Добавить</button>
        </div>
      </div>

      {/* Таблица транзакций */}
      <div className="card">
        <h3>Последние транзакции</h3>
        <table>
          <thead>
            <tr>
              <th>Дата</th>
              <th>Описание</th>
              <th>Категория</th>
              <th>Сумма (BYN)</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 && (
              <tr>
                <td colSpan={4} style={{ textAlign: "center", padding: "20px" }}>
                  Транзакций пока нет
                </td>
              </tr>
            )}
            {transactions.map((tx: Transaction) => (
              <tr key={tx.id}>
                <td>{tx.date}</td>
                <td>{tx.description}</td>
                <td>{tx.category}</td>
                <td style={{ color: tx.amount < 0 ? "#ef4444" : "#10b981" }}>
                  {tx.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}