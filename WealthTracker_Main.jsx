import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { TransactionForm } from "./components/TransactionForm.jsx";
import { ChartSection } from "./components/ChartSection.jsx";
import { HistoryLog } from "./components/HistoryLog.jsx";
import { SummaryCards } from "./components/SummaryCards.jsx";
import { loadTransactions, saveTransactions } from "./storage.js";
import { styles } from "./styles.js";

export default function WealthTracker() {
  const [transactions, setTransactions] = useState(loadTransactions);
  const [editTx,       setEditTx]       = useState(null);
  const [toast,        setToast]        = useState(null);
  const toastTimer = useRef(null);

  useEffect(() => { saveTransactions(transactions); }, [transactions]);

  const showToast = useCallback((msg, type = "success") => {
    clearTimeout(toastTimer.current);
    setToast({ msg, type });
    toastTimer.current = setTimeout(() => setToast(null), 3200);
  }, []);

  const handleSave = useCallback((tx) => {
    setTransactions((prev) => {
      const exists = prev.some((t) => t.id === tx.id);
      return exists ? prev.map((t) => (t.id === tx.id ? tx : t)) : [tx, ...prev];
    });
    setEditTx(null);
    showToast(editTx ? "Transaction updated ✓" : "Transaction added ✓");
  }, [editTx, showToast]);

  const handleDelete = useCallback((id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    showToast("Transaction deleted", "error");
  }, [showToast]);

  const handleClearAll = useCallback(() => {
    if (window.confirm("Clear all transactions? This cannot be undone.")) {
      setTransactions([]);
      setEditTx(null);
      showToast("All data cleared", "error");
    }
  }, [showToast]);

  const { income, expense, balance, expensesByCategory } = useMemo(() => {
    let inc = 0, exp = 0;
    const catMap = {};
    transactions.forEach((t) => {
      if (t.type === "income")  inc += t.amount;
      else {
        exp += t.amount;
        catMap[t.category] = (catMap[t.category] || 0) + t.amount;
      }
    });
    const expensesByCategory = Object.entries(catMap)
      .map(([category, amount]) => ({ category, amount: parseFloat(amount.toFixed(2)) }))
      .sort((a, b) => b.amount - a.amount);
    return { income: parseFloat(inc.toFixed(2)), expense: parseFloat(exp.toFixed(2)), balance: parseFloat((inc - exp).toFixed(2)), expensesByCategory };
  }, [transactions]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; background: #0a0d14; }
        body { font-family: 'DM Sans', sans-serif; color: #f1f5f9; }
        :root {
          --green:  #22c55e;
          --red:    #f43f5e;
          --blue:   #38bdf8;
          --amber:  #f59e0b;
          --bg:     #0a0d14;
          --bg2:    #111827;
          --bg3:    #1a2332;
          --bg4:    #243044;
          --border: rgba(255,255,255,0.07);
          --t1:     #f1f5f9;
          --t2:     #64748b;
          --t3:     #334155;
          --r:      12px;
        }
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; }
        input[type=date]::-webkit-calendar-picker-indicator { filter: invert(0.5); cursor: pointer; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: var(--bg4); border-radius: 4px; }
        select option { background: #1a2332; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        @keyframes slideIn { from { opacity:0; transform:translateX(20px); } to { opacity:1; transform:translateX(0); } }
        @keyframes toastIn { from { opacity:0; transform:translateY(20px) scale(0.9); } to { opacity:1; transform:translateY(0) scale(1); } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.6; } }
      `}</style>

      {toast && (
        <div style={{
          ...styles.toast,
          background: toast.type === "error" ? "#f43f5e22" : "#22c55e22",
          borderColor: toast.type === "error" ? "#f43f5e44" : "#22c55e44",
          color:       toast.type === "error" ? "var(--red)" : "var(--green)",
        }}>
          {toast.msg}
        </div>
      )}

      <div style={styles.app}>
        <header style={styles.header}>
          <div style={styles.headerInner}>
            <div>
              <div style={styles.appTitle}>
                <span style={styles.appTitleIcon}>₹</span>
                WealthTrack
              </div>
              <div style={styles.appSubtitle}>Personal Finance Manager</div>
            </div>
            <div style={styles.headerRight}>
              <div style={styles.headerStat}>
                <span style={styles.headerStatLabel}>Transactions</span>
                <span style={styles.headerStatValue}>{transactions.length}</span>
              </div>
              <div style={styles.headerDivider} />
              <div style={styles.headerStat}>
                <span style={styles.headerStatLabel}>Net Balance</span>
                <span style={{ ...styles.headerStatValue, color: balance >= 0 ? "var(--green)" : "var(--red)" }}>
                  {balance < 0 ? "−" : ""}{balance.toLocaleString("en-IN", { style: "currency", currency: "INR" })}
                </span>
              </div>
            </div>
          </div>
        </header>

        <main style={styles.main}>
          <SummaryCards income={income} expense={expense} balance={balance} />

          <div style={styles.twoCol}>
            <div style={styles.leftCol}>
              <TransactionForm
                onSave={handleSave}
                editTx={editTx}
                onCancelEdit={() => setEditTx(null)}
              />
              <ChartSection expensesByCategory={expensesByCategory} />
            </div>

            <div style={styles.rightCol}>
              <HistoryLog
                transactions={transactions}
                onEdit={setEditTx}
                onDelete={handleDelete}
                onClear={handleClearAll}
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
