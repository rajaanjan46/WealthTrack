import { useState } from "react";
import { CAT_COLORS } from "../constants.js";
import { formatINR, relativeDate } from "../utils.js";
import { styles } from "../styles.js";

const CAT_EMOJI = {
  Food:"🍔", Rent:"🏠", Transport:"🚗", Shopping:"🛍️", Health:"🏥",
  Education:"📚", Entertainment:"🎬", Utilities:"💡", EMI:"🏦",
  Salary:"💼", Freelance:"💻", Investment:"📈", Business:"🏢",
  Gift:"🎁", Other:"📌", "Other Income":"💰",
};

export function TxItem({ tx, onEdit, onDelete }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const isIncome = tx.type === "income";
  const color    = CAT_COLORS[tx.category] || "#64748b";

  return (
    <div style={styles.txItem}>
      <div style={{ ...styles.txBar, background: color }} />

      <div style={{ ...styles.txIcon, background: color + "22", border: `1px solid ${color}44` }}>
        <span style={{ fontSize: 15 }}>{CAT_EMOJI[tx.category] || "📌"}</span>
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
