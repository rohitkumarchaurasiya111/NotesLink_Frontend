import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  CalculatorIcon,
  CodeBracketSquareIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
  BeakerIcon,
  SparklesIcon,
  ArrowRightIcon,
  MagnifyingGlassIcon,
  ArrowTopRightOnSquareIcon,
  FireIcon,
  CheckCircleIcon,
  XMarkIcon,
  StarIcon,
  FolderArrowDownIcon,
  GlobeAltIcon,
  CpuChipIcon,
} from "@heroicons/react/24/outline";

export const ECOSYSTEM_PRODUCTS = [
  {
    id: "sgpa-calculator",
    name: "SGPA & CGPA Grade Planner",
    shortName: "SGPA Calculator",
    category: "academic",
    categoryLabel: "Academic & Grades",
    tag: "Most Popular",
    tagColor: "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800/40",
    description:
      "Interactive semester grade calculator supporting 10-point credit schemes, instant percentage conversion formulas (Standard ×9.5 & AICTE/CBCS), and future target CGPA goal projections.",
    launchUrl: "https://sgpa.noteslink.com",
    isExternal: true,
    status: "Live Web App",
    rating: "4.9",
    userCount: "14.2k students",
    icon: CalculatorIcon,
    features: [
      "10-point & 4-point university grading scales",
      "Instant percentage equivalent conversion",
      "Target CGPA projection for future semesters",
      "Share or export your semester grade sheet",
    ],
    techStack: "React • Tailwind • Local Storage",
  },
  {
    id: "dsa-sheet",
    name: "DSA Placement Roadmap & Sheet",
    shortName: "DSA Sheet",
    category: "placement",
    categoryLabel: "Coding & Placements",
    tag: "High Yield",
    tagColor: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/40",
    description:
      "Curated 150+ coding interview problems mapped to Blind 75, Striver, and top tech companies. Includes difficulty filtering, company tags, and browser-synced progress tracking.",
    launchUrl: "https://dsa.noteslink.com",
    isExternal: true,
    status: "Live Web App",
    rating: "4.9",
    userCount: "19.8k students",
    icon: CodeBracketSquareIcon,
    features: [
      "Categorized from Arrays to Graphs & Dynamic Programming",
      "Direct problem links with video solution references",
      "Automatic progress checklist saved in browser",
      "Company-specific interview problem filters",
    ],
    techStack: "TypeScript • LeetCode API • IndexedDB",
  },
  {
    id: "attendance-planner",
    name: "75% Attendance & Safe Bunk Planner",
    shortName: "Attendance Planner",
    category: "productivity",
    categoryLabel: "Productivity",
    tag: "Campus Essential",
    tagColor: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800/40",
    description:
      "Avoid exam hall ticket detentions. Computes exact attendance percentage, tells you how many classes you can safely skip, or how many you must attend to recover back to 75%.",
    launchUrl: "https://attendance.noteslink.com",
    isExternal: true,
    status: "Live Tool",
    rating: "4.8",
    userCount: "11.5k students",
    icon: CalendarDaysIcon,
    features: [
      "Instant safe bunks calculator with safety buffer",
      "Shortage recovery streak projection",
      "Subject-wise and overall semester tracking",
      "Timetable reminder and alert notifications",
    ],
    techStack: "Progressive Web App • Offline Support",
  },
  {
    id: "resume-builder",
    name: "ATS Tech Resume Builder",
    shortName: "Tech Resume Builder",
    category: "placement",
    categoryLabel: "Coding & Placements",
    tag: "Career",
    tagColor: "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800/40",
    description:
      "Minimal single-page tech resume builder designed for campus placements and software engineering internships. Provides ATS-compliant layouts, LaTeX source export, and action-verb bullet guides.",
    launchUrl: "https://resume.noteslink.com",
    isExternal: true,
    status: "Beta Access",
    rating: "4.8",
    userCount: "8.4k students",
    icon: DocumentTextIcon,
    features: [
      "ATS-screened single column engineering layout",
      "Download clean PDF or raw Overleaf LaTeX code",
      "Action-verb bullet formulas with quantifiable metrics",
      "GitHub repositories and live project embedder",
    ],
    techStack: "Next.js • LaTeX Engine • PDFRenderer",
  },
  {
    id: "lab-vault",
    name: "Engineering Lab Manuals & Code Vault",
    shortName: "Lab Code Vault",
    category: "academic",
    categoryLabel: "Academic & Labs",
    tag: "Practicals",
    tagColor: "bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800/40",
    description:
      "Verified, error-free source code and lab manuals for university practical exams in C, C++, Java, Python, SQL, Operating Systems, and Web Technologies with output screenshots.",
    launchUrl: "https://labs.noteslink.com",
    isExternal: true,
    status: "Repository",
    rating: "4.7",
    userCount: "6.7k students",
    icon: BeakerIcon,
    features: [
      "Ready-to-execute laboratory programs and algorithms",
      "Sample console output screenshots and test cases",
      "Lab manual PDF write-ups with flowcharts",
      "Semester practical viva questions with answers",
    ],
    techStack: "Static Code Vault • Monaco Editor",
  },
  {
    id: "viva-prep",
    name: "Technical Viva & Oral Exam Deck",
    shortName: "Viva Prep Deck",
    category: "academic",
    categoryLabel: "Academic & Labs",
    tag: "Oral Exams",
    tagColor: "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800/40",
    description:
      "Top 50 frequently asked external oral exam questions per engineering subject. Formatted as interactive flashcards with concise one-minute answers for confident viva delivery.",
    launchUrl: "https://viva.noteslink.com",
    isExternal: true,
    status: "Interactive Q&A",
    rating: "4.9",
    userCount: "9.1k students",
    icon: SparklesIcon,
    features: [
      "50 high-frequency viva questions per core course",
      "Flashcard mode for rapid self-assessment",
      "Key formulas and hardware/software concepts",
      "External examiner tips and pitfalls to avoid",
    ],
    techStack: "Interactive Flashcards • Audio Pronunciation",
  },
  {
    id: "formula-hub",
    name: "Formula & Exam Cheatsheet Engine",
    shortName: "Formula Engine",
    category: "academic",
    categoryLabel: "Academic & Grades",
    tag: "Revision",
    tagColor: "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800/40",
    description:
      "High-density printable formula sheets for Engineering Mathematics, Physics, Circuit Theory, Signals & Systems, and Thermodynamics, curated for night-before-exam revision.",
    launchUrl: "https://formulas.noteslink.com",
    isExternal: true,
    status: "Live Archive",
    rating: "4.8",
    userCount: "13.0k students",
    icon: CpuChipIcon,
    features: [
      "High-contrast vector PDFs formatted for standard A4 printing",
      "Syllabus unit-wise equation indexing",
      "Derivation summary shortcuts and constant tables",
      "Mobile reader with pinch-to-zoom formula viewer",
    ],
    techStack: "MathJax • High-Res Vector PDF",
  },
  {
    id: "project-blueprints",
    name: "Capstone & Mini-Project Vault",
    shortName: "Project Vault",
    category: "placement",
    categoryLabel: "Coding & Placements",
    tag: "Projects",
    tagColor: "bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 border-teal-200 dark:border-teal-800/40",
    description:
      "Comprehensive engineering project blueprints with IEEE format documentation, synopsis templates, system architecture diagrams, and full open-source repositories.",
    launchUrl: "/projects",
    isExternal: false,
    status: "Integrated Platform",
    rating: "4.9",
    userCount: "7.9k students",
    icon: FolderArrowDownIcon,
    features: [
      "Full-stack, AI/ML, IoT, and embedded system blueprints",
      "IEEE standard synopsis and final project documentation",
      "System flowcharts and ER/architecture diagrams",
      "Project viva defense guide and presentation slides",
    ],
    techStack: "NotesLink Native • GitHub Repositories",
  },
];

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeModalProduct, setActiveModalProduct] = useState(null);

  const filteredProducts = useMemo(() => {
    return ECOSYSTEM_PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.shortName.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q) ||
        product.features.some((f) => f.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleLaunch = (product) => {
    if (product.isExternal) {
      window.open(product.launchUrl, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = product.launchUrl;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] w-full">
      {/* ─── Hero Section ─────────────────────────────────── */}
      <section className="relative w-full bg-[var(--bg-surface)] border-b border-[var(--border-subtle)] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20 overflow-hidden">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[var(--accent-light)] to-transparent rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--accent-light)] border border-[var(--accent-muted)] mb-5">
            <FireIcon className="w-4 h-4 text-[var(--accent)]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
              NotesLink Product Suite & Tools
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)] mb-4 leading-tight">
            Explore our companion <span className="text-[var(--accent)]">student products</span>.
          </h1>

          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto mb-8">
            Discover specialized applications and utilities built alongside NotesLink—from SGPA grade
            calculators and DSA roadmaps to attendance planners and lab code vaults.
          </p>

          {/* Search bar */}
          <div className="max-w-xl mx-auto relative mb-6">
            <MagnifyingGlassIcon className="w-4 h-4 text-[var(--text-tertiary)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products (e.g. sgpa, dsa sheet, attendance, resume)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-base)] text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-muted)] transition-all shadow-[var(--shadow-xs)]"
            />
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { id: "all", label: "All Products" },
              { id: "academic", label: "Academic & Grades" },
              { id: "placement", label: "Coding & Placements" },
              { id: "productivity", label: "Productivity & Utilities" },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-[var(--accent)] text-white shadow-[var(--shadow-xs)]"
                    : "bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Product Directory Catalog ────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[var(--border-subtle)]">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)]">
              Product Catalog
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-0.5">
              Click &ldquo;Launch Tool&rdquo; on any project to launch and start using it immediately.
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[var(--accent-light)] text-[var(--accent)]">
            {filteredProducts.length} Products Available
          </span>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const Icon = product.icon;
            return (
              <div
                key={product.id}
                className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-6 flex flex-col justify-between hover:border-[var(--border-default)] transition-all shadow-[var(--shadow-xs)] hover:shadow-[var(--shadow-md)] relative group"
              >
                <div>
                  {/* Top bar: icon + tag */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[var(--accent-light)] text-[var(--accent)] flex items-center justify-center border border-[var(--accent-muted)] shadow-[var(--shadow-xs)] group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${product.tagColor}`}>
                        {product.tag}
                      </span>
                    </div>
                  </div>

                  {/* Title & category */}
                  <div className="mb-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)] block">
                      {product.categoryLabel}
                    </span>
                    <h3 className="text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                      {product.name}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-5">
                    {product.description}
                  </p>

                  {/* Feature bullet list */}
                  <div className="space-y-1.5 pt-3 border-t border-[var(--border-subtle)] mb-5">
                    {product.features.slice(0, 3).map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                        <CheckCircleIcon className="w-3.5 h-3.5 text-[var(--accent)] flex-shrink-0" />
                        <span className="truncate">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom stats & Launch action button */}
                <div className="pt-4 border-t border-[var(--border-subtle)] space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-[var(--text-tertiary)] font-medium">
                    <span className="flex items-center gap-1">
                      <StarIcon className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <strong className="text-[var(--text-primary)]">{product.rating}</strong>
                    </span>
                    <span>{product.userCount}</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                      {product.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleLaunch(product)}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] active:scale-[0.98] transition-all shadow-[var(--shadow-xs)] cursor-pointer"
                    >
                      <span>Launch Tool</span>
                      <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveModalProduct(product)}
                      className="px-3 py-2.5 rounded-xl text-xs font-medium border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-default)] transition-colors cursor-pointer"
                      title="View Details"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Community Contributor / Propose a Product ─────── */}
        <section className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-8 sm:p-12 text-center mt-12">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)] block">
              Open Source Ecosystem
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
              Built a student tool? Get featured on NotesLink
            </h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              If you have built an open-source student calculator, extension, or study assistant,
              we would love to feature it in the official NotesLink Product Suite!
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                to="/contactus"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] transition-all shadow-[var(--shadow-xs)]"
              >
                Submit Your Project for Feature
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
              <Link
                to="/subjects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border border-[var(--border-default)] bg-[var(--bg-elevated)] text-[var(--text-primary)] hover:bg-[var(--bg-muted)] transition-all"
              >
                Back to Subjects
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* ── Details / Launch Modal ────────────────────────── */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-[var(--shadow-lg)] space-y-5 relative">
            <button
              type="button"
              onClick={() => setActiveModalProduct(null)}
              className="absolute top-5 right-5 p-1.5 rounded-lg text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-[var(--accent-light)] text-[var(--accent)] flex items-center justify-center border border-[var(--accent-muted)]">
                {(() => {
                  const ModalIcon = activeModalProduct.icon;
                  return <ModalIcon className="w-6 h-6" />;
                })()}
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">
                  {activeModalProduct.categoryLabel}
                </span>
                <h3 className="text-lg font-bold text-[var(--text-primary)]">
                  {activeModalProduct.name}
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              {activeModalProduct.description}
            </p>

            <div className="p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] space-y-2 text-xs">
              <span className="font-bold text-[var(--text-primary)] block mb-1">
                Included Capabilities
              </span>
              {activeModalProduct.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-[var(--text-secondary)]">
                  <CheckCircleIcon className="w-4 h-4 text-[var(--accent)] flex-shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs pt-1 border-t border-[var(--border-subtle)] text-[var(--text-tertiary)]">
              <span>Stack: {activeModalProduct.techStack}</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                {activeModalProduct.status}
              </span>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  handleLaunch(activeModalProduct);
                  setActiveModalProduct(null);
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl text-xs font-semibold bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] transition-all shadow-[var(--shadow-xs)] cursor-pointer"
              >
                <span>Launch {activeModalProduct.shortName} Now</span>
                <ArrowTopRightOnSquareIcon className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setActiveModalProduct(null)}
                className="py-2.5 px-4 rounded-xl text-xs font-medium border border-[var(--border-subtle)] hover:bg-[var(--bg-elevated)] transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}