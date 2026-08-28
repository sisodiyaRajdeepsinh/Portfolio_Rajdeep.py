// Signal / Field Notes: cinematic single-page portfolio with restrained motion and resume-backed content only.
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Check, Github, Linkedin, Mail, Menu, Send, X } from "lucide-react";
import { portfolio, Project } from "@/lib/portfolio-content";

const ease = [0.22, 1, 0.36, 1] as const;

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.72, delay, ease }}>
      {children}
    </motion.div>
  );
}

function SignalMark({ small = false }: { small?: boolean }) {
  return <span className={`signal-mark ${small ? "signal-mark-small" : ""}`} aria-hidden="true"><span /><span /><i /></span>;
}

function NeuralCore() {
  const stageRef = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const springX = useSpring(rx, { stiffness: 80, damping: 18, mass: 0.7 });
  const springY = useSpring(ry, { stiffness: 80, damping: 18, mass: 0.7 });
  const rotateX = useTransform(springY, [-20, 20], [8, -8]);
  const rotateY = useTransform(springX, [-20, 20], [-10, 10]);

  function move(e: React.PointerEvent<HTMLDivElement>) {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    rx.set(((e.clientX - rect.left) / rect.width - 0.5) * 20);
    ry.set(((e.clientY - rect.top) / rect.height - 0.5) * 20);
  }

  function reset() { rx.set(0); ry.set(0); }

  const nodes = useMemo(() => Array.from({ length: 12 }, (_, i) => i), []);
  return (
    <div className="core-stage" ref={stageRef} onPointerMove={move} onPointerLeave={reset} aria-label="Interactive abstract neural network sculpture" role="img">
      <div className="core-grid" />
      <motion.div className="neural-core" style={{ rotateX, rotateY }}>
        <div className="core-orbit core-orbit-a" />
        <div className="core-orbit core-orbit-b" />
        <div className="core-orbit core-orbit-c" />
        <div className="core-cube"><SignalMark /></div>
        {nodes.map((node) => <span key={node} className={`core-node core-node-${node}`} />)}
        <span className="core-beam beam-a" /><span className="core-beam beam-b" /><span className="core-beam beam-c" />
      </motion.div>
      <div className="core-caption"><span>OBJECT / 001</span><span>INPUT: CURIOUSITY</span></div>
      <div className="core-fallback" aria-hidden="true"><SignalMark /></div>
    </div>
  );
}

