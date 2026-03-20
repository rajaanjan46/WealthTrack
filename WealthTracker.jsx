import { useState, useEffect, useRef, useCallback, useMemo } from "react";

const CATEGORIES = {
  income: ["Salary", "Freelance", "Investment", "Business", "Gift", "Other Income"],
  expense: ["Food", "Rent", "Transport", "Shopping", "Health", "Education", "Entertainment", "Utilities", "EMI", "Other"],
};

const CAT_COLORS = {
  Food:          "#f97316",
  Rent:          "#8b5cf6",
  Transport:     "#06b6d4",
  Shopping:      "#ec4899",
  Health:        "#10b981",
  Education:     "#3b82f6",
  Entertainment: "#f59e0b",
  Utilities:     "#6366f1",
  EMI:           "#ef4444",
  Other:         "#64748b",
  Salary:        "#22c55e",
  Freelance:     "#a3e635",
  Investment:    "#38bdf8",
  Business:      "#fb923c",
  Gift:          "#f472b6",
  "Other Income":"#84cc16",
};

const MAX_SAFE_AMOUNT = 999_999_999_999;

const STORAGE_KEY = "wt_transactions_v1";

function loadTransactions() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveTransactions(txns) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(txns));
  } catch {
    console.warn("localStorage quota exceeded");
  }
}

function formatINR(amount, compact = false) {
  if (!isFinite(amount)) return "₹—";
  if (compact && Math.abs(amount) >= 1e7)
    return "₹" + (amount / 1e7).toFixed(2) + "Cr";
  if (compact && Math.abs(amount) >= 1e5)
    return "₹" + (amount / 1e5).toFixed(2) + "L";
  if (compact && Math.abs(amount) >= 1e3)
    return "₹" + (amount / 1e3).toFixed(2) + "K";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

function parseAmount(str) {
  const cleaned = str.replace(/,/g, "").trim();
  if (cleaned === "" || isNaN(cleaned)) return null;
  const val = parseFloat(cleaned);
  if (!isFinite(val) || val <= 0) return null;
  return val;
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function today() {
  return new Date().toISOString().split("T")[0];
}

function relativeDate(dateStr) {
  const d = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now - d) / 86400000);
  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  if (diff < 7)  return `${diff} days ago`;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function DonutChart({ data }) {
  const canvasRef = useRef(null);
  const chartRef  = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !data.length) return;

    const loadChart = async () => {
      if (!window.Chart) {
        await new Promise((resolve, reject) => {
          const s = document.createElement("script");
          s.src = "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js";
          s.onload = resolve;
          s.onerror = reject;
          document.head.appendChild(s);
        });
      }

      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }

      const ctx = canvasRef.current.getContext("2d");
      chartRef.current = new window.Chart(ctx, {
        type: "doughnut",
        data: {
          labels: data.map((d) => d.category),
          datasets: [{
            data:            data.map((d) => d.amount),
            backgroundColor: data.map((d) => CAT_COLORS[d.category] || "#64748b"),
            borderColor:     data.map((d) => CAT_COLORS[d.category] || "#64748b"),
            borderWidth: 2,
            hoverOffset: 8,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: "68%",
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx) => {
                  const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
                  const pct   = ((ctx.raw / total) * 100).toFixed(1);
                  return ` ${ctx.label}: ${formatINR(ctx.raw)} (${pct}%)`;
                },
              },
              backgroundColor: "#1e293b",
              titleColor:      "#f1f5f9",
              bodyColor:       "#94a3b8",
              borderColor:     "rgba(255,255,255,0.08)",
              borderWidth: 1,
              padding: 10,
              cornerRadius: 8,
            },
          },
          animation: { duration: 600, easing: "easeInOutQuart" },
        },
      });
    };

    loadChart().catch(console.error);
    return () => { if (chartRef.current) { chartRef.current.destroy(); chartRef.current = null; } };
  }, [data]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />;
}

