// Signal / Field Notes: resume-backed content model for Rajdeepsinh Sisodiya.
// Keep this file as the single editing surface for professional content.

export const portfolio = {
  identity: {
    name: "Rajdeepsinh Sisodiya",
    role: "Jr. QA Analyst",
    location: "Ahmedabad, India",
    positioning: "Computer Engineering graduate working across software quality, Python, AI/ML, and computer vision.",
    label: "PYTHON / BACKEND / AI-ML",
  },
  links: [
    { label: "GitHub", value: "github.com/sisodiyaRajdeepsinh", href: "https://github.com/sisodiyaRajdeepsinh" },
    { label: "LinkedIn", value: "/in/sisodiyarajdeepsinh", href: "https://www.linkedin.com/in/sisodiyarajdeepsinh" },
    { label: "Email", value: "rajdeepsinhsisodiya.d@gmail.com", href: "mailto:rajdeepsinhsisodiya.d@gmail.com" },
  ],
  projects: [
    {
      index: "01",
      title: "Driver Drowsiness Detection",
      category: "Computer Vision",
      year: "2026",
      image: "/computer-vision-illustration.jpg",
      summary: "Real-time detection system combining eye-aspect-ratio signals with a custom-trained CNN for fatigue-related driving risk.",
      approach: "Combined two independent signals—eye-aspect-ratio from 68-point facial landmarks and a custom-trained CNN—so detection does not rely on either signal alone. Personalized calibration and temporal smoothing cut false alarms.",
      technology: "Python · PyTorch · OpenCV · dlib · MediaPipe",
      outcome: "Real-time detection at 30+ FPS, with CLAHE and gamma correction for low-light reliability, and Telegram alerts with snapshot and location when drowsiness is confirmed.",
      href: "https://github.com/sisodiyaRajdeepsinh/driver-drowsiness-detection",
    },
    {
      index: "02",
      title: "Hand Gesture Recognition",
      category: "Computer Vision",
      year: "2026",
      image: "/hand-gesture-illustration.jpg",
      summary: "Maps 10+ hand gestures to OS-level actions using skeletal landmarks and temporal smoothing.",
      approach: "Uses 21 skeletal landmarks per hand to translate gestures into volume, brightness, media-control, and screenshot actions while smoothing temporal state changes.",
      technology: "Python · MediaPipe · OpenCV · NumPy · pycaw",
      outcome: "A practical real-time interface for hands-free OS control, grounded in landmark geometry and state stability.",
      href: "https://github.com/sisodiyaRajdeepsinh/hand-gesturerecognition-opencv",
    },
    {
      index: "03",
      title: "ResumeIQ — Resume Gap Analyzer",
      category: "AI Tool",
      year: "2026",
      image: "/resume-iq-illustration.jpg",
      summary: "Client-side tool comparing resumes with job descriptions through a curated taxonomy of 250+ skills across 8 categories.",
      approach: "Ranks improvement suggestions by priority without a backend, API keys, or model calls.",
      technology: "HTML5 · CSS3 · JavaScript · Chart.js",
      outcome: "A focused, browser-native way to surface skill gaps and organize next improvements.",
      href: "https://github.com/sisodiyaRajdeepsinh/ResumeIQ-",
    },
  ],
  skills: [
    { title: "Quality Assurance", items: ["Manual Testing", "Test Case Design", "Functional Testing", "Regression Testing", "Bug Identification", "Software Testing Fundamentals"] },
    { title: "Programming", items: ["Python", "C", "C++", "JavaScript", "HTML5", "CSS3"] },
    { title: "AI / ML", items: ["Machine Learning", "Deep Learning", "TensorFlow", "Keras", "PyTorch", "Scikit-learn", "NumPy", "CNN"] },
    { title: "Computer Vision", items: ["OpenCV", "MediaPipe", "dlib", "Gesture Recognition", "Real-time Video Processing", "Facial Landmark Detection", "EAR-based Detection", "Temporal Smoothing", "CLAHE Preprocessing"] },
    { title: "Tools & Platforms", items: ["Git", "GitHub", "VS Code", "Azure", "Power BI"] },
  ],
  timeline: [
    { date: "2023", title: "Diploma in Computer Engineering", org: "SAL Institute of Diploma Studies · GTU", meta: "CGPA 8.35" },
    { date: "2023 – 2026", title: "B.E. Computer Engineering", org: "SAL Institute of Technology & Engineering Research · GTU", meta: "" },
    { date: "2025", title: "Microsoft Data & AI Program", org: "GTU + Microsoft · 78 hours", meta: "Azure AI, NLP, generative AI, and Power BI, with hands-on projects using Azure Cognitive Services." },
    { date: "2026", title: "AI/ML Intern — Kody Technolab Ltd", org: "Jan 2026 – Apr 2026 · Ahmedabad", meta: "Built and integrated ML pipelines in a production environment, working cross-functionally within agile sprint cycles." },
    { date: "2026", title: "AI/ML Intern — QSkill", org: "Jun 2026 – Jul 2026 · 2 months", meta: "AI/ML internship experience at QSkill from June to July 2026.", placeholder: "[ADD QSKILL INTERNSHIP RESPONSIBILITIES]" },
    { date: "2026", title: "B.E. Computer Engineering — Completed", org: "CGPA 7.70", meta: "" },
    { date: "2026 — Present", title: "Jr. QA Analyst", org: "Webito Infotech / Vedcool · Ahmedabad", meta: "", current: true },
  ],
  education: [
    { title: "B.E. Computer Engineering", org: "SAL Institute of Technology & Engineering Research · GTU", meta: "Completed — May 2026 · CGPA 7.70" },
    { title: "Diploma in Computer Engineering", org: "SAL Institute of Diploma Studies · GTU", meta: "Completed — May 2023 · CGPA 8.35" },
  ],
  credentials: [
    { title: "Microsoft Data & AI Internship", org: "GTU + Microsoft", meta: "78 Hours" },
    { title: "Python Programming", org: "Microsoft & Skill India Digital Hub", meta: "40 Hours" },
  ],
} as const;

export type Project = (typeof portfolio.projects)[number];