function SectionLabel({ index, children, light = false }: { index: string; children: React.ReactNode; light?: boolean }) {
  return <div className={`section-label ${light ? "section-label-light" : ""}`}><span>{index}</span><span>{children}</span></div>;
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: (project: Project) => void }) {
  return (
    <motion.article className={`project-card ${project.index === "01" ? "project-card-featured" : ""}`} whileHover={{ y: -6 }} transition={{ duration: 0.28, ease }}>
      <div className="project-art">
        <img src={project.image} alt="" loading="lazy" />
        <div className="project-art-overlay" />
        <div className="art-readout"><span>SYS.{project.index}</span><span className="readout-live"><i /> ACTIVE</span></div>
        <div className="art-index">{project.index}</div>
      </div>
      <div className="project-copy">
        <div className="project-meta"><span>{project.category}</span><span>{project.year}</span></div>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <div className="tag-row">{project.technology.split(" · ").map((tag) => <span key={tag}>{tag}</span>)}</div>
        <button className="text-button" onClick={() => onOpen(project)} aria-label={`View case study for ${project.title}`}>View case study <ArrowUpRight size={16} /></button>
      </div>
    </motion.article>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [formState, setFormState] = useState<"idle" | "success" | "error">("idle");
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) { setFormState("error"); return; }
    const values = new FormData(form);
    const subject = encodeURIComponent(String(values.get("subject") || "Portfolio contact"));
    const body = encodeURIComponent(`Name: ${values.get("name")}
Email: ${values.get("email")}

${values.get("message")}`);
    window.location.href = `mailto:${portfolio.links[2].value}?subject=${subject}&body=${body}`;
    setFormState("success");
    form.reset();
  }

  const navItems = [["01", "Home", "hero"], ["02", "About", "about"], ["03", "Projects", "projects"], ["04", "Experience", "experience"], ["05", "Contact", "contact"]];

  return (
    <div className="site-shell">
      <div className="scroll-progress" style={{ transform: `scaleX(${progress / 100})` }} />
      <div className="cursor-orb" aria-hidden="true" />
      <header className={`topbar ${scrolled ? "topbar-scrolled" : ""}`}>
        <a href="#hero" className="brand-lockup" aria-label="Rajdeepsinh Sisodiya home"><SignalMark small /><span>RS / ENGINEERING</span></a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map(([index, label, href]) => <a href={`#${href}`} key={href}><span>{index}</span>{label}</a>)}
        </nav>
        <a className="topbar-cta" href="#contact">Let's connect <ArrowUpRight size={15} /></a>
        <button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Open navigation menu" aria-expanded={menuOpen}><Menu size={22} /></button>
      </header>

      <AnimatePresence>
        {menuOpen && <motion.div className="mobile-nav" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3, ease }}>
          <div className="mobile-nav-top"><a href="#hero" className="brand-lockup" onClick={() => setMenuOpen(false)}><SignalMark small /><span>RS / ENGINEERING</span></a><button onClick={() => setMenuOpen(false)} aria-label="Close navigation menu"><X size={24} /></button></div>
          <nav aria-label="Mobile navigation">{navItems.map(([index, label, href]) => <a key={href} href={`#${href}`} onClick={() => setMenuOpen(false)}><span>{index}</span>{label}<ArrowUpRight size={18} /></a>)}</nav>
          <p>Computer Engineering · QA · AI/ML</p>
        </motion.div>}
      </AnimatePresence>

      <main>
        <section className="hero-panel" id="hero">
          <div className="hero-panel-top"><span>PORTFOLIO / 2026</span><span>AHMEDABAD, INDIA <i className="status-dot" /></span></div>
          <div className="hero-grid">
            <div className="hero-copy">
              <Reveal><p className="eyebrow"><span>RAJDEEPSINH SISODIYA</span><span>{portfolio.identity.label}</span></p></Reveal>
              <Reveal delay={0.08}><h1>Reliable systems.<br /><em>Curious</em> intelligence.</h1></Reveal>
              <Reveal delay={0.16}><p className="hero-lede">{portfolio.identity.positioning} I make software prove itself, then explore what happens when it starts to think.</p></Reveal>
              <Reveal delay={0.24}><div className="hero-actions"><a className="button button-orange" href="#projects">View my work <ArrowUpRight size={17} /></a><a className="button button-quiet" href="#about">Read the field notes <ArrowDown size={16} /></a></div></Reveal>
            </div>
            <Reveal className="hero-object-wrap" delay={0.18}><div className="hero-portrait"><img src="/rajdeepsinh-portrait.png" alt="Rajdeepsinh Sisodiya wearing a black suit" /><div className="portrait-sheen" /><div className="portrait-tag portrait-tag-top">PORTRAIT / 001</div><div className="portrait-tag portrait-tag-bottom">RAJDEEPSINH SISODIYA</div><div className="portrait-mark"><SignalMark small /></div></div></Reveal>
          </div>
          <div className="hero-bottom"><span>Jr. QA Analyst / AI-ML Explorer</span><span>Scroll to inspect <ArrowDown size={16} /></span></div>
        </section>

        <section className="intro-section" id="about">
          <div className="section-rail"><SectionLabel index="01" light>Profile / Signal</SectionLabel><span className="rail-line" /></div>
          <div className="intro-layout">
            <Reveal><p className="display-statement">A computer engineering graduate building toward intelligent software systems—one test, pipeline, and practical experiment at a time.</p></Reveal>
            <Reveal className="intro-note" delay={0.12}><span className="note-mark">FIELD NOTE 001</span><p>Currently working as a Jr. QA Analyst at Webito Infotech / Vedcool. The day-to-day is about software quality: finding what breaks, understanding why, and making sure it stays fixed.</p><p>Outside QA, the work moves toward AI/ML and computer vision—real-time detection systems, applied projects, and a steady self-directed study routine.</p><a href="#contact" className="inline-link">Start a conversation <ArrowUpRight size={15} /></a></Reveal>
          </div>
          <div className="metadata-strip"><div><span>BASE</span><strong>Ahmedabad, India</strong></div><div><span>NOW</span><strong>Jr. QA Analyst</strong></div><div><span>EXPLORING</span><strong>Python · Automation · AI/ML</strong></div><div><span>OFFLINE</span><strong>Gym · Travel · Music · Painting · Books · Food</strong></div></div>
        </section>

        <section className="projects-section" id="projects">
          <div className="section-heading-row"><div><SectionLabel index="02">Selected Systems</SectionLabel><h2>Work that<br /><em>holds up.</em></h2></div><p>A selection of things built, tested, and explored—each one a small system with a clear before-and-after.</p></div>
          <div className="projects-stack">{portfolio.projects.map((project, i) => <Reveal key={project.index} delay={i * 0.07}><ProjectCard project={project} onOpen={setSelectedProject} /></Reveal>)}</div>
        </section>

        <section className="skills-section" id="skills">
          <div className="section-heading-row"><div><SectionLabel index="03">Capability Map</SectionLabel><h2>The current<br /><em>toolkit.</em></h2></div><p>Grouped for scanning, not ranked. No proficiency levels—just the technologies and practices present in the uploaded portfolio.</p></div>
          <div className="skills-layout"><div className="skills-orbit" aria-hidden="true"><div className="orbit orbit-1" /><div className="orbit orbit-2" /><div className="orbit-core"><SignalMark /></div><span className="orbit-label orbit-label-a">PY</span><span className="orbit-label orbit-label-b">CV</span><span className="orbit-label orbit-label-c">QA</span><span className="orbit-label orbit-label-d">ML</span></div><div className="skills-groups">{portfolio.skills.map((group, i) => <Reveal key={group.title} delay={i * 0.05}><div className="skill-group"><div className="skill-group-title"><span>0{i + 1}</span><h3>{group.title}</h3></div><div className="skill-chips">{group.items.map(item => <span key={item}>{item}</span>)}</div></div></Reveal>)}</div></div>
        </section>

        <section className="experience-section" id="experience">
          <div className="section-heading-row"><div><SectionLabel index="04">Timeline / Trace</SectionLabel><h2>Steps along<br /><em>the signal.</em></h2></div><p>Education, programs, internships, and the current role—kept exact and recruiter-readable.</p></div>
          <ol className="timeline">{portfolio.timeline.map((item, i) => <Reveal key={`${item.date}-${item.title}`} delay={i * 0.03}><li className={(item as { current?: boolean }).current ? "timeline-current" : ""}><div className="timeline-index">{String(i + 1).padStart(2, "0")}</div><div className="timeline-date">{item.date}</div><div className="timeline-marker"><i /></div><div className="timeline-content"><h3>{item.title}</h3><p className="timeline-org">{item.org}</p>{item.meta && <p>{item.meta}</p>}{(item as { placeholder?: string }).placeholder && <p className="timeline-placeholder">{(item as { placeholder?: string }).placeholder}</p>}</div></li></Reveal>)}</ol>
        </section>

        <section className="process-section">
          <div className="process-head"><SectionLabel index="05" light>Engineering Mindset</SectionLabel><h2>Understand.<br />Test. Build. <em>Learn.</em></h2><p>The working rhythm suggested by the portfolio: get specific about the problem, verify assumptions, turn ideas into working systems, and use every bug as information.</p></div>
          <div className="process-steps">{["Understand", "Test", "Build", "Learn"].map((step, i) => <Reveal key={step} delay={i * 0.08}><div className="process-step"><span>0{i + 1}</span><div className="process-glyph"><i /><i /><i /></div><h3>{step}</h3><p>{["Get specific about what is breaking, for whom, and why it matters.", "Break systems down deliberately and verify assumptions.", "Turn ideas into practical, testable working systems.", "Treat every project and every bug as useful information."][i]}</p></div></Reveal>)}</div>
        </section>

        <section className="journal-section" id="journal"><div className="section-heading-row"><div><SectionLabel index="06">Journal / Future Notes</SectionLabel><h2>Notes in<br /><em>progress.</em></h2></div><p>No published articles were present in the uploaded portfolio. This space stays honest: a CMS-ready shelf for future technical notes.</p></div><div className="journal-placeholder"><span className="journal-number">00</span><div><span className="note-mark">PLACEHOLDER / COMING SOON</span><h3>Technical notes will appear here.</h3><p>Potential directions include Python backend engineering, computer vision systems, REST API design, generative AI, and lessons from building real-time applications.</p></div><span className="journal-status">EMPTY CMS SLOT</span></div></section>

        <section className="contact-section" id="contact"><div className="contact-panel"><div className="contact-top"><SectionLabel index="07" light>Contact / Open Channel</SectionLabel><span>RESPONSE ROUTE: EMAIL</span></div><div className="contact-layout"><div><h2>Let’s build<br /><em>something useful.</em></h2><p>For recruiters, engineering teams, and collaborators: the best first step is a clear problem.</p><div className="contact-links">{portfolio.links.map(link => <a key={link.label} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noreferrer" : undefined}><span>{link.label}</span><strong>{link.value}</strong><ArrowUpRight size={16} /></a>)}</div></div><form className="contact-form" onSubmit={submit} noValidate><label>Name<input name="name" required placeholder="Your name" /></label><label>Email<input name="email" required type="email" placeholder="you@example.com" /></label><label>Subject<input name="subject" required placeholder="What should we inspect?" /></label><label>Message<textarea name="message" required rows={4} placeholder="A little context goes a long way." /></label><button className="button button-orange" type="submit">Send message <Send size={16} /></button>{formState === "success" && <p className="form-message form-success" role="status"><Check size={16} /> Message ready—your email client can be used to continue the conversation.</p>}{formState === "error" && <p className="form-message form-error" role="alert">Please complete all fields with a valid email address.</p>}</form></div></div></section>
      </main>

      <footer className="site-footer"><div className="footer-top"><a href="#hero" className="brand-lockup"><SignalMark small /><span>RS / ENGINEERING</span></a><p>{portfolio.identity.name}<br /><span>{portfolio.identity.role} · {portfolio.identity.location}</span></p><div className="footer-socials"><a href={portfolio.links[0].href} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17} /></a><a href={portfolio.links[1].href} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a><a href={portfolio.links[2].href} aria-label="Email"><Mail size={17} /></a></div></div><div className="footer-bottom"><span>© 2026 {portfolio.identity.name}</span><span>Built with curiosity.</span><a href="#hero">Back to top <ArrowUpRight size={14} /></a></div></footer>

      <AnimatePresence>{selectedProject && <motion.div className="case-study-layer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-labelledby="case-title"><button className="case-close" onClick={() => setSelectedProject(null)} aria-label="Close case study"><X size={22} /></button><motion.div className="case-study" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }} transition={{ duration: 0.35, ease }}><div className="case-art"><img src={selectedProject.image} alt="" /><span>SYS.{selectedProject.index} / CASE STUDY</span></div><div className="case-copy"><div className="project-meta"><span>{selectedProject.category}</span><span>{selectedProject.year}</span></div><h2 id="case-title">{selectedProject.title}</h2><dl><div><dt>Problem / Approach</dt><dd>{selectedProject.approach}</dd></div><div><dt>Technology</dt><dd>{selectedProject.technology}</dd></div><div><dt>Outcome</dt><dd>{selectedProject.outcome}</dd></div></dl><a className="button button-orange" href={selectedProject.href} target="_blank" rel="noreferrer">View on GitHub <ArrowUpRight size={16} /></a></div></motion.div></motion.div>}</AnimatePresence>
    </div>
  );
}
