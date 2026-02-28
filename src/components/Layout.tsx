import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <header className="header">
        <div className="logo">Finance Tracker</div>
        <nav className="nav">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/transactions">Transactions</Link>
          <Link to="/stats">Stats</Link>
          <Link to="/currency">Currency</Link>
        </nav>
        <div className="currency-select">
          <select>
            <option>BYN</option>
            <option>USD</option>
            <option>EUR</option>
          </select>
        </div>
      </header>

      <main className="container">{children}</main>
    </div>
  );
}