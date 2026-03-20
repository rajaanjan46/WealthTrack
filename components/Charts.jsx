import { useEffect, useRef } from "react";
import { CAT_COLORS } from "../constants.js";
import { formatINR } from "../utils.js";
import { styles } from "../styles.js";

export function DonutChart({ data }) {
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

export function BarChart({ data }) {
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
