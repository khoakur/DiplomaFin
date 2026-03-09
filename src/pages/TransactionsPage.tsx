import { useState, useContext } from "react";
import { TransactionsContext } from "../context/TransactionsContext";
import type { Transaction } from "../context/TransactionsContext";

export default function TransactionsPage() {
  const { transactions, addTransaction, deleteTransaction, updateTransaction } =
    useContext(TransactionsContext);

  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Еда");
  const [amount, setAmount] = useState<string>("");
  const [date, setDate] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);

  const [filterCategory, setFilterCategory] = useState("Все");
  const [filterType, setFilterType] = useState("Все");

  const categories = ["Еда", "Транспорт", "Развлечения", "Доход", "Другое", "Накопления"];

  const handleAdd = () => {
    if (!description || !amount || !date) return;

    addTransaction({ date, description, category, amount: Number(amount) });

    setDescription("");
    setAmount("");
    setDate("");
    setCategory("Еда");
  };

  const startEdit = (tx: Transaction) => {
    setEditingId(tx.id);
    setDescription(tx.description);
    setCategory(tx.category);
    setAmount(tx.amount.toString());
    setDate(tx.date);
  };

  const saveEdit = () => {
    if (editingId === null) return;

    updateTransaction({
      id: editingId,
      description,
      category,
      amount: Number(amount),
      date,
    });

    setEditingId(null);
    setDescription("");
    setAmount("");
    setDate("");
  };

  const filteredTransactions = transactions.filter((t) => {
    let pass = true;
    if (filterCategory !== "Все") pass = pass && t.category === filterCategory;
    if (filterType === "Доход") pass = pass && t.amount > 0;
    if (filterType === "Расход") pass = pass && t.amount < 0;
    return pass;
  });

  // Экспорт CSV
  const exportToCSV = () => {
    if (filteredTransactions.length === 0) return;

    const headers = ["Дата", "Описание", "Категория", "Сумма"];

    const rows = filteredTransactions.map((t) => [
      t.date,
      t.description,
      t.category,
      t.amount.toString(),
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.join(";"))
      .join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], {
  type: "text/csv;charset=utf-8;",
});

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="container">
      <h1>Транзакции</h1>

      <div className="card">
        <h3>{editingId ? "Редактировать транзакцию" : "Добавить транзакцию"}</h3>

        <div className="form">
          <input
            className="input"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <input
            className="input"
            type="text"
            placeholder="Описание"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <select
            className="input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>

          <input
            className="input"
            type="number"
            placeholder="Сумма"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          {editingId ? (
            <button className="btn save" onClick={saveEdit}>
              Сохранить
            </button>
          ) : (
            <button className="btn add" onClick={handleAdd}>
              Добавить
            </button>
          )}
        </div>
      </div>

      {/* Фильтры */}
      <div className="card" style={{ marginBottom: "20px" }}>
        <h3>Фильтры</h3>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "10px" }}>
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            <option>Все</option>
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>

          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option>Все</option>
            <option>Доход</option>
            <option>Расход</option>
          </select>

          <button className="btn" onClick={exportToCSV}>
            ⬇ Скачать CSV
          </button>
        </div>
      </div>

      <div className="card">
        <h3>Все транзакции</h3>

        <table className="transactions-table">
          <thead>
            <tr>
              <th>Дата</th>
              <th>Описание</th>
              <th>Категория</th>
              <th>Сумма</th>
              <th>Действия</th>
            </tr>
          </thead>

          <tbody>
            {filteredTransactions.map((tx) => (
              <tr key={tx.id}>
                <td>{tx.date}</td>
                <td>{tx.description}</td>
                <td>{tx.category}</td>

                <td className={tx.amount < 0 ? "expense" : "income"}>
                  {tx.amount}
                </td>

                <td className="actions">
                  <button className="btn edit" onClick={() => startEdit(tx)}>
                    ✏
                  </button>

                  <button
                    className="btn delete"
                    onClick={() => deleteTransaction(tx.id)}
                  >
                    🗑
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}