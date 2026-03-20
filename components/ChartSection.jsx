import { useState } from "react";
import { DonutChart, BarChart } from "./Charts.jsx";
import { CAT_COLORS } from "../constants.js";
import { formatINR } from "../utils.js";
import { styles } from "../styles.js";

export function ChartSection({ expensesByCategory }) {
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
