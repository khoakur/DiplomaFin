export default function GoalProgress({ transactions, goal }: any) {
const savings = transactions
  .filter((t: any) => t.category === "Накопления" && t.amount < 0)
  .reduce((acc: number, t: any) => acc + Math.abs(t.amount), 0);

  const progress = Math.min((savings / goal) * 100, 100);

  return (
    <div style={{ padding: "10px" }}>
      <h3>Цель накоплений</h3>
      <p>Накоплено: {savings} / {goal}</p>
      <div style={{
        background: "#444",
        borderRadius: "8px",
        height: "20px",
        width: "100%",
        marginTop: "5px",
        overflow: "hidden"
      }}>
        <div style={{
          width: `${progress}%`,
          height: "100%",
          background: "#10b981"
        }} />
      </div>
    </div>
  );
}