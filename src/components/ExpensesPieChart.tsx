import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function ExpensesPieChart({ transactions }: any) {
  const expenses = transactions.filter((t: any) => t.amount < 0);

  if (expenses.length === 0) {
    return <p style={{ textAlign: "center", padding: "20px" }}>Нет расходов для отображения</p>;
  }

  const categoryMap: any = {};

  expenses.forEach((t: any) => {
    const cat = t.category;
    categoryMap[cat] = (categoryMap[cat] || 0) + Math.abs(t.amount);
  });

  const data = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key]
  }));

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

  return (
    <PieChart width={350} height={300}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        outerRadius={100}
        label
      >
        {data.map((entry: any, index: number) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>

      <Tooltip />
      <Legend />
    </PieChart>
  );
}