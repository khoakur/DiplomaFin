import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function ExpensesLineChart({ transactions }: any) {
  const expenses = transactions.filter((t: any) => t.amount < 0);

  if (expenses.length === 0) {
    return <p style={{ textAlign: "center", padding: "20px" }}>Нет расходов для отображения</p>;
  }

  const dataMap: any = {};
  expenses.forEach((t: any) => {
    dataMap[t.date] = (dataMap[t.date] || 0) + Math.abs(t.amount);
  });

  const data = Object.keys(dataMap)
    .sort() 
    .map((date) => ({ date, value: dataMap[date] }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid stroke="#444" strokeDasharray="5 5" />
        <XAxis dataKey="date" stroke="#444" />
        <YAxis stroke="#444" />
        <Tooltip contentStyle={{ backgroundColor: "#242424", border: "none", color: "#fff" }} />
        <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} />
      </LineChart>
    </ResponsiveContainer>
  );
}