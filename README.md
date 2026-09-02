# Rimslin | Modern Web Solutions

Production-ready Next.js web application engineered for [rimslin.com](https://rimslin.com).

## 🚀 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router `/app` directory)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom glassmorphic tokens & dark mode design system
- **Icons**: [Lucide React](https://lucide.dev/)
- **SEO & Metadata**: Dynamic `metadataBase`, OpenGraph, Twitter Cards, `robots.ts`, `sitemap.ts`

---

## 📁 Directory Structure

```
├── app/
│   ├── layout.tsx         # Root layout with metadataBase ('https://rimslin.com') & SEO
│   ├── page.tsx           # Assembled modern landing page
│   ├── globals.css        # Tailwind directives, theme variables, glassmorphism utilities
│   ├── robots.ts          # Dynamic robots.txt with sitemap reference
│   ├── sitemap.ts         # Dynamic sitemap.xml generator with canonical routes
│   └── not-found.tsx      # Branded 404 page
├── components/
│   ├── Navbar.tsx         # Accessible glassmorphic navigation header with mobile toggle
│   ├── Hero.tsx           # Modern hero with gradient typography & interactive terminal
│   ├── Features.tsx       # 6-card feature grid with Lucide icons
│   ├── Stats.tsx          # Key metric counters & live SLA indicators
│   ├── CTA.tsx            # Conversion-focused action section
│   └── Footer.tsx         # Structured footer with domain navigation & legal links
├── lib/
│   └── utils.ts           # Class merging helper (clsx + tailwind-merge)
├── public/                # Static public assets
├── next.config.mjs        # Production Next.js configuration
├── tailwind.config.ts     # Design tokens, custom colors, animations
├── tsconfig.json          # TypeScript strict configuration
└── package.json           # Dependencies and scripts
```

---

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the website.

### 3. Type Checking
```bash
npm run typecheck
```

### 4. Build for Production
```bash
npm run build
```

### 5. Start Production Server
```bash
npm run start
```

---

## 🌐 SEO & Domain Configurations

- **Domain**: `https://rimslin.com`
- **Metadata Base**: `new URL("https://rimslin.com")` in `app/layout.tsx`
- **Title Template**: `%s | Rimslin` with default `"Rimslin | Modern Web Solutions"`
- **Robots**: Located at `/robots.txt` generated dynamically via `app/robots.ts`
- **Sitemap**: Located at `/sitemap.xml` generated dynamically via `app/sitemap.ts`

---

## 📄 License
All rights reserved © 2026 Rimslin.
