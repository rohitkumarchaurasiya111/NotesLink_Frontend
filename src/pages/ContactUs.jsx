import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  InboxArrowDownIcon,
  AcademicCapIcon,
  ExclamationTriangleIcon,
  UserPlusIcon,
  ChatBubbleBottomCenterTextIcon,
  ClipboardDocumentCheckIcon,
  ClipboardDocumentIcon,
  CheckCircleIcon,
  ClockIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ArrowTopRightOnSquareIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

// Intent definitions with metadata and tailored placeholders
const INTENTS = [
  {
    id: "contribute",
    label: "Contribute Notes / PYQ",
    shortLabel: "Contribute Notes",
    icon: InboxArrowDownIcon,
    title: "Upload or submit curated study materials",
    description:
      "Share your handwritten notes, formula cheat-sheets, or previous year exam papers with fellow students across universities.",
    assignedDesk: "Academic Curation Team",
    estimatedTurnaround: "12 to 24 hours (verification review)",
  },
  {
    id: "onboard",
    label: "Add My College / Branch",
    shortLabel: "Onboard College",
    icon: AcademicCapIcon,
    title: "Request curriculum onboarding for your institution",
    description:
      "Missing your university or autonomous college branch? Tell us your regulation scheme and syllabus structure to get it indexed.",
    assignedDesk: "Curriculum Integration Desk",
    estimatedTurnaround: "24 to 48 hours (scheme mapping)",
  },
  {
    id: "report",
    label: "Report Broken Link / Error",
    shortLabel: "Report Broken Link",
    icon: ExclamationTriangleIcon,
    title: "Report a corrupted PDF or inaccurate syllabus",
    description:
      "Encountered a dead Google Drive link, missing exam units, or a blurry document? We prioritize fixing these immediately.",
    assignedDesk: "Resource Integrity Squad",
    estimatedTurnaround: "Under 6 to 12 hours (high priority)",
  },
  {
    id: "ambassador",
    label: "Campus Lead / Ambassador",
    shortLabel: "Campus Lead",
    icon: UserPlusIcon,
    title: "Represent NotesLink at your college campus",
    description:
      "Help coordinate semester notes collection, connect with toppers, and lead open academic sharing at your university.",
    assignedDesk: "Community & Campus Outreach",
    estimatedTurnaround: "1 to 2 business days",
  },
  {
    id: "general",
    label: "General Support",
    shortLabel: "General Support",
    icon: ChatBubbleBottomCenterTextIcon,
    title: "General questions & feedback",
    description:
      "Have questions about the platform, technical issues, or suggestions to make NotesLink better? Send us a note.",
    assignedDesk: "General Support Desk",
    estimatedTurnaround: "Within 24 hours",
  },
];

const DIRECT_CHANNELS = [
  {
    title: "Student Support Desk",
    email: "support@noteslink.com",
    desk: "Direct Help",
    sla: "Reply in < 24h",
    description: "General questions, account issues, and navigation support.",
  },
  {
    title: "Academic Curation Team",
    email: "curation@noteslink.com",
    desk: "Content Review",
    sla: "Verified Daily",
    description: "Submit large ZIP bundles, syllabi, or faculty-approved materials.",
  },
  {
    title: "Campus Partnerships",
    email: "partners@noteslink.com",
    desk: "Institutional",
    sla: "Priority Review",
    description: "College clubs, student councils, and department library onboarding.",
  },
];

const FAQ_ITEMS = [
  {
    id: "faq-1",
    category: "contributions",
    question: "How are student-submitted notes verified before publishing?",
    answer:
      "Once submitted, our student curation team checks the notes against the official university course code and regulation scheme. We inspect legibility, ensure complete unit coverage, verify mathematical and diagrammatic correctness, and remove any invasive watermarks before publishing.",
  },
  {
    id: "faq-2",
    category: "colleges",
    question: "How do I request my university or college to be added to NotesLink?",
    answer:
      "Select 'Add My College / Branch' in the form above. Provide your institution's name, affiliated university (e.g. SPPU, VTU, AKTU, Anna University), and current syllabus scheme (e.g., 2021 or 2024 scheme). Having a link to your official curriculum syllabus helps us catalog it faster.",
  },
  {
    id: "faq-3",
    category: "access",
    question: "Is NotesLink completely free? Are there any hidden fees or paywalls?",
    answer:
      "NotesLink is 100% free and open for all students. There are no subscription tiers, no document unlock paywalls, and no countdown timers. Every note, previous year question paper, and reference guide is freely readable in the browser or downloadable.",
  },
  {
    id: "faq-4",
    category: "contributions",
    question: "Will I get credit for contributing notes or question papers?",
    answer:
      "Yes! When submitting materials, you can choose to have your name, branch, and semester prominently credited on the subject materials page as a verified student contributor.",
  },
  {
    id: "faq-5",
    category: "access",
    question: "What should I do if a PDF link is broken or shows a 404 error?",
    answer:
      "Select 'Report Broken Link / Error' above and paste the subject name or URL. Broken link reports trigger a high-priority alert for our integrity team, and we usually repair or replace the resource within 6 to 12 hours.",
  },
  {
    id: "faq-6",
    category: "privacy",
    question: "How does NotesLink handle copyright and intellectual property?",
    answer:
      "NotesLink respects academic fair use and intellectual property. We host student-authored summaries, open reference materials, and publicly released examination papers. If you are a copyright holder with concerns regarding any material, contact copyright@noteslink.com for immediate review.",
  },
];