function BarChart({ data }) {
  const canvasRef = useRef(null);
  const chartRef  = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !data.length) return;

    const loadChart = async () => {
      if (!window.Chart) {
        await new Promise((resolve, reject) => {
          const s = document.createElement("script");
          s.src = "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js";
          s.onload = resolve; s.onerror = reject;
          document.head.appendChild(s);
        });
      }
      if (chartRef.current) { chartRef.current.destroy(); chartRef.current = null; }

      const ctx = canvasRef.current.getContext("2d");
      chartRef.current = new window.Chart(ctx, {
        type: "bar",
        data: {
          labels: data.map((d) => d.category),
          datasets: [{
            label: "Expense",
            data:  data.map((d) => d.amount),
            backgroundColor: data.map((d) => (CAT_COLORS[d.category] || "#64748b") + "bb"),
            borderColor:     data.map((d) => CAT_COLORS[d.category] || "#64748b"),
            borderWidth: 1.5,
            borderRadius: 6,
            borderSkipped: false,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx) => ` ${formatINR(ctx.raw)}`,
              },
              backgroundColor: "#1e293b",
              titleColor: "#f1f5f9",
              bodyColor:  "#94a3b8",
              borderColor: "rgba(255,255,255,0.08)",
              borderWidth: 1,
              padding: 10,
              cornerRadius: 8,
            },
          },
          scales: {
            x: {
              ticks: { color: "#64748b", font: { size: 11, family: "'DM Sans', sans-serif" } },
              grid:  { display: false },
              border: { color: "rgba(255,255,255,0.06)" },
            },
            y: {
              ticks: {
                color: "#64748b",
                font: { size: 11, family: "'DM Sans', sans-serif" },
                callback: (v) => formatINR(v, true),
              },
              grid:  { color: "rgba(255,255,255,0.04)" },
              border: { color: "rgba(255,255,255,0.06)" },
            },
          },
          animation: { duration: 500, easing: "easeOutQuart" },
        },
      });
    };

    loadChart().catch(console.error);
    return () => { if (chartRef.current) { chartRef.current.destroy(); chartRef.current = null; } };
  }, [data]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />;
}

const EMPTY_FORM = { title: "", amount: "", category: "", type: "expense", date: today(), note: "" };

