type DashboardCardProps = {
  title: string;
  amount: number;
  color?: string;
};

export default function DashboardCard({ title, amount, color }: DashboardCardProps) {
  return (
    <div className="card" style={{ borderTop: `4px solid ${color || '#38bdf8'}` }}>
      <h3>{title}</h3>
      <p style={{ fontSize: '1.5rem', fontWeight: 600, marginTop: '10px' }}>
        {amount.toLocaleString()} BYN
      </p>
    </div>
  );
}