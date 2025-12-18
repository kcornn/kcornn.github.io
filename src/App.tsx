import { useEffect, useState } from "react";
import { motion } from "motion/react";
import "./App.css";
import { Accordion } from "./components";
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

  const sectionShadow =
    theme === "dark"
      ? "0 20px 30px rgba(0, 0, 0, 0.6)"
      : "0 20px 30px rgba(2, 6, 23, 0.06)";

  const baseAnim = {
    initial: { opacity: 0, y: 30, boxShadow: "0 0 0 rgba(0,0,0,0)" },
    whileInView: { opacity: 1, y: 0, boxShadow: sectionShadow },
    viewport: { once: true, amount: 0.2 },
  } as const;

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

      <motion.section
        id="experience"
        className="section"
        {...baseAnim}
        transition={{ duration: 0.6 }}
      >
        <h2>Experience</h2>
        <p>Past work experience</p>
      </motion.section>

      <motion.section
        id="research"
        className="section"
        {...baseAnim}
        transition={{ duration: 0.6, delay: 0.08 }}
      >
        <h2>Research</h2>
        <h3>Publications</h3>
        <p>
          Alpers, B.S., <span className="author-emphasis">Cornn, K.</span>,
          Feitzinger, L.E., Khaliq, U., Park, S.Y., Beigi, B., Hills-Bunnell,
          D.J., et al. (2020). Capturing Passenger Experience in a Ride-Sharing
          Autonomous Vehicle: The Role of Digital Assistants in User Interface
          Design. In 12th International Conference on Automotive User Interfaces
          and Interactive Vehicular Applications (AutomotiveUI '20). Association
          for Computing Machinery, New York, NY, USA, 83–93.
        </p>
      </motion.section>

      <motion.section
        id="education"
        className="section"
        {...baseAnim}
        transition={{ duration: 0.6, delay: 0.16 }}
      >
        <h2>Education</h2>
        <p>
          Stanford University, M.S. in Statistics, January 2018 - August 2019
        </p>
        <p>
          Stanford University, B.S. in Computer Science, September 2014 - June
          2018
        </p>
        <Accordion
          title="Selected coursework"
          items={[
            "CS 142: Web Applications",
            "CS 224N: Natural Language Processing with Deep Learning",
            "CS 224U: Natural Language Understanding",
            "CS 229: Machine Learning",
            "CS 229A: Applied Machine Learning",
            "CS 230: Deep Learning",
            "CS 231N: Convolutional Neural Networks for Visual Recognition",
            "CS 448B: Data Visualization",
            "STATS 141: Biostatistics",
            "STATS 202: Data Mining and Analysis",
            "STATS 216: Introduction to Statistical Learning",
            "STATS 245: Data, Models and Applications to Healthcare Analytics",
            "STATS 290: Computing for Data Science",
          ]}
        />
      </motion.section>
    </div>
  );
}

export default App;
