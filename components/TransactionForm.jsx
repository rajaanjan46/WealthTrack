import { useState, useEffect, useRef } from "react";
import { CATEGORIES, MAX_SAFE_AMOUNT } from "../constants.js";
import { parseAmount, generateId, today } from "../utils.js";
import { styles } from "../styles.js";

const EMPTY_FORM = { title: "", amount: "", category: "", type: "expense", date: today(), note: "" };

export function TransactionForm({ onSave, editTx, onCancelEdit }) {
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
