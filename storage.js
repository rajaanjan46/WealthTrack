import { STORAGE_KEY } from "./constants.js";

export function loadTransactions() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveTransactions(txns) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(txns));
  } catch {
    console.warn("localStorage quota exceeded");
  }
}
