export default function TopCategories({ transactions }: any) {
  const expenses = transactions.filter((t: any) => t.amount < 0 && t.category !== "Накопления");

  if (expenses.length === 0) {
    return <p style={{ textAlign: "center", padding: "10px" }}>Нет расходов</p>;
  }


  const categoryMap: any = {};
  expenses.forEach((t: any) => {
    const cat = t.category;
    categoryMap[cat] = (categoryMap[cat] || 0) + Math.abs(t.amount);
  });

  const data = Object.keys(categoryMap)
    .map((key) => ({ name: key, value: categoryMap[key] }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 3);

  // Цвета для категорий
  const COLORS = ["#3b82f6", "#10b981", "#f59e0b"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {data.map((item, index) => (
        <div key={item.name} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "15px",
            height: "15px",
            borderRadius: "50%",
            backgroundColor: COLORS[index % COLORS.length]
          }} />
          <span style={{ flex: 1 }}>{item.name}</span>
          <span>{item.value}</span>
        </div>
      ))}
    </div>
  );
}