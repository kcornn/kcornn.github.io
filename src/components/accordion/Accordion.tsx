import { useEffect, useRef, useState } from "react";
import "./Accordion.css";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type AccordionProps = {
  title: string;
  items: string[];
};

const Accordion = ({ title, items }: AccordionProps) => {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // when opened, ensure the newly revealed panel is visible in the viewport
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    // wait 100ms for the CSS transition to start/DOM to update, then check
    const id = window.setTimeout(() => {
      const rect = panel.getBoundingClientRect();
      const padding = 24;
      // if bottom is out of view
      if (rect.bottom > window.innerHeight - padding) {
        // scroll the panel into view so the bottom is visible when opened
        panel.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    }, 100);

    return () => window.clearTimeout(id);
  }, [open]);

  return (
    <div ref={containerRef} className={`accordion ${open ? "open" : ""}`}>
      <button
        className="accordion-toggle"
        onClick={() => setOpen((s) => !s)}
        aria-expanded={open}
      >
        <span>{title}</span>
        <span className="chev" aria-hidden>
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </span>
      </button>

      <div ref={panelRef} className="accordion-panel" role="region">
        <ul>
          {items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Accordion;
