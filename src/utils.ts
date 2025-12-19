import type { Theme } from "./types";

// type guard to check if a value is a Theme,
// used when retrieving themePref from localStorage
const isTheme = (v: unknown): v is Theme => {
  return v === "light" || v === "dark";
};

const getSavedTheme = (): Theme | null => {
  if (typeof window === "undefined") return null;
  try {
    const v = localStorage.getItem("themePref");
    return isTheme(v) ? v : null;
  } catch {
    return null;
  }
};

export const getTheme = (): Theme => {
  const saved = getSavedTheme();
  if (saved) return saved;
  const prefersDark =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
};
