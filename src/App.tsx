import { useEffect, useState } from "react";
import "./App.css";
import { ReactTyped } from "react-typed";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

type Theme = "light" | "dark";

// type guard to check if a value is a Theme,
// used when retrieving from localStorage
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

const getTheme = (): Theme => {
  const saved = getSavedTheme();
  if (saved) return saved;
  const prefersDark =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
};

function App() {
  const [theme, setTheme] = useState<Theme>(() => getTheme());

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    localStorage.setItem("themePref", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <div className={`app ${theme}`}>
      <div className={"header-actions"}>
        <button
          className="action-btn"
          onClick={() =>
            window.open("https://linkedin.com/in/kcornn", "_blank")
          }
          aria-label="LinkedIn profile link"
        >
          <LinkedInIcon />
        </button>
        <button
          className="action-btn"
          onClick={() => window.open("https://github.com/kcornn", "_blank")}
          aria-label="Github profile link"
        >
          <GitHubIcon />
        </button>
        <button
          className="action-btn"
          onClick={toggleTheme}
          aria-label="Toggle light/dark theme"
        >
          {theme === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </button>
      </div>

      <h1>Kali Cornn</h1>
      <ReactTyped strings={["frontend software engineer"]} typeSpeed={40} />
      <div>
        <p>hello world! portfolio in progress</p>
      </div>
    </div>
  );
}

export default App;
