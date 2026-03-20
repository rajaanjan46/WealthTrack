import { BREAKPOINTS, SPACING, Z_INDEX } from "./config.js";

export const styles = {
  app: {
    minHeight: "100vh",
    background: "var(--bg)",
    fontFamily: "'DM Sans', sans-serif",
    display: "flex",
    flexDirection: "column",
  },

  header: {
    background: "var(--bg2)",
    borderBottom: "1px solid var(--border)",
    position: "sticky",
    top: 0,
    zIndex: Z_INDEX.header,
    backdropFilter: "blur(12px)",
  },

  headerInner: {
    maxWidth: "100%",
    margin: "0 auto",
    padding: `${SPACING.md}px ${SPACING.lg}px`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: SPACING.md,
    [`@media (min-width: ${BREAKPOINTS.tablet}px)`]: {
      padding: `${SPACING.lg}px ${SPACING.xl}px`,
    },
    [`@media (min-width: ${BREAKPOINTS.desktop}px)`]: {
      maxWidth: 1400,
      padding: `14px ${SPACING.xl}px`,
    },
  },

  appTitle: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: 18,
    fontWeight: 800,
    color: "var(--t1)",
    letterSpacing: "-0.5px",
    display: "flex",
    alignItems: "center",
    gap: SPACING.xs,
    [`@media (min-width: ${BREAKPOINTS.tablet}px)`]: {
      fontSize: 20,
      gap: SPACING.sm,
    },
    [`@media (min-width: ${BREAKPOINTS.desktop}px)`]: {
      fontSize: 22,
    },
  },

  appTitleIcon: {
    width: 30,
    height: 30,
    borderRadius: 8,
    background: "linear-gradient(135deg, #22c55e, #38bdf8)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 14,
    fontWeight: 900,
    color: "#0a0d14",
    [`@media (min-width: ${BREAKPOINTS.tablet}px)`]: {
      width: 32,
      height: 32,
      fontSize: 15,
      borderRadius: 9,
    },
    [`@media (min-width: ${BREAKPOINTS.desktop}px)`]: {
      width: 34,
      height: 34,
      fontSize: 16,
    },
  },

  appSubtitle: {
    fontSize: 10,
    color: "var(--t2)",
    marginTop: 1,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    [`@media (min-width: ${BREAKPOINTS.tablet}px)`]: {
      fontSize: 11,
    },
  },

  headerRight: {
    display: "none",
    alignItems: "center",
    gap: 20,
    [`@media (min-width: ${BREAKPOINTS.tablet}px)`]: {
      display: "flex",
    },
  },

  headerStat: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 1,
  },

  headerStatLabel: {
    fontSize: 10,
    color: "var(--t2)",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },

  headerStatValue: {
    fontFamily: "'DM Mono', monospace",
    fontSize: 15,
    fontWeight: 700,
    color: "var(--t1)",
  },

  headerDivider: {
    width: 1,
    height: 32,
    background: "var(--border)",
  },

  main: {
    maxWidth: "100%",
    margin: "0 auto",
    padding: SPACING.lg,
    display: "flex",
    flexDirection: "column",
    gap: SPACING.lg,
    flex: 1,
    [`@media (min-width: ${BREAKPOINTS.tablet}px)`]: {
      padding: SPACING.xl,
      gap: SPACING.xl,
    },
    [`@media (min-width: ${BREAKPOINTS.desktop}px)`]: {
      maxWidth: 1400,
      padding: `${SPACING.xxl}px`,
      gap: SPACING.xxl,
    },
  },

  cardsRow: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: SPACING.md,
    [`@media (min-width: ${BREAKPOINTS.tablet}px)`]: {
      gridTemplateColumns: "1fr 1fr",
      gap: SPACING.lg,
    },
    [`@media (min-width: ${BREAKPOINTS.desktop}px)`]: {
      gridTemplateColumns: "1fr 1fr 1.2fr",
    },
  },

  summaryCard: {
    background: "var(--bg2)",
    border: "1px solid var(--border)",
    borderRadius: "var(--r)",
    padding: `${SPACING.md}px ${SPACING.lg}px`,
    display: "flex",
    flexDirection: "column",
    gap: SPACING.sm,
    animation: "fadeUp 0.4s ease both",
    transition: "border-color 0.2s, transform 0.2s",
    cursor: "default",
    [`@media (min-width: ${BREAKPOINTS.tablet}px)`]: {
      padding: `${SPACING.lg}px ${SPACING.xl}px`,
    },
    [`@media (min-width: ${BREAKPOINTS.desktop}px)`]: {
      padding: `${SPACING.xl}px ${SPACING.xxl}px`,
    },
  },

  summaryCardLarge: {
    background: "linear-gradient(135deg, #111827, #1a2332)",
    border: "1px solid rgba(56,189,248,0.2)",
  },

  cardIcon: {
    width: 30,
    height: 30,
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'DM Mono',monospace",
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 1,
    [`@media (min-width: ${BREAKPOINTS.tablet}px)`]: {
      width: 32,
      height: 32,
      fontSize: 13,
    },
    [`@media (min-width: ${BREAKPOINTS.desktop}px)`]: {
      width: 34,
      height: 34,
      fontSize: 14,
      marginBottom: 2,
    },
  },

  cardLabel: {
    fontSize: 10,
    color: "var(--t2)",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
  },

  cardValue: {
    fontFamily: "'DM Mono', monospace",
    fontWeight: 700,
    letterSpacing: "-0.5px",
    wordBreak: "break-all",
    lineHeight: 1.2,
    fontSize: 18,
    [`@media (min-width: ${BREAKPOINTS.tablet}px)`]: {
      fontSize: 20,
    },
    [`@media (min-width: ${BREAKPOINTS.desktop}px)`]: {
      fontSize: 22,
    },
  },

  cardSub: {
    fontSize: 11,
    color: "var(--t2)",
    marginTop: SPACING.xs,
  },

  twoCol: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: SPACING.lg,
    [`@media (min-width: ${BREAKPOINTS.tablet}px)`]: {
      gridTemplateColumns: "280px 1fr",
      gap: SPACING.xl,
      alignItems: "start",
    },
    [`@media (min-width: ${BREAKPOINTS.desktop}px)`]: {
      gridTemplateColumns: "320px 1fr",
      gap: SPACING.xxl,
    },
  },

  leftCol: {
    display: "flex",
    flexDirection: "column",
    gap: SPACING.lg,
  },

  rightCol: {
    display: "flex",
    flexDirection: "column",
    gap: SPACING.lg,
  },

  form: {
    background: "var(--bg2)",
    border: "1px solid var(--border)",
    borderRadius: "var(--r)",
    padding: SPACING.lg,
    display: "flex",
    flexDirection: "column",
    gap: SPACING.md,
    animation: "fadeUp 0.4s ease 0.1s both",
    [`@media (min-width: ${BREAKPOINTS.tablet}px)`]: {
      padding: SPACING.xl,
      gap: SPACING.lg,
    },
    [`@media (min-width: ${BREAKPOINTS.desktop}px)`]: {
      padding: SPACING.xxl,
      gap: SPACING.xl,
    },
  },

  formHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: SPACING.sm,
    flexWrap: "wrap",
    gap: SPACING.sm,
  },

  formTitle: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: 13,
    fontWeight: 700,
    color: "var(--t1)",
    [`@media (min-width: ${BREAKPOINTS.tablet}px)`]: {
      fontSize: 14,
    },
    [`@media (min-width: ${BREAKPOINTS.desktop}px)`]: {
      fontSize: 15,
    },
  },

  cancelBtn: {
    background: "rgba(244,63,94,0.12)",
    border: "1px solid rgba(244,63,94,0.25)",
    color: "var(--red)",
    borderRadius: 7,
    padding: "4px 10px",
    fontSize: 11,
    fontWeight: 600,
    cursor: "pointer",
  },

  typeRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: SPACING.sm,
  },

  typeBtn: {
    padding: "8px 0",
    borderRadius: 8,
    border: "1px solid var(--border)",
    background: "var(--bg3)",
    color: "var(--t2)",
    fontSize: 12,
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.18s",
    [`@media (min-width: ${BREAKPOINTS.tablet}px)`]: {
      padding: "9px 0",
      fontSize: 13,
    },
  },

  typeBtnIncomeActive: {
    background: "rgba(34,197,94,0.12)",
    border: "1px solid rgba(34,197,94,0.4)",
    color: "var(--green)",
  },

  typeBtnExpenseActive: {
    background: "rgba(244,63,94,0.12)",
    border: "1px solid rgba(244,63,94,0.4)",
    color: "var(--red)",
  },

  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: SPACING.xs,
  },

  label: {
    fontSize: 10,
    color: "var(--t2)",
    fontWeight: 600,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    [`@media (min-width: ${BREAKPOINTS.tablet}px)`]: {
      fontSize: 11,
    },
  },

  input: {
    background: "var(--bg3)",
    border: "1px solid var(--border)",
    borderRadius: 8,
    padding: "8px 10px",
    fontSize: 12,
    color: "var(--t1)",
    outline: "none",
    width: "100%",
    transition: "border-color 0.18s, box-shadow 0.18s",
    fontFamily: "'DM Sans', sans-serif",
    [`@media (min-width: ${BREAKPOINTS.tablet}px)`]: {
      padding: "9px 12px",
      fontSize: 13,
    },
  },

  inputError: {
    borderColor: "rgba(244,63,94,0.5)",
    boxShadow: "0 0 0 3px rgba(244,63,94,0.08)",
  },

  rupeePrefix: {
    position: "absolute",
    left: 10,
    top: "50%",
    transform: "translateY(-50%)",
    color: "var(--t2)",
    fontSize: 13,
    fontWeight: 600,
    pointerEvents: "none",
  },

  errText: {
    fontSize: 11,
    color: "var(--red)",
    marginTop: SPACING.xs,
  },

  warnText: {
    fontSize: 11,
    color: "var(--amber)",
    marginTop: SPACING.xs,
  },

  submitBtn: {
    background: "linear-gradient(135deg, #22c55e, #16a34a)",
    border: "none",
    borderRadius: 9,
    padding: "10px 0",
    color: "#fff",
    fontSize: 12,
    fontWeight: 700,
    cursor: "pointer",
    letterSpacing: "0.02em",
    transition: "opacity 0.2s, transform 0.1s",
    fontFamily: "'Outfit', sans-serif",
    [`@media (min-width: ${BREAKPOINTS.tablet}px)`]: {
      padding: "11px 0",
      fontSize: 13,
    },
  },

  chartCard: {
    background: "var(--bg2)",
    border: "1px solid var(--border)",
    borderRadius: "var(--r)",
    padding: SPACING.lg,
    animation: "fadeUp 0.4s ease 0.2s both",
    [`@media (min-width: ${BREAKPOINTS.tablet}px)`]: {
      padding: SPACING.xl,
    },
    [`@media (min-width: ${BREAKPOINTS.desktop}px)`]: {
      padding: SPACING.xxl,
    },
  },

  chartHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: SPACING.lg,
    flexWrap: "wrap",
    gap: SPACING.md,
  },

  chartToggle: {
    display: "flex",
    gap: SPACING.xs,
  },

  chartToggleBtn: {
    padding: "5px 11px",
    borderRadius: 7,
    border: "1px solid var(--border)",
    background: "var(--bg3)",
    color: "var(--t2)",
    fontSize: 11,
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.15s",
  },

  chartToggleBtnActive: {
    background: "rgba(56,189,248,0.12)",
    border: "1px solid rgba(56,189,248,0.3)",
    color: "var(--blue)",
  },

  emptyChart: {
    height: 160,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--t2)",
  },

  chartBody: {
    display: "flex",
    flexDirection: "column",
    gap: SPACING.lg,
  },

  chartCanvas: {
    height: 200,
    position: "relative",
    [`@media (min-width: ${BREAKPOINTS.tablet}px)`]: {
      height: 240,
    },
    [`@media (min-width: ${BREAKPOINTS.desktop}px)`]: {
      height: 280,
    },
  },

  legend: {
    display: "flex",
    flexDirection: "column",
    gap: SPACING.sm,
  },

  legendItem: {
    display: "grid",
    gridTemplateColumns: "auto 1fr auto auto",
    alignItems: "center",
    gap: SPACING.sm,
    padding: `${SPACING.xs}px ${SPACING.sm}px`,
    borderRadius: 7,
    transition: "background 0.15s",
    [`@media (min-width: ${BREAKPOINTS.tablet}px)`]: {
      gap: SPACING.md,
      padding: `${SPACING.sm}px ${SPACING.md}px`,
    },
  },

  legendDot: {
    width: 9,
    height: 9,
    borderRadius: "50%",
    flexShrink: 0,
  },

  legendLabel: {
    fontSize: 11,
    color: "var(--t1)",
    flex: 1,
    fontWeight: 500,
    [`@media (min-width: ${BREAKPOINTS.tablet}px)`]: {
      fontSize: 12,
    },
  },

  legendAmt: {
    fontFamily: "'DM Mono',monospace",
    fontSize: 10,
    color: "var(--t2)",
    fontWeight: 500,
    [`@media (min-width: ${BREAKPOINTS.tablet}px)`]: {
      fontSize: 11.5,
    },
  },

  legendPct: {
    fontFamily: "'DM Mono',monospace",
    fontSize: 10,
    fontWeight: 700,
    minWidth: 34,
    textAlign: "right",
    [`@media (min-width: ${BREAKPOINTS.tablet}px)`]: {
      fontSize: 11,
      minWidth: 38,
    },
  },

  sectionTitle: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: 13,
    fontWeight: 700,
    color: "var(--t1)",
    [`@media (min-width: ${BREAKPOINTS.tablet}px)`]: {
      fontSize: 14,
    },
    [`@media (min-width: ${BREAKPOINTS.desktop}px)`]: {
      fontSize: 15,
    },
  },

  historyCard: {
    background: "var(--bg2)",
    border: "1px solid var(--border)",
    borderRadius: "var(--r)",
    overflow: "hidden",
    animation: "fadeUp 0.4s ease 0.15s both",
    display: "flex",
    flexDirection: "column",
  },

  historyHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: `${SPACING.lg}px ${SPACING.xl}px`,
    borderBottom: "1px solid var(--border)",
    flexWrap: "wrap",
    gap: SPACING.md,
  },

  txCount: {
    fontSize: 11,
    padding: "2px 9px",
    borderRadius: 20,
    background: "var(--bg3)",
    color: "var(--t2)",
    fontFamily: "'DM Mono',monospace",
  },

  historyControls: {
    display: "flex",
    flexDirection: "column",
    gap: SPACING.sm,
    padding: `${SPACING.md}px ${SPACING.lg}px`,
    borderBottom: "1px solid var(--border)",
    [`@media (min-width: ${BREAKPOINTS.tablet}px)`]: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: SPACING.md,
    },
  },

  searchInput: {
    flex: 1,
    minWidth: "100%",
    background: "var(--bg3)",
    border: "1px solid var(--border)",
    borderRadius: 8,
    padding: "7px 12px",
    fontSize: 12,
    color: "var(--t1)",
    outline: "none",
    fontFamily: "'DM Sans', sans-serif",
    [`@media (min-width: ${BREAKPOINTS.tablet}px)`]: {
      minWidth: 200,
    },
  },

  controlSelect: {
    background: "var(--bg3)",
    border: "1px solid var(--border)",
    borderRadius: 8,
    padding: "7px 10px",
    fontSize: 11,
    color: "var(--t1)",
    outline: "none",
    fontFamily: "'DM Sans', sans-serif",
    cursor: "pointer",
    [`@media (min-width: ${BREAKPOINTS.tablet}px)`]: {
      fontSize: 12,
    },
  },

  txList: {
    maxHeight: "calc(100vh - 300px)",
    overflowY: "auto",
    flex: 1,
  },

  txItem: {
    display: "grid",
    gridTemplateColumns: "30px 1fr auto auto",
    gap: SPACING.sm,
    padding: `${SPACING.md}px ${SPACING.lg}px`,
    borderBottom: "1px solid var(--border)",
    position: "relative",
    transition: "background 0.15s",
    animation: "slideIn 0.25s ease both",
    alignItems: "center",
    [`@media (min-width: ${BREAKPOINTS.tablet}px)`]: {
      gridTemplateColumns: "3px 34px 1fr auto auto",
      gap: SPACING.md,
      padding: `${SPACING.lg}px ${SPACING.xl}px`,
    },
  },

  txBar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
    borderRadius: "2px 0 0 2px",
  },

  txIcon: {
    width: 30,
    height: 30,
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    [`@media (min-width: ${BREAKPOINTS.tablet}px)`]: {
      width: 34,
      height: 34,
      borderRadius: 9,
    },
  },

  txInfo: {
    flex: 1,
    minWidth: 0,
  },

  txTitle: {
    fontSize: 12,
    fontWeight: 600,
    color: "var(--t1)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    [`@media (min-width: ${BREAKPOINTS.tablet}px)`]: {
      fontSize: 13,
    },
  },

  txMeta: {
    display: "flex",
    alignItems: "center",
    gap: SPACING.xs,
    marginTop: SPACING.xs,
    flexWrap: "wrap",
  },

  txCatBadge: {
    fontSize: 10,
    padding: "1px 7px",
    borderRadius: 20,
    fontWeight: 600,
  },

  txDate: {
    fontSize: 10,
    color: "var(--t2)",
  },

  txNote: {
    fontSize: 10,
    color: "var(--t3)",
    fontStyle: "italic",
  },

  txAmount: {
    fontFamily: "'DM Mono', monospace",
    fontSize: 12,
    fontWeight: 700,
    textAlign: "right",
    minWidth: 70,
    [`@media (min-width: ${BREAKPOINTS.tablet}px)`]: {
      fontSize: 13.5,
      minWidth: 90,
    },
  },

  txActions: {
    display: "flex",
    gap: SPACING.xs,
    flexShrink: 0,
  },

  editBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: 13,
    padding: "2px 3px",
    borderRadius: 5,
    transition: "background 0.15s",
    [`@media (min-width: ${BREAKPOINTS.tablet}px)`]: {
      fontSize: 14,
      padding: "2px 4px",
    },
  },

  deleteBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: 13,
    padding: "2px 3px",
    borderRadius: 5,
    transition: "background 0.15s",
    [`@media (min-width: ${BREAKPOINTS.tablet}px)`]: {
      fontSize: 14,
      padding: "2px 4px",
    },
  },

  confirmBtn: {
    background: "rgba(244,63,94,0.15)",
    border: "1px solid rgba(244,63,94,0.35)",
    color: "var(--red)",
    borderRadius: 6,
    padding: "2px 8px",
    fontSize: 11,
    fontWeight: 700,
    cursor: "pointer",
  },

  cancelSmallBtn: {
    background: "var(--bg3)",
    border: "1px solid var(--border)",
    color: "var(--t2)",
    borderRadius: 6,
    padding: "2px 8px",
    fontSize: 11,
    fontWeight: 600,
    cursor: "pointer",
  },

  clearRow: {
    padding: `${SPACING.md}px ${SPACING.lg}px`,
    borderTop: "1px solid var(--border)",
    display: "flex",
    justifyContent: "flex-end",
  },

  clearBtn: {
    background: "rgba(244,63,94,0.08)",
    border: "1px solid rgba(244,63,94,0.2)",
    color: "var(--red)",
    borderRadius: 7,
    padding: "6px 14px",
    fontSize: 12,
    fontWeight: 600,
    cursor: "pointer",
  },

  emptyHistory: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: `${SPACING.xxl}px ${SPACING.lg}px`,
    textAlign: "center",
    flex: 1,
    [`@media (min-width: ${BREAKPOINTS.tablet}px)`]: {
      padding: "60px 20px",
    },
  },

  emptyTitle: {
    fontFamily: "'Outfit',sans-serif",
    fontSize: 15,
    fontWeight: 700,
    color: "var(--t1)",
    marginBottom: SPACING.md,
    [`@media (min-width: ${BREAKPOINTS.tablet}px)`]: {
      fontSize: 17,
      marginBottom: SPACING.lg,
    },
  },

  emptySubtitle: {
    fontSize: 12,
    color: "var(--t2)",
    maxWidth: 280,
    lineHeight: 1.6,
    [`@media (min-width: ${BREAKPOINTS.tablet}px)`]: {
      fontSize: 13,
    },
  },

  toast: {
    position: "fixed",
    bottom: SPACING.lg,
    right: SPACING.lg,
    zIndex: Z_INDEX.notification,
    borderRadius: 10,
    border: "1px solid",
    padding: `${SPACING.md}px ${SPACING.lg}px`,
    fontSize: 12,
    fontWeight: 600,
    backdropFilter: "blur(12px)",
    fontFamily: "'DM Mono',monospace",
    animation: "toastIn 0.3s ease",
    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
    maxWidth: "calc(100% - 32px)",
    [`@media (min-width: ${BREAKPOINTS.tablet}px)`]: {
      padding: `${SPACING.lg}px ${SPACING.xl}px`,
      fontSize: 12.5,
    },
    [`@media (min-width: ${BREAKPOINTS.desktop}px)`]: {
      padding: `${SPACING.lg}px ${SPACING.xxl}px`,
      fontSize: 13,
      maxWidth: 320,
    },
  },
};