const inputClass =
  "w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-primary)] placeholder-[var(--text-tertiary)] text-sm focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-muted)] transition-all";
const labelClass =
  "block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-1.5";

export default function ContactUs() {
  const [selectedIntent, setSelectedIntent] = useState("contribute");
  const [loading, setLoading] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState(null);
  const [copiedEmail, setCopiedEmail] = useState("");

  // Search & filter state for FAQ
  const [faqSearch, setFaqSearch] = useState("");
  const [activeFaqCategory, setActiveFaqCategory] = useState("all");
  const [expandedFaq, setExpandedFaq] = useState("faq-1");

  // Dynamic form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    college: "",
    branch: "",
    semester: "Semester 1",
    subjectName: "",
    subjectCode: "",
    materialLink: "",
    creditPreference: "yes",
    schemeYear: "2024 Scheme",
    issueType: "404 Not Found",
    message: "",
  });

  const activeIntentConfig = useMemo(
    () => INTENTS.find((i) => i.id === selectedIntent) || INTENTS[0],
    [selectedIntent]
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopyEmail = (email) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(""), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate smart ticket generation
    setTimeout(() => {
      setLoading(false);
      const randomTicketId = `NL-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedTicket({
        ticketId: randomTicketId,
        intent: activeIntentConfig.label,
        desk: activeIntentConfig.assignedDesk,
        turnaround: activeIntentConfig.estimatedTurnaround,
        userEmail: formData.email,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      });
      // Reset form
      setFormData({
        name: "",
        email: "",
        college: "",
        branch: "",
        semester: "Semester 1",
        subjectName: "",
        subjectCode: "",
        materialLink: "",
        creditPreference: "yes",
        schemeYear: "2024 Scheme",
        issueType: "404 Not Found",
        message: "",
      });
    }, 700);
  };

  // Filtered FAQ list
  const filteredFaqs = useMemo(() => {
    return FAQ_ITEMS.filter((item) => {
      const matchesCategory =
        activeFaqCategory === "all" || item.category === activeFaqCategory;
      const matchesSearch =
        item.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
        item.answer.toLowerCase().includes(faqSearch.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeFaqCategory, faqSearch]);

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] w-full">
      {/* ─── Hero Header ──────────────────────────────────── */}
      <section className="relative w-full bg-[var(--bg-surface)] border-b border-[var(--border-subtle)] py-14 sm:py-16 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20 overflow-hidden">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-[var(--accent-light)] to-transparent rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-light)] border border-[var(--accent-muted)] mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
              Support Desk Active • Response SLA &lt; 24h
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-3">
            How can we support your semester?
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-xl mx-auto">
            Whether you&rsquo;re contributing notes, requesting syllabus onboarding for your college,
            or reporting a broken PDF link, select your goal below for direct routing.
          </p>
        </div>
      </section>

      {/* ─── Main Content Container ───────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ─── Left Column: Intent Selector & Direct Channels ─ */}
          <div className="lg:col-span-4 space-y-6">
            {/* Intent Navigation Pills */}
            <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-5 shadow-[var(--shadow-sm)]">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-tertiary)] mb-3">
                Select Your Goal
              </h2>
              <div className="space-y-1.5">
                {INTENTS.map((intent) => {
                  const Icon = intent.icon;
                  const isActive = selectedIntent === intent.id;
                  return (
                    <button
                      key={intent.id}
                      type="button"
                      onClick={() => {
                        setSelectedIntent(intent.id);
                        setSubmittedTicket(null);
                      }}
                      className={`w-full flex items-center justify-between p-3 rounded-xl text-left text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                        isActive
                          ? "bg-[var(--accent-light)] text-[var(--accent)] border border-[var(--accent-muted)] shadow-[var(--shadow-xs)]"
                          : "text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)] border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3 truncate">
                        <Icon
                          className={`w-4 h-4 flex-shrink-0 ${
                            isActive ? "text-[var(--accent)]" : "text-[var(--text-tertiary)]"
                          }`}
                        />
                        <span className="truncate">{intent.shortLabel}</span>
                      </div>
                      <span className="text-[10px] opacity-60 font-mono">
                        {isActive ? "ACTIVE" : ""}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Direct Communication Channels */}
            <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-5 shadow-[var(--shadow-sm)] space-y-4">
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-tertiary)]">
                  Direct Inboxes
                </h3>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Live Monitored
                </span>
              </div>

              <div className="space-y-3.5">
                {DIRECT_CHANNELS.map((ch) => (
                  <div
                    key={ch.email}
                    className="p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[var(--text-primary)]">{ch.title}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--accent-light)] text-[var(--accent)] font-medium">
                        {ch.sla}
                      </span>
                    </div>
                    <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                      {ch.description}
                    </p>
                    <div className="pt-1 flex items-center justify-between">
                      <a
                        href={`mailto:${ch.email}`}
                        className="font-mono text-xs text-[var(--accent)] hover:underline"
                      >
                        {ch.email}
                      </a>
                      <button
                        type="button"
                        onClick={() => handleCopyEmail(ch.email)}
                        className="inline-flex items-center gap-1 text-[11px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                        title="Copy email address"
                      >
                        {copiedEmail === ch.email ? (
                          <>
                            <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-500" />
                            <span className="text-emerald-500 font-semibold">Copied</span>
                          </>
                        ) : (
                          <>
                            <ClipboardDocumentIcon className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Instant Catalog Tip */}
            <div className="p-4 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] space-y-2">
              <div className="flex items-center gap-2 text-[var(--text-primary)] font-semibold">
                <SparklesIcon className="w-4 h-4 text-[var(--accent)]" />
                Need materials immediately?
              </div>
              <p className="text-[11px] leading-relaxed">
                Before sending an inquiry, check our comprehensive catalog of indexed courses and question banks.
              </p>
              <Link
                to="/subjects"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent)] hover:underline pt-1"
              >
                Search Semester Catalog
                <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* ─── Right Column: Smart Dynamic Intake Form ─────── */}
          <div className="lg:col-span-8">
            <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-6 sm:p-8 shadow-[var(--shadow-sm)]">
              {/* Dynamic Header */}
              <div className="border-b border-[var(--border-subtle)] pb-5 mb-6">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent)] px-2.5 py-0.5 rounded-full bg-[var(--accent-light)]">
                    <ShieldCheckIcon className="w-3.5 h-3.5" />
                    Target: {activeIntentConfig.assignedDesk}
                  </span>
                  <span className="text-xs text-[var(--text-tertiary)] flex items-center gap-1">
                    <ClockIcon className="w-3.5 h-3.5" />
                    SLA: {activeIntentConfig.estimatedTurnaround}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-[var(--text-primary)]">
                  {activeIntentConfig.title}
                </h2>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
                  {activeIntentConfig.description}
                </p>
              </div>

              {/* Submitted Ticket Confirmation View */}
              {submittedTicket ? (
                <div className="space-y-6 py-4">
                  <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 text-emerald-800 dark:text-emerald-300 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                          <CheckCircleIcon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-bold text-base">Inquiry Successfully Queued</h3>
                          <p className="text-xs opacity-90">
                            Your submission has been cataloged in our support pipeline.
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-emerald-100 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-200">
                        {submittedTicket.ticketId}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs border-t border-emerald-200/60 dark:border-emerald-800/60">
                      <div>
                        <span className="block text-emerald-600 dark:text-emerald-400 font-medium">Assigned Desk</span>
                        <span className="font-semibold">{submittedTicket.desk}</span>
                      </div>
                      <div>
                        <span className="block text-emerald-600 dark:text-emerald-400 font-medium">Estimated Review</span>
                        <span className="font-semibold">{submittedTicket.turnaround}</span>
                      </div>
                      <div>
                        <span className="block text-emerald-600 dark:text-emerald-400 font-medium">Confirmation Sent To</span>
                        <span className="font-semibold truncate block">{submittedTicket.userEmail}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <p className="text-xs text-[var(--text-secondary)]">
                      Keep your ticket ID <strong className="font-mono">{submittedTicket.ticketId}</strong> for reference.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmittedTicket(null)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] transition-colors cursor-pointer"
                    >
                      Submit Another Query
                    </button>
                  </div>
                </div>
              ) : (
                /* Dynamic Form */
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Basic user info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Priyanshu Sharma"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="name@college.edu or personal email"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* College & Branch */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>College / University</label>
                      <input
                        type="text"
                        name="college"
                        value={formData.college}
                        onChange={handleInputChange}
                        placeholder="e.g. SRM IST, PCCOE Pune, VIT"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Branch / Specialization</label>
                      <input
                        type="text"
                        name="branch"
                        value={formData.branch}
                        onChange={handleInputChange}
                        placeholder="e.g. Computer Science, Mechanical, ECE"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* ── Dynamic Section: Contribute Notes ─────── */}
                  {selectedIntent === "contribute" && (
                    <div className="p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] space-y-4">
                      <span className="text-xs font-bold text-[var(--accent)] uppercase tracking-wider block">
                        Material Contribution Details
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className={labelClass}>Semester</label>
                          <select
                            name="semester"
                            value={formData.semester}
                            onChange={handleInputChange}
                            className={inputClass}
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                              <option key={sem} value={`Semester ${sem}`}>
                                Semester {sem}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className={labelClass}>Subject Name</label>
                          <input
                            type="text"
                            name="subjectName"
                            required
                            value={formData.subjectName}
                            onChange={handleInputChange}
                            placeholder="e.g. Operating Systems"
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className={labelClass}>Subject / Course Code</label>
                          <input
                            type="text"
                            name="subjectCode"
                            value={formData.subjectCode}
                            onChange={handleInputChange}
                            placeholder="e.g. CS302 / 21CS34"
                            className={inputClass}
                          />
                        </div>
                      </div>

                      <div>
                        <label className={labelClass}>
                          Google Drive / Cloud Folder Link <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="url"
                          name="materialLink"
                          required
                          value={formData.materialLink}
                          onChange={handleInputChange}
                          placeholder="https://drive.google.com/... (Make sure sharing is set to 'Anyone with link')"
                          className={inputClass}
                        />
                        <p className="text-[11px] text-[var(--text-tertiary)] mt-1.5">
                          Tip: Include notes, formula sheets, or mid/end-sem question paper scans.
                        </p>
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="checkbox"
                          id="creditPreference"
                          checked={formData.creditPreference === "yes"}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              creditPreference: e.target.checked ? "yes" : "no",
                            }))
                          }
                          className="w-4 h-4 rounded text-[var(--accent)] focus:ring-[var(--accent)] border-[var(--border-default)]"
                        />
                        <label htmlFor="creditPreference" className="text-xs text-[var(--text-secondary)]">
                          Credit my name and branch on the published subject page as a contributor.
                        </label>
                      </div>
                    </div>
                  )}

                  {/* ── Dynamic Section: Onboard College ──────── */}
                  {selectedIntent === "onboard" && (
                    <div className="p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] space-y-4">
                      <span className="text-xs font-bold text-[var(--accent)] uppercase tracking-wider block">
                        Institutional Curriculum Information
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className={labelClass}>University Affiliation</label>
                          <input
                            type="text"
                            name="subjectName"
                            value={formData.subjectName}
                            onChange={handleInputChange}
                            placeholder="e.g. Autonomous, SPPU, AKTU, VTU"
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className={labelClass}>Regulation Scheme</label>
                          <select
                            name="schemeYear"
                            value={formData.schemeYear}
                            onChange={handleInputChange}
                            className={inputClass}
                          >
                            <option value="2024 Scheme">2024 Scheme / NEP Structure</option>
                            <option value="2021 Scheme">2021 / 2022 CBCS Scheme</option>
                            <option value="2019 Scheme">2018 / 2019 Scheme</option>
                            <option value="Other">Other Scheme (describe below)</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className={labelClass}>Official Syllabus PDF Link / Portal</label>
                        <input
                          type="url"
                          name="materialLink"
                          value={formData.materialLink}
                          onChange={handleInputChange}
                          placeholder="Link to university academic curriculum or syllabus PDF"
                          className={inputClass}
                        />
                      </div>
                    </div>
                  )}

                  {/* ── Dynamic Section: Report Broken Link ───── */}
                  {selectedIntent === "report" && (
                    <div className="p-4 rounded-xl bg-red-50/50 dark:bg-red-950/20 border border-red-200/60 dark:border-red-900/40 space-y-4">
                      <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider block">
                        Resource Incident Report
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className={labelClass}>Issue Category</label>
                          <select
                            name="issueType"
                            value={formData.issueType}
                            onChange={handleInputChange}
                            className={inputClass}
                          >
                            <option value="404 Not Found">Broken 404 Link / Dead Drive</option>
                            <option value="Corrupted PDF">Corrupted or Unreadable PDF</option>
                            <option value="Wrong Syllabus">Wrong Subject / Outdated Syllabus</option>
                            <option value="Watermark Obscured">Heavily Watermarked / Unreadable text</option>
                            <option value="Other">Other Quality Issue</option>
                          </select>
                        </div>
                        <div>
                          <label className={labelClass}>Subject Name or URL</label>
                          <input
                            type="text"
                            name="subjectName"
                            required
                            value={formData.subjectName}
                            onChange={handleInputChange}
                            placeholder="e.g. /subjects/maths-2 or subject name"
                            className={inputClass}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Message Field */}
                  <div>
                    <label className={labelClass}>
                      {selectedIntent === "contribute"
                        ? "Notes Description / Key Topics Included"
                        : selectedIntent === "report"
                        ? "Specific Page / Description of the Issue"
                        : "Message & Additional Details"}{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder={
                        selectedIntent === "contribute"
                          ? "Briefly describe the modules covered (e.g., Units 1 to 4 handwritten lecture notes, formula derivations, solved mid-term papers)..."
                          : selectedIntent === "report"
                          ? "Explain which module or file has the issue, missing pages, or download error..."
                          : "Provide any additional context or questions..."
                      }
                      className={inputClass}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 px-6 rounded-xl text-white font-semibold text-sm bg-[var(--accent)] hover:bg-[var(--accent-hover)] transition-all shadow-[var(--shadow-sm)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-[0.99]"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                          <span>Routing Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit to {activeIntentConfig.assignedDesk}</span>
                          <ClipboardDocumentCheckIcon className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* ─── Searchable & Filterable FAQ Section ──────────── */}
        <section className="mt-16 pt-12 border-t border-[var(--border-subtle)]">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)] block mb-2">
              Instant Answers
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mt-2">
              Find fast resolutions to recurring queries about note submissions, onboarding, and accessibility.
            </p>
          </div>

          {/* Search bar + Filter chips */}
          <div className="max-w-2xl mx-auto space-y-4 mb-8">
            <div className="relative">
              <MagnifyingGlassIcon className="w-4 h-4 text-[var(--text-tertiary)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                placeholder="Search questions (e.g. copyright, turnaround, college)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent)] transition-all shadow-[var(--shadow-xs)]"
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              {[
                { id: "all", label: "All Questions" },
                { id: "contributions", label: "Submissions" },
                { id: "colleges", label: "College Onboarding" },
                { id: "access", label: "Access & Fees" },
                { id: "privacy", label: "Fair Use & Rights" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveFaqCategory(cat.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    activeFaqCategory === cat.id
                      ? "bg-[var(--accent)] text-white"
                      : "bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Accordion list */}
          <div className="max-w-3xl mx-auto space-y-3">
            {filteredFaqs.length === 0 ? (
              <div className="p-8 text-center bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl">
                <p className="text-sm text-[var(--text-secondary)]">
                  No matching questions found for &ldquo;{faqSearch}&rdquo;.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setFaqSearch("");
                    setActiveFaqCategory("all");
                  }}
                  className="mt-2 text-xs font-semibold text-[var(--accent)] hover:underline"
                >
                  Clear search filters
                </button>
              </div>
            ) : (
              filteredFaqs.map((faq) => {
                const isExpanded = expandedFaq === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl overflow-hidden transition-colors hover:border-[var(--border-default)]"
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedFaq(isExpanded ? null : faq.id)}
                      className="w-full flex items-center justify-between p-4 sm:p-5 text-left cursor-pointer"
                    >
                      <span className="text-sm font-semibold text-[var(--text-primary)] pr-4">
                        {faq.question}
                      </span>
                      {isExpanded ? (
                        <ChevronUpIcon className="w-4 h-4 text-[var(--accent)] flex-shrink-0" />
                      ) : (
                        <ChevronDownIcon className="w-4 h-4 text-[var(--text-tertiary)] flex-shrink-0" />
                      )}
                    </button>
                    {isExpanded && (
                      <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-subtle)] pt-3.5">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </section>
      </div>
    </div>
  );
}