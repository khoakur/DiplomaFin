import { useEffect, useState } from "react";

export default function CurrencyPage() {
  const [rates, setRates] = useState<any>({});
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("BYN");
  const [result, setResult] = useState(0);
  const [lastUpdate, setLastUpdate] = useState("");

  const currencies = ["USD", "EUR", "BYN", "RUB", "PLN"];

  const fetchRates = () => {
    fetch("https://open.er-api.com/v6/latest/USD")
      .then((res) => res.json())
      .then((data) => {
        setRates(data.rates);
        setLastUpdate(new Date().toLocaleTimeString());
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchRates();
  }, []);

  useEffect(() => {
    if (!rates[from] || !rates[to]) return;

    const usdValue = amount / rates[from];
    const converted = usdValue * rates[to];

    setResult(converted);
  }, [amount, from, to, rates]);

  const swapCurrencies = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  return (
    <div className="container">
      <h1>Currency</h1>

      {/* Конвертер */}
      <div className="card">
        <h3>Конвертер валют</h3>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="input"
          />

          <select value={from} onChange={(e) => setFrom(e.target.value)}>
            {currencies.map((cur) => (
              <option key={cur}>{cur}</option>
            ))}
          </select>

          <button className="btn" onClick={swapCurrencies}>
            🔄
          </button>

          <select value={to} onChange={(e) => setTo(e.target.value)}>
            {currencies.map((cur) => (
              <option key={cur}>{cur}</option>
            ))}
          </select>
        </div>

        <h2 style={{ marginTop: "20px" }}>
          {result.toFixed(2)} {to}
        </h2>
      </div>

      {/* Быстрые конверсии */}
      <div className="card">
        <h3>Быстрые конверсии</h3>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button className="btn" onClick={() => { setFrom("USD"); setTo("BYN"); }}>
            USD → BYN
          </button>

          <button className="btn" onClick={() => { setFrom("EUR"); setTo("BYN"); }}>
            EUR → BYN
          </button>

          <button className="btn" onClick={() => { setFrom("USD"); setTo("EUR"); }}>
            USD → EUR
          </button>
        </div>
      </div>

      {/* Таблица курсов */}
      <div className="card">
        <h3>Актуальные курсы</h3>

        <button className="btn" onClick={fetchRates}>
          ⟳ Обновить
        </button>

        <p style={{ marginTop: "10px", fontSize: "14px", opacity: 0.7 }}>
          Последнее обновление: {lastUpdate || "—"}
        </p>

        <table className="transactions-table" style={{ marginTop: "15px" }}>
          <thead>
            <tr>
              <th>Валюта</th>
              <th>Курс к USD</th>
            </tr>
          </thead>

          <tbody>
            {Object.keys(rates)
              .filter((cur) => currencies.includes(cur))
              .map((cur) => (
                <tr key={cur}>
                  <td>{cur}</td>
                  <td>{rates[cur]}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}