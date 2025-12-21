import { useEffect, useState } from "react";
import { motion } from "motion/react";
import "./App.css";
import { Accordion, ActionBtn } from "./components";
import type { Theme } from "./types";
import { getTheme } from "./utils";
import { ReactTyped } from "react-typed";
import CloseIcon from "@mui/icons-material/Close";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function App() {
  const [theme, setTheme] = useState<Theme>(() => getTheme());

  /* MOBILE BANNER */
  const [showMobileBanner, setShowMobileBanner] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    try {
      const dismissed = localStorage.getItem("hideMobileBanner");
      return dismissed === "true" ? false : window.innerWidth <= 640;
    } catch {
      return false;
    }
  });

  const dismissMobileBanner = () => {
    localStorage.setItem("hideMobileBanner", "true"); // can only set strings
    setShowMobileBanner(false);
  };

  /* THEME TOGGLING */
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
    transition: { duration: 0.6 },
  } as const;

  /* VIEW TOGGLING */
  const [portfolioView, setPortfolioView] = useState<"experience" | "projects">(
    "experience"
  );

  const projects: Array<{
    title: string;
    description: string;
    link?: string;
    delay?: number;
  }> = [
    // {
    //   title: "Project One",
    //   description: "Coming soon :)",
    //   link: "/code-blocks/",
    // },
  ];

  return (
    <>
      <div className={`app ${theme}`}>
        <div className={"header-actions"}>
          <ActionBtn
            className="action-btn"
            onClick={() =>
              window.open("https://linkedin.com/in/kcornn", "_blank")
            }
            aria-label="LinkedIn profile link"
          >
            <LinkedInIcon />
          </ActionBtn>
          <ActionBtn
            className="action-btn"
            onClick={() => window.open("https://github.com/kcornn", "_blank")}
            aria-label="Github profile link"
          >
            <GitHubIcon />
          </ActionBtn>
          <ActionBtn
            className="action-btn"
            onClick={toggleTheme}
            aria-label="Toggle light/dark theme"
          >
            {theme === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          </ActionBtn>
        </div>

        <h1>Kali Cornn</h1>
        <ReactTyped strings={["frontend software engineer"]} typeSpeed={40} />

        {projects.length > 0 && (
          <button
            className="view-btn"
            onClick={() =>
              setPortfolioView((v) =>
                v === "experience" ? "projects" : "experience"
              )
            }
            aria-pressed={portfolioView === "projects"}
            aria-label={
              portfolioView === "experience"
                ? "View projects (coming soon)"
                : "View experience"
            }
          >
            {portfolioView === "experience"
              ? "View projects (coming soon)"
              : "View experience"}
          </button>
        )}

        {portfolioView === "experience" ? (
          <>
            {showMobileBanner && (
              <div className="mobile-banner" role="region" aria-live="polite">
                <p>
                  For best viewing experience, please view this website on
                  desktop!
                </p>
                <button
                  className="mobile-banner-close"
                  onClick={dismissMobileBanner}
                  aria-label="Dismiss mobile banner"
                >
                  <CloseIcon />
                </button>
              </div>
            )}

            <motion.section id="experience" className="section" {...baseAnim}>
              <h2>Experience</h2>
              <p>
                Atlassian, Software Engineer II (fullstack, frontend-lean), 2019
                - 2025
              </p>
              <ul>
                <li>
                  <i>Tech stack:</i> React, Typescript, GraphQL, Kotlin
                </li>
                <li>
                  Joined{" "}
                  <a
                    href="https://www.atlassian.com/software/compass"
                    target="_blank"
                  >
                    Compass
                  </a>
                  , Atlassian's developer experience platform, as one of the
                  founding engineers in January 2021. Compass became generally
                  available fall 2023.
                </li>
                <li>
                  Led 3 iterations of the revised Compass onboarding flow to
                  increase adoption and retention of component scorecards,
                  working closely with design and product to refine the UI
                  experience. Increased percentage of users taking action within
                  Compass after onboarding from 45% to 65%.
                </li>
                <li>
                  Led a cross-team effort with 4 engineers across Bitbucket and
                  Compass to build a banner integration, achieving 1,000 weekly
                  Compass signups.
                </li>
                <li>
                  Delivered updated{" "}
                  <a
                    href="https://community.atlassian.com/forums/Compass-articles/Updated-CSV-importer-now-available/ba-p/2495470"
                    target="_blank"
                  >
                    CSV importer
                  </a>{" "}
                  in 1 month to meet customer requests, collaborating with
                  content design to refine scope while ensuring support for
                  additional component properties, leading to 10x increase in
                  usage.
                </li>
                <li>
                  Spearheaded team-wide developer productivity initiative by
                  allocating 14% of work to devprod monthly, surpassing the 10%
                  goal and improving overall team efficiency.
                </li>
                <li>
                  <i>Other leadership</i>
                  <ul>
                    <li>Mentored 1 intern and 2 new grads</li>
                    <li>
                      Atlassian values interviewer (across a variety of
                      levels/roles)
                    </li>
                    <li>Acted as Compass' internationalization liaison</li>
                    <li>
                      Served at Compass social planners lead (led planning of
                      two large offsites of 60+ attendees)
                    </li>
                    <li>
                      Attended TechTogether Boston 2020: Atlassian
                      representative at career fair, presented at women in tech
                      session, judged hackathon projects, assisted in Python
                      workshop
                    </li>
                  </ul>
                </li>
                <li>
                  <i>Miscellaneous</i>
                  <ul>
                    <li>
                      Authored Atlassian community{" "}
                      <a
                        href="https://community.atlassian.com/forums/Compass-articles/Building-Compass-Our-Developer-Platform-Journey/ba-p/3054039"
                        target="_blank"
                      >
                        article
                      </a>{" "}
                      outlining the journey from Microscope (interal PaaS) to
                      Compass. As a new grad, I was a Microscope UI developer.
                    </li>
                    <li>
                      Runner up, accessibility category, Atlassian Shipit 60
                      hackathon. Created Jira panel that generates accessibility
                      checklists based on issue information.
                    </li>
                  </ul>
                </li>
              </ul>
            </motion.section>

            <motion.section
              id="research"
              className="section"
              {...baseAnim}
              transition={{ delay: 0.08 }}
            >
              <h2>Research</h2>
              <p>
                Associate Investigator and Statistician, University of
                California, San Francisco, 2024 - Present
              </p>
              <ul>
                <li>
                  Volunteer researcher in the{" "}
                  <a href="https://kornblithdatalab.ucsf.edu/" target="_blank">
                    UCSF Emergency Data Science Lab
                  </a>{" "}
                  led by Dr. Aaron Kornblith.
                </li>
                <li>
                  Worked directly with Dr. Kornblith to create an in-progress
                  systematic review on the PECARN traumatic brain injury/trauma
                  algorithm. Led data analysis and visualization efforts using
                  R.
                </li>
              </ul>
              <p>
                Data Analyst Research Intern, Stanford University, Center of
                Design Research, 2018 - 2020
              </p>
              <ul>
                <li>
                  Used Python to clean/analyze data and create data
                  visualizations for a study analyzing the role of digital
                  assistants in autonomous vehicle ride experiences, sponsored
                  by Ford.
                </li>
              </ul>
              <h3>Publications</h3>
              <p>
                Alpers, B.S., <span className="author-emphasis">Cornn, K.</span>
                , Feitzinger, L.E., Khaliq, U., Park, S.Y., Beigi, B.,
                Hills-Bunnell, D.J., et al. (2020). Capturing Passenger
                Experience in a Ride-Sharing Autonomous Vehicle: The Role of
                Digital Assistants in User Interface Design. In 12th
                International Conference on Automotive User Interfaces and
                Interactive Vehicular Applications (AutomotiveUI '20).
                Association for Computing Machinery, New York, NY, USA, 83–93.{" "}
                <a
                  href="https://dl.acm.org/doi/10.1145/3409120.3410639"
                  target="_blank"
                >
                  [ACM]
                </a>
              </p>
            </motion.section>

            <motion.section
              id="teaching"
              className="section"
              {...baseAnim}
              transition={{ delay: 0.16 }}
            >
              <h2>Teaching</h2>
              <p>
                Teaching Fellow, Stanford University and National Education
                Equity Lab, 2024 - 2025
              </p>
              <ul>
                <li>
                  2024: Taught a weekly{" "}
                  <a
                    href="https://digitaleducation.stanford.edu/projects/stanford-courses-title-i-high-school-students"
                    target="_blank"
                  >
                    Intro to Computers (equivalent to Stanford's CS 105)
                  </a>{" "}
                  section to a Title I high school class, covering how computers
                  work, HTML, CSS, and Python
                </li>
                <li>
                  2025: Grader and course assistant for limited-run version of
                  the course.
                </li>
              </ul>
              <p>Course Assistant, Stanford University, 2018 - 2019</p>
              <ul>
                <li>
                  CS 105 (Intro to Computers) Head Course Assistant, Spring 2019
                </li>
                <li>
                  CS 108 (Object-Oriented Systems Design) Course Assistant, Fall
                  2018 and Winter 2019
                </li>
                <li>
                  CS 193C (Client-Side Technologies) Course Assistant, Summer
                  2018 and Summer 2019
                </li>
                <li>
                  Held weekly office hours, graded student assignments, and
                  administered exams.
                </li>
              </ul>
            </motion.section>

            <motion.section
              id="education"
              className="section"
              {...baseAnim}
              transition={{ delay: 0.24 }}
            >
              <h2>Education</h2>
              <p>Stanford University, M.S. in Statistics, 2019</p>
              <p>Stanford University, B.S. in Computer Science, 2018</p>
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
          </>
        ) : (
          <div className="projects-grid">
            {projects.map((project) => (
              <motion.section
                key={project.title}
                className="section"
                {...baseAnim}
                transition={{ delay: 0 }}
              >
                <h2>{project.title}</h2>
                <p>{project.description}</p>
                {project.link && (
                  <a href={project.link} target="_blank">
                    Demo / Repo
                  </a>
                )}
              </motion.section>
            ))}
          </div>
        )}
      </div>
      <footer className="footer">{"Last updated December 2025"}</footer>
    </>
  );
}

export default App;
