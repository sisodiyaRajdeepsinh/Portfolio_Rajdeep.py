# RS / Engineering — Portfolio

> Personal portfolio website for **Rajdeepsinh Sisodiya** — Jr. QA Analyst & AI/ML Explorer.

A cinematic, editorial-brutalism portfolio built with React, TypeScript, and Framer Motion. Designed with a "Signal / Field Notes" aesthetic — graphite backgrounds, warm paper sections, and electric orange accents.

## ✨ Features

- **Interactive 3D Hero** — Pointer-following neural core sculpture with spring physics
- **Cinematic Project Cards** — Grayscale-to-color hover effects with scanning line animations
- **Signal Design System** — Custom RS brand mark, calibration dots, and technical annotations
- **Framer Motion Animations** — Scroll-triggered reveals, parallax, and magnetic button drift
- **Responsive Design** — Fully responsive with mobile navigation overlay
- **Accessibility** — `prefers-reduced-motion` support, ARIA labels, focus-visible outlines
- **Contact Form** — mailto-based form with validation feedback

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, TypeScript |
| Styling | Tailwind CSS v4 + Custom CSS |
| Animation | Framer Motion |
| Icons | Lucide React |
| Build | Vite 7 |
| Server | Express (production static server) |
| Typography | Space Grotesk, Manrope, IBM Plex Mono |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repo
git clone https://github.com/sisodiyaRajdeepsinh/rajdeepsinh-portfolio.git
cd rajdeepsinh-portfolio

# Install dependencies
pnpm install
# or
npm install --legacy-peer-deps

# Start development server
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
pnpm build
pnpm start
```

## 📁 Project Structure

```
├── client/
│   ├── public/          # Static assets (images, portrait)
│   ├── src/
│   │   ├── components/  # UI components (ErrorBoundary, Map, shadcn/ui)
│   │   ├── contexts/    # Theme context provider
│   │   ├── hooks/       # Custom hooks (useComposition, useMobile)
│   │   ├── lib/         # Portfolio content data & utilities
│   │   ├── pages/       # Home page (single-page portfolio)
│   │   ├── App.tsx      # Application shell
│   │   ├── index.css    # Design system & all styles
│   │   └── main.tsx     # Entry point
│   └── index.html       # HTML template with font preloads
├── server/
│   └── index.ts         # Express production server
├── shared/
│   └── const.ts         # Shared constants
└── vite.config.ts       # Vite configuration
```

## 🎨 Design System

- **Colors**: Graphite `#0a0a0a` · Paper `#f1ede6` · Electric Orange `#FF5A1F`
- **Typography**: Space Grotesk (display) · Manrope (body) · IBM Plex Mono (labels)
- **Motion**: Cubic-bezier `(0.22, 1, 0.36, 1)` easing throughout

## 📬 Contact

- **GitHub**: [sisodiyaRajdeepsinh](https://github.com/sisodiyaRajdeepsinh)
- **LinkedIn**: [sisodiyarajdeepsinh](https://www.linkedin.com/in/sisodiyarajdeepsinh)
- **Email**: rajdeepsinhsisodiya.d@gmail.com

## 📄 License

MIT
