export function formatINR(amount, compact = false) {
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

export function parseAmount(str) {
  const cleaned = str.replace(/,/g, "").trim();
  if (cleaned === "" || isNaN(cleaned)) return null;
  const val = parseFloat(cleaned);
  if (!isFinite(val) || val <= 0) return null;
  return val;
}

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export function today() {
  return new Date().toISOString().split("T")[0];
}

export function relativeDate(dateStr) {
  const d = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now - d) / 86400000);
  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  if (diff < 7)  return `${diff} days ago`;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}