function TransactionForm({ onSave, editTx, onCancelEdit }) {
  const [form,   setForm]   = useState(editTx ? { ...editTx, amount: editTx.amount.toString() } : EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [warn,   setWarn]   = useState("");
  const titleRef = useRef(null);

  useEffect(() => {
    if (editTx) {
      setForm({ ...editTx, amount: editTx.amount.toString() });
      setErrors({});
      setWarn("");
      titleRef.current?.focus();
    }
  }, [editTx]);

  const cats = CATEGORIES[form.type] || [];

  const set = (key, val) => {
    setForm((p) => {
      const next = { ...p, [key]: val };
      if (key === "type") next.category = "";
      return next;
    });
    setErrors((e) => ({ ...e, [key]: "" }));
    if (key === "amount") setWarn("");
  };

  const validate = () => {
    const e = {};
    if (!form.title.trim())    e.title    = "Title is required";
    if (!form.amount.trim())   e.amount   = "Amount is required";
    else {
      const v = parseAmount(form.amount);
      if (v === null)          e.amount   = "Enter a valid positive number";
      else if (v > MAX_SAFE_AMOUNT) e.amount = "Amount too large (max ₹999,999,999,999)";
    }
    if (!form.category)        e.category = "Select a category";
    if (!form.date)            e.date     = "Date is required";
    return e;
  };

  const handleAmountBlur = () => {
    const v = parseAmount(form.amount);
    if (v !== null) {
      setForm((p) => ({ ...p, amount: v.toString() }));
      if (v > 1_00_00_000) setWarn("⚠️ Large amount detected — please double-check.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    const tx = {
      id:       editTx ? editTx.id : generateId(),
      title:    form.title.trim(),
      amount:   parseFloat(parseAmount(form.amount).toFixed(2)),
      category: form.category,
      type:     form.type,
      date:     form.date,
      note:     form.note.trim(),
      createdAt: editTx ? editTx.createdAt : Date.now(),
    };
    onSave(tx);
    setForm(EMPTY_FORM);
    setErrors({});
    setWarn("");
  };

  const isEdit = !!editTx;

  return (
    <form onSubmit={handleSubmit} noValidate style={styles.form}>
      <div style={styles.formHeader}>
        <span style={styles.formTitle}>{isEdit ? "✏️ Edit Transaction" : "➕ New Transaction"}</span>
        {isEdit && (
          <button type="button" onClick={onCancelEdit} style={styles.cancelBtn}>✕ Cancel</button>
        )}
      </div>

      <div style={styles.typeRow}>
        {["expense", "income"].map((t) => (
          <button
            key={t} type="button"
            onClick={() => set("type", t)}
            style={{ ...styles.typeBtn, ...(form.type === t ? (t === "income" ? styles.typeBtnIncomeActive : styles.typeBtnExpenseActive) : {}) }}
          >
            {t === "income" ? "↑ Income" : "↓ Expense"}
          </button>
        ))}
      </div>

      <div style={styles.fieldGroup}>
        <label style={styles.label}>Transaction Title *</label>
        <input
          ref={titleRef}
          value={form.title}
          onChange={(e) => set("title", e.target.value)}
          placeholder="e.g. Monthly Salary, Zomato Order"
          maxLength={80}
          style={{ ...styles.input, ...(errors.title ? styles.inputError : {}) }}
        />
        {errors.title && <span style={styles.errText}>{errors.title}</span>}
      </div>

      <div style={styles.fieldGroup}>
        <label style={styles.label}>Amount (₹) *</label>
        <div style={{ position: "relative" }}>
          <span style={styles.rupeePrefix}>₹</span>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={form.amount}
            onChange={(e) => set("amount", e.target.value)}
            onBlur={handleAmountBlur}
            placeholder="0.00"
            style={{ ...styles.input, paddingLeft: 28, ...(errors.amount ? styles.inputError : {}) }}
          />
        </div>
        {errors.amount && <span style={styles.errText}>{errors.amount}</span>}
        {warn && <span style={styles.warnText}>{warn}</span>}
      </div>

      <div style={styles.fieldGroup}>
        <label style={styles.label}>Category *</label>
        <select
          value={form.category}
          onChange={(e) => set("category", e.target.value)}
          style={{ ...styles.input, ...(errors.category ? styles.inputError : {}) }}
        >
          <option value="">Select category</option>
          {cats.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        {errors.category && <span style={styles.errText}>{errors.category}</span>}
      </div>

      <div style={styles.fieldGroup}>
        <label style={styles.label}>Date *</label>
        <input
          type="date"
          value={form.date}
          max={today()}
          onChange={(e) => set("date", e.target.value)}
          style={{ ...styles.input, ...(errors.date ? styles.inputError : {}) }}
        />
        {errors.date && <span style={styles.errText}>{errors.date}</span>}
      </div>

      <div style={styles.fieldGroup}>
        <label style={styles.label}>Note (optional)</label>
        <input
          value={form.note}
          onChange={(e) => set("note", e.target.value)}
          placeholder="Add a short note..."
          maxLength={120}
          style={styles.input}
        />
      </div>

      <button type="submit" style={styles.submitBtn}>
        {isEdit ? "💾 Save Changes" : "➕ Add Transaction"}
      </button>
    </form>
  );
}

function TxItem({ tx, onEdit, onDelete }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const isIncome = tx.type === "income";
  const color    = CAT_COLORS[tx.category] || "#64748b";

  return (
    <div style={styles.txItem}>
      <div style={{ ...styles.txBar, background: color }} />

      <div style={{ ...styles.txIcon, background: color + "22", border: `1px solid ${color}44` }}>
        <span style={{ fontSize: 15 }}>{getCatEmoji(tx.category)}</span>
      </div>

      <div style={styles.txInfo}>
        <div style={styles.txTitle}>{tx.title}</div>
        <div style={styles.txMeta}>
          <span style={{ ...styles.txCatBadge, background: color + "20", color }}>{tx.category}</span>
          <span style={styles.txDate}>{relativeDate(tx.date)}</span>
          {tx.note && <span style={styles.txNote} title={tx.note}>· {tx.note.slice(0, 30)}{tx.note.length > 30 ? "…" : ""}</span>}
        </div>
      </div>

      <div style={{ ...styles.txAmount, color: isIncome ? "var(--green)" : "var(--red)" }}>
        {isIncome ? "+" : "−"}{formatINR(tx.amount)}
      </div>

      <div style={styles.txActions}>
        {confirmDelete ? (
          <>
            <button style={styles.confirmBtn} onClick={() => onDelete(tx.id)}>Yes</button>
            <button style={styles.cancelSmallBtn} onClick={() => setConfirmDelete(false)}>No</button>
          </>
        ) : (
          <>
            <button style={styles.editBtn}   onClick={() => onEdit(tx)}               title="Edit">✏️</button>
            <button style={styles.deleteBtn} onClick={() => setConfirmDelete(true)}   title="Delete">🗑️</button>
          </>
        )}
      </div>
    </div>
  );
}

function getCatEmoji(cat) {
  const map = {
    Food:"🍔", Rent:"🏠", Transport:"🚗", Shopping:"🛍️", Health:"🏥",
    Education:"📚", Entertainment:"🎬", Utilities:"💡", EMI:"🏦",
    Salary:"💼", Freelance:"💻", Investment:"📈", Business:"🏢",
    Gift:"🎁", Other:"📌", "Other Income":"💰",
  };
  return map[cat] || "📌";
}

function SummaryCards({ income, expense, balance }) {
  return (
    <div style={styles.cardsRow}>
      <SummaryCard label="Total Income"   value={income}  icon="↑" color="var(--green)"  sub="All time earnings" />
      <SummaryCard label="Total Expenses" value={expense} icon="↓" color="var(--red)"    sub="All time spending" />
      <SummaryCard
        label="Net Balance"
        value={balance}
        icon={balance >= 0 ? "=" : "!"}
        color={balance >= 0 ? "var(--blue)" : "var(--red)"}
        sub={balance >= 0 ? "You're in surplus 🎉" : "You're in deficit ⚠️"}
        large
      />
    </div>
  );
}

function SummaryCard({ label, value, icon, color, sub, large }) {
  const absVal = Math.abs(value);
  const displayVal = formatINR(absVal, absVal >= 1e7);

  return (
    <div style={{ ...styles.summaryCard, ...(large ? styles.summaryCardLarge : {}) }}>
      <div style={{ ...styles.cardIcon, background: color + "18", color }}>{icon}</div>
      <div style={styles.cardLabel}>{label}</div>
      <div style={{ ...styles.cardValue, color, fontSize: large ? 26 : 22 }}>
        {value < 0 && label === "Net Balance" ? "−" : ""}{displayVal}
      </div>
      <div style={styles.cardSub}>{sub}</div>
    </div>
  );
}

function ChartSection({ expensesByCategory }) {
  const [chartType, setChartType] = useState("donut");
  const hasData = expensesByCategory.length > 0;
  const total   = expensesByCategory.reduce((s, d) => s + d.amount, 0);

  return (
    <div style={styles.chartCard}>
      <div style={styles.chartHeader}>
        <span style={styles.sectionTitle}>Expense Breakdown</span>
        <div style={styles.chartToggle}>
          {["donut", "bar"].map((t) => (
            <button
              key={t}
              onClick={() => setChartType(t)}
              style={{ ...styles.chartToggleBtn, ...(chartType === t ? styles.chartToggleBtnActive : {}) }}
            >
              {t === "donut" ? "🍩 Donut" : "📊 Bar"}
            </button>
          ))}
        </div>
      </div>

      {!hasData ? (
        <div style={styles.emptyChart}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>📊</div>
          <div style={{ color: "var(--t2)", fontSize: 13 }}>Add expenses to see your breakdown</div>
        </div>
      ) : (
        <div style={styles.chartBody}>
          <div style={styles.chartCanvas}>
            {chartType === "donut" ? (
              <DonutChart data={expensesByCategory} />
            ) : (
              <BarChart data={expensesByCategory} />
            )}
          </div>

          <div style={styles.legend}>
            {expensesByCategory.map((d) => {
              const pct = ((d.amount / total) * 100).toFixed(1);
              return (
                <div key={d.category} style={styles.legendItem}>
                  <div style={{ ...styles.legendDot, background: CAT_COLORS[d.category] || "#64748b" }} />
                  <div style={styles.legendLabel}>{d.category}</div>
                  <div style={styles.legendAmt}>{formatINR(d.amount, d.amount >= 1e5)}</div>
                  <div style={{ ...styles.legendPct, color: CAT_COLORS[d.category] || "#64748b" }}>{pct}%</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function HistoryLog({ transactions, onEdit, onDelete, onClear }) {
  const [search,    setSearch]    = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortBy,    setSortBy]    = useState("date_desc");

  const filtered = useMemo(() => {
    let list = [...transactions];
    if (filterType !== "all") list = list.filter((t) => t.type === filterType);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((t) =>
        t.title.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        (t.note || "").toLowerCase().includes(q)
      );
    }
    switch (sortBy) {
      case "date_desc":   list.sort((a, b) => new Date(b.date) - new Date(a.date)); break;
      case "date_asc":    list.sort((a, b) => new Date(a.date) - new Date(b.date)); break;
      case "amount_desc": list.sort((a, b) => b.amount - a.amount); break;
      case "amount_asc":  list.sort((a, b) => a.amount - b.amount); break;
    }
    return list;
  }, [transactions, filterType, search, sortBy]);

  return (
    <div style={styles.historyCard}>
      <div style={styles.historyHeader}>
        <span style={styles.sectionTitle}>Transaction History</span>
        <span style={styles.txCount}>{transactions.length} total</span>
      </div>

      <div style={styles.historyControls}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Search transactions..."
          style={styles.searchInput}
        />
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)} style={styles.controlSelect}>
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={styles.controlSelect}>
          <option value="date_desc">Newest first</option>
          <option value="date_asc">Oldest first</option>
          <option value="amount_desc">Highest amount</option>
          <option value="amount_asc">Lowest amount</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div style={styles.emptyHistory}>
          {transactions.length === 0 ? (
            <>
              <div style={{ fontSize: 52, marginBottom: 12 }}>💰</div>
              <div style={styles.emptyTitle}>Get started by adding your first transaction</div>
              <div style={styles.emptySubtitle}>Track your income and expenses to get a clear picture of your finances.</div>
            </>
          ) : (
            <>
              <div style={{ fontSize: 36, marginBottom: 8 }}>🔍</div>
              <div style={styles.emptyTitle}>No results found</div>
              <div style={styles.emptySubtitle}>Try adjusting your search or filter.</div>
            </>
          )}
        </div>
      ) : (
        <div style={styles.txList}>
          {filtered.map((tx) => (
            <TxItem key={tx.id} tx={tx} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </div>
      )}

      {transactions.length > 0 && (
        <div style={styles.clearRow}>
          <button style={styles.clearBtn} onClick={onClear}>🗑️ Clear All Data</button>
        </div>
      )}
    </div>
  );
}

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
                  {balance < 0 ? "−" : ""}{formatINR(Math.abs(balance), Math.abs(balance) >= 1e7)}
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

const styles = {
  app: {
    minHeight: "100vh",
    background: "var(--bg)",
    fontFamily: "'DM Sans', sans-serif",
  },

  header: {
    background: "var(--bg2)",
    borderBottom: "1px solid var(--border)",
    position: "sticky", top: 0, zIndex: 100,
    backdropFilter: "blur(12px)",
  },
  headerInner: {
    maxWidth: 1400, margin: "0 auto",
    padding: "14px 24px",
    display: "flex", alignItems: "center", justifyContent: "space-between",
  },
  appTitle: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: 22, fontWeight: 800,
    color: "var(--t1)", letterSpacing: "-0.5px",
    display: "flex", alignItems: "center", gap: 8,
  },
  appTitleIcon: {
    width: 34, height: 34, borderRadius: 9,
    background: "linear-gradient(135deg, #22c55e, #38bdf8)",
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    fontSize: 16, fontWeight: 900, color: "#0a0d14",
  },
  appSubtitle: {
    fontSize: 11, color: "var(--t2)", marginTop: 1,
    letterSpacing: "0.08em", textTransform: "uppercase",
  },
  headerRight: { display: "flex", alignItems: "center", gap: 20 },
  headerStat:  { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 1 },
  headerStatLabel: { fontSize: 10, color: "var(--t2)", textTransform: "uppercase", letterSpacing: "0.08em" },
  headerStatValue: { fontFamily: "'DM Mono', monospace", fontSize: 15, fontWeight: 700, color: "var(--t1)" },
  headerDivider: { width: 1, height: 32, background: "var(--border)" },

  main: {
    maxWidth: 1400, margin: "0 auto",
    padding: "24px",
    display: "flex", flexDirection: "column", gap: 20,
  },

  cardsRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1.2fr",
    gap: 14,
  },
  summaryCard: {
    background: "var(--bg2)",
    border: "1px solid var(--border)",
    borderRadius: "var(--r)",
    padding: "18px 20px",
    display: "flex", flexDirection: "column", gap: 6,
    animation: "fadeUp 0.4s ease both",
    transition: "border-color 0.2s, transform 0.2s",
    cursor: "default",
  },
  summaryCardLarge: {
    background: "linear-gradient(135deg, #111827, #1a2332)",
    border: "1px solid rgba(56,189,248,0.2)",
  },
  cardIcon: {
    width: 34, height: 34, borderRadius: 8,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontFamily: "'DM Mono',monospace", fontSize: 14, fontWeight: 700,
    marginBottom: 2,
  },
  cardLabel: { fontSize: 10, color: "var(--t2)", textTransform: "uppercase", letterSpacing: "0.1em" },
  cardValue: {
    fontFamily: "'DM Mono', monospace",
    fontWeight: 700,
    letterSpacing: "-0.5px",
    wordBreak: "break-all",
    lineHeight: 1.2,
  },
  cardSub: { fontSize: 11, color: "var(--t2)", marginTop: 2 },

  twoCol: {
    display: "grid",
    gridTemplateColumns: "380px 1fr",
    gap: 20,
    alignItems: "start",
  },
  leftCol:  { display: "flex", flexDirection: "column", gap: 16 },
  rightCol: { display: "flex", flexDirection: "column", gap: 16 },

  form: {
    background: "var(--bg2)",
    border: "1px solid var(--border)",
    borderRadius: "var(--r)",
    padding: 20,
    display: "flex", flexDirection: "column", gap: 14,
    animation: "fadeUp 0.4s ease 0.1s both",
  },
  formHeader: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    marginBottom: 2,
  },
  formTitle: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: 15, fontWeight: 700, color: "var(--t1)",
  },
  cancelBtn: {
    background: "rgba(244,63,94,0.12)", border: "1px solid rgba(244,63,94,0.25)",
    color: "var(--red)", borderRadius: 7, padding: "4px 10px",
    fontSize: 11, fontWeight: 600, cursor: "pointer",
  },
  typeRow: {
    display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8,
  },
  typeBtn: {
    padding: "9px 0", borderRadius: 8, border: "1px solid var(--border)",
    background: "var(--bg3)", color: "var(--t2)",
    fontSize: 13, fontWeight: 600, cursor: "pointer",
    transition: "all 0.18s",
  },
  typeBtnIncomeActive: {
    background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.4)",
    color: "var(--green)",
  },
  typeBtnExpenseActive: {
    background: "rgba(244,63,94,0.12)", border: "1px solid rgba(244,63,94,0.4)",
    color: "var(--red)",
  },
  fieldGroup: { display: "flex", flexDirection: "column", gap: 5 },
  label: { fontSize: 11, color: "var(--t2)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" },
  input: {
    background: "var(--bg3)", border: "1px solid var(--border)",
    borderRadius: 8, padding: "9px 12px",
    fontSize: 13, color: "var(--t1)", outline: "none", width: "100%",
    transition: "border-color 0.18s, box-shadow 0.18s",
    fontFamily: "'DM Sans', sans-serif",
  },
  inputError: { borderColor: "rgba(244,63,94,0.5)", boxShadow: "0 0 0 3px rgba(244,63,94,0.08)" },
  rupeePrefix: {
    position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)",
    color: "var(--t2)", fontSize: 13, fontWeight: 600, pointerEvents: "none",
  },
  errText:  { fontSize: 11, color: "var(--red)", marginTop: 1 },
  warnText: { fontSize: 11, color: "var(--amber)", marginTop: 1 },
  submitBtn: {
    background: "linear-gradient(135deg, #22c55e, #16a34a)",
    border: "none", borderRadius: 9, padding: "11px 0",
    color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer",
    letterSpacing: "0.02em", transition: "opacity 0.2s, transform 0.1s",
    fontFamily: "'Outfit', sans-serif",
  },

  chartCard: {
    background: "var(--bg2)", border: "1px solid var(--border)",
    borderRadius: "var(--r)", padding: 20,
    animation: "fadeUp 0.4s ease 0.2s both",
  },
  chartHeader: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    marginBottom: 16,
  },
  chartToggle: { display: "flex", gap: 6 },
  chartToggleBtn: {
    padding: "5px 11px", borderRadius: 7,
    border: "1px solid var(--border)", background: "var(--bg3)",
    color: "var(--t2)", fontSize: 11, fontWeight: 600, cursor: "pointer",
    transition: "all 0.15s",
  },
  chartToggleBtnActive: {
    background: "rgba(56,189,248,0.12)", border: "1px solid rgba(56,189,248,0.3)",
    color: "var(--blue)",
  },
  emptyChart: {
    height: 160, display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center", color: "var(--t2)",
  },
  chartBody: { display: "flex", flexDirection: "column", gap: 16 },
  chartCanvas: { height: 200, position: "relative" },
  legend: { display: "flex", flexDirection: "column", gap: 6 },
  legendItem: {
    display: "flex", alignItems: "center", gap: 8,
    padding: "6px 8px", borderRadius: 7,
    transition: "background 0.15s",
  },
  legendDot:   { width: 9, height: 9, borderRadius: "50%", flexShrink: 0 },
  legendLabel: { fontSize: 12, color: "var(--t1)", flex: 1, fontWeight: 500 },
  legendAmt:   { fontFamily: "'DM Mono',monospace", fontSize: 11.5, color: "var(--t2)", fontWeight: 500 },
  legendPct:   { fontFamily: "'DM Mono',monospace", fontSize: 11, fontWeight: 700, minWidth: 38, textAlign: "right" },
  sectionTitle: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: 15, fontWeight: 700, color: "var(--t1)",
  },

  historyCard: {
    background: "var(--bg2)", border: "1px solid var(--border)",
    borderRadius: "var(--r)", overflow: "hidden",
    animation: "fadeUp 0.4s ease 0.15s both",
  },
  historyHeader: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "16px 20px", borderBottom: "1px solid var(--border)",
  },
  txCount: {
    fontSize: 11, padding: "2px 9px", borderRadius: 20,
    background: "var(--bg3)", color: "var(--t2)",
    fontFamily: "'DM Mono',monospace",
  },
  historyControls: {
    display: "flex", gap: 8, padding: "12px 16px",
    borderBottom: "1px solid var(--border)", flexWrap: "wrap",
  },
  searchInput: {
    flex: 1, minWidth: 140,
    background: "var(--bg3)", border: "1px solid var(--border)",
    borderRadius: 8, padding: "7px 12px",
    fontSize: 12.5, color: "var(--t1)", outline: "none",
    fontFamily: "'DM Sans', sans-serif",
  },
  controlSelect: {
    background: "var(--bg3)", border: "1px solid var(--border)",
    borderRadius: 8, padding: "7px 10px",
    fontSize: 12, color: "var(--t1)", outline: "none",
    fontFamily: "'DM Sans', sans-serif", cursor: "pointer",
  },
  txList: { maxHeight: 600, overflowY: "auto" },
  txItem: {
    display: "flex", alignItems: "center", gap: 10,
    padding: "11px 16px", borderBottom: "1px solid var(--border)",
    position: "relative", transition: "background 0.15s",
    animation: "slideIn 0.25s ease both",
  },
  txBar:   { position: "absolute", left: 0, top: 0, bottom: 0, width: 3, borderRadius: "2px 0 0 2px" },
  txIcon:  { width: 34, height: 34, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  txInfo:  { flex: 1, minWidth: 0 },
  txTitle: { fontSize: 13, fontWeight: 600, color: "var(--t1)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  txMeta:  { display: "flex", alignItems: "center", gap: 6, marginTop: 3, flexWrap: "wrap" },
  txCatBadge: { fontSize: 10, padding: "1px 7px", borderRadius: 20, fontWeight: 600 },
  txDate:  { fontSize: 10, color: "var(--t2)" },
  txNote:  { fontSize: 10, color: "var(--t3)", fontStyle: "italic" },
  txAmount: {
    fontFamily: "'DM Mono', monospace",
    fontSize: 13.5, fontWeight: 700, flexShrink: 0,
    textAlign: "right", minWidth: 90,
  },
  txActions: { display: "flex", gap: 4, flexShrink: 0 },
  editBtn:   { background: "none", border: "none", cursor: "pointer", fontSize: 14, padding: "2px 4px", borderRadius: 5, transition: "background 0.15s" },
  deleteBtn: { background: "none", border: "none", cursor: "pointer", fontSize: 14, padding: "2px 4px", borderRadius: 5, transition: "background 0.15s" },
  confirmBtn:    { background: "rgba(244,63,94,0.15)", border: "1px solid rgba(244,63,94,0.35)", color: "var(--red)", borderRadius: 6, padding: "2px 8px", fontSize: 11, fontWeight: 700, cursor: "pointer" },
  cancelSmallBtn: { background: "var(--bg3)", border: "1px solid var(--border)", color: "var(--t2)", borderRadius: 6, padding: "2px 8px", fontSize: 11, fontWeight: 600, cursor: "pointer" },
  clearRow: { padding: "10px 16px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "flex-end" },
  clearBtn: {
    background: "rgba(244,63,94,0.08)", border: "1px solid rgba(244,63,94,0.2)",
    color: "var(--red)", borderRadius: 7, padding: "6px 14px",
    fontSize: 12, fontWeight: 600, cursor: "pointer",
  },

  emptyHistory: {
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    padding: "60px 20px", textAlign: "center",
  },
  emptyTitle:    { fontFamily: "'Outfit',sans-serif", fontSize: 17, fontWeight: 700, color: "var(--t1)", marginBottom: 8 },
  emptySubtitle: { fontSize: 13, color: "var(--t2)", maxWidth: 280, lineHeight: 1.6 },

  toast: {
    position: "fixed", bottom: 24, right: 24, zIndex: 9999,
    borderRadius: 10, border: "1px solid",
    padding: "11px 18px", fontSize: 13, fontWeight: 600,
    backdropFilter: "blur(12px)",
    fontFamily: "'DM Mono',monospace",
    animation: "toastIn 0.3s ease",
    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
    maxWidth: 320,
  },
};
