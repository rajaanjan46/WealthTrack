import { formatINR } from "../utils.js";
import { styles } from "../styles.js";

export function SummaryCards({ income, expense, balance }) {
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

export function SummaryCard({ label, value, icon, color, sub, large }) {
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
