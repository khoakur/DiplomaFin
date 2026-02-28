import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import DashboardPage from "../pages/DashboardPage";
import LoginPage from "../pages/LoginPage";
import TransactionsPage from "../pages/TransactionsPage";
import StatsPage from "../pages/StatsPage";
import CurrencyPage from "../pages/CurrencyPage";
import Layout from "../components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Оборачиваем все приватные страницы */}
        <Route
          path="/dashboard"
          element={
            <Layout>
              <DashboardPage />
            </Layout>
          }
        />
        <Route
          path="/transactions"
          element={
            <Layout>
              <TransactionsPage />
            </Layout>
          }
        />
        <Route
          path="/stats"
          element={
            <Layout>
              <StatsPage />
            </Layout>
          }
        />
        <Route
          path="/currency"
          element={
            <Layout>
              <CurrencyPage />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;