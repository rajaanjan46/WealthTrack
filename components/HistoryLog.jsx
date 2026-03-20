import { useState, useMemo } from "react";
import { TxItem } from "./TxItem.jsx";
import { styles } from "../styles.js";

export function HistoryLog({ transactions, onEdit, onDelete, onClear }) {
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
