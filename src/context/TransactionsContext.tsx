import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

export type Transaction = {
  id: number;
  date: string;
  description: string;
  category: string;
  amount: number;
};

type TransactionsContextType = {
  transactions: Transaction[];
  addTransaction: (tx: Omit<Transaction, "id">) => void;
  deleteTransaction: (id: number) => void;
  updateTransaction: (tx: Transaction) => void;
};

export const TransactionsContext = createContext<TransactionsContextType>({
  transactions: [],
  addTransaction: () => {},
  deleteTransaction: () => {},
  updateTransaction: () => {},
});

export default function TransactionsProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const stored = localStorage.getItem("transactions");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (tx: Omit<Transaction, "id">) => {
    const newTx: Transaction = { id: Date.now(), ...tx };
    setTransactions([newTx, ...transactions]);
  };

  const deleteTransaction = (id: number) => {
    setTransactions(transactions.filter((tx) => tx.id !== id));
  };

  const updateTransaction = (updatedTx: Transaction) => {
    setTransactions(
      transactions.map((tx) =>
        tx.id === updatedTx.id ? updatedTx : tx
      )
    );
  };

  return (
    <TransactionsContext.Provider
      value={{ transactions, addTransaction, deleteTransaction, updateTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}