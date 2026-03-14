"use client";
import { useEffect, useRef, useState } from "react";

const PROJECTS = [
  {
    id: "01",
    codename: "NEXUS_AI",
    title: "AI-Powered Knowledge Base",
    tagline: "When search fails, intelligence finds.",
    status: "SHIPPED",
    statusColor: "#00F5D4",
    year: "2024",
    type: "Full Stack + AI",
    impact: "HIGH",
    stack: ["Next.js", "OpenAI", "Pinecone", "PostgreSQL", "Node.js"],
    metrics: [
      { k: "QUERY_SPEED", v: "~180ms", delta: "+67%" },
      { k: "ACCURACY", v: "94.2%", delta: "+41%" },
      { k: "USERS", v: "1.2K+", delta: "↑" },
      { k: "UPTIME", v: "99.9%", delta: "SLA" },
    ],
    problem:
      "A 10,000-document internal wiki was unsearchable. Keyword search returned noise. Teams wasted 3–4 hours/week hunting for context. Knowledge was siloed and rotting.",
    process:
      "Chunked all documents with sliding-window tokenization. Built a RAG pipeline using OpenAI embeddings stored in Pinecone. Designed a query rewriter that expands ambiguous terms before retrieval. Wrapped in a Next.js chat UI with streaming responses.",
    outcome:
      "Search became conversation. New hires onboarded 40% faster. The system handled 1,200+ queries in the first month with zero hallucination complaints. PM called it 'the first internal tool people actually use.'",
    arch: [
      { node: "CLIENT", type: "input", x: 0 },
      { node: "QUERY_REWRITER", type: "process", x: 1 },
      { node: "EMBEDDINGS", type: "process", x: 2 },
      { node: "PINECONE", type: "store", x: 3 },
      { node: "LLM", type: "ai", x: 4 },
      { node: "RESPONSE", type: "output", x: 5 },
    ],
  },
  {
    id: "02",
    codename: "ORBIT_OPS",
    title: "Real-Time DevOps Dashboard",
    tagline: "See your system before it screams.",
    status: "LIVE",
    statusColor: "#3B82F6",
    year: "2023",
    type: "Systems + Backend",
    impact: "CRITICAL",
    stack: ["React", "Node.js", "WebSockets", "Docker", "Redis", "Grafana API"],
    metrics: [
      { k: "LATENCY", v: "< 80ms", delta: "P99" },
      { k: "ALERT_TIME", v: "2.1s", delta: "-78%" },
      { k: "SERVICES", v: "34", delta: "monitored" },
      { k: "INCIDENTS", v: "-62%", delta: "MoM" },
    ],
    problem:
      "Engineering team had 34 microservices spread across 3 clouds. Alerts came from 6 different tools. By the time someone noticed a failure, it had cascaded. Mean time to detect was 18 minutes.",
    process:
      "Built a unified event stream using WebSockets that aggregated health data from all services. Designed a Redis-backed anomaly detector that scored service health in real-time. Single dashboard — one source of truth, no tab-switching.",
    outcome:
      "Mean time to detect dropped from 18 min to 2.1 sec. On-call engineers stopped getting 3am pages for issues that had already self-healed. Incident rate fell 62% in 3 months. Team morale measurably improved.",
    arch: [
      { node: "SERVICES", type: "input", x: 0 },
      { node: "EVENT_BUS", type: "process", x: 1 },
      { node: "REDIS", type: "store", x: 2 },
      { node: "ANOMALY_ENGINE", type: "ai", x: 3 },
      { node: "WS_SERVER", type: "process", x: 4 },
      { node: "DASHBOARD", type: "output", x: 5 },
    ],
  },
  {
    id: "03",
    codename: "PHANTOM_PAY",
    title: "Peer-to-Peer Payment System",
    tagline: "Money moved at the speed of trust.",
    status: "DEPLOYED",
    statusColor: "#9B5DE5",
    year: "2023",
    type: "Backend + Security",
    impact: "HIGH",
    stack: ["Node.js", "PostgreSQL", "JWT", "Stripe API", "Redis", "Docker"],
    metrics: [
      { k: "TPS", v: "340+", delta: "peak" },
      { k: "FAIL_RATE", v: "0.03%", delta: "→ 0" },
      { k: "AUTH_TIME", v: "~90ms", delta: "-55%" },
      { k: "FRAUD_CATCH", v: "98.7%", delta: "rate" },
    ],
    problem:
      "Existing payment flow had a race condition that caused double-charges on poor networks. 1-in-200 transactions failed silently. Users lost money and trust. Refunds were manual and took days.",
    process:
      "Redesigned the transaction model using database-level locking and idempotency keys. Built an async job queue for retries with exponential backoff. Added lightweight fraud scoring using velocity checks on Redis. Every failure now triggers an automatic resolution path.",
    outcome:
      "Double-charge bug eliminated. Transaction failure rate dropped from 0.5% to 0.03%. Fraud detection running at 98.7% catch rate. No manual refunds in 6 months. System handles 340 TPS at peak load without degradation.",
    arch: [
      { node: "USER", type: "input", x: 0 },
      { node: "AUTH_GATE", type: "process", x: 1 },
      { node: "FRAUD_CHECK", type: "ai", x: 2 },
      { node: "TX_LOCK", type: "process", x: 3 },
      { node: "STRIPE", type: "store", x: 4 },
      { node: "LEDGER", type: "output", x: 5 },
    ],
  },
];

const NODE_COLORS = {
  input: "#00F5D4",
  process: "#3B82F6",
  store: "#F59E0B",
  ai: "#9B5DE5",
  output: "#10B981",
};

function useInView(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold: 0.1 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

function ArchDiagram({ nodes }) {
  return (
    <div className="flex items-center gap-0 w-full overflow-x-auto py-2">
      {nodes.map((n, i) => (
        <div key={n.node} className="flex items-center flex-shrink-0">
          {/* Node */}
          <div className="flex flex-col items-center gap-1">
            <div
              className="px-2 py-1 rounded-sm text-[8px] tracking-wider text-center"
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                border: `1px solid ${NODE_COLORS[n.type]}50`,
                background: `${NODE_COLORS[n.type]}10`,
                color: NODE_COLORS[n.type],
                minWidth: "68px",
              }}
            >
              {n.node}
            </div>
            <div
              className="text-[7px] tracking-widest"
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                color: `${NODE_COLORS[n.type]}60`,
              }}
            >
              {n.type}
            </div>
          </div>
          {/* Connector */}
          {i < nodes.length - 1 && (
            <div className="flex items-center mx-1 flex-shrink-0">
              <div
                className="w-4 h-px"
                style={{ background: "rgba(0,245,212,0.25)" }}
              />
              <div
                className="w-0 h-0"
                style={{
                  borderLeft: "4px solid rgba(0,245,212,0.4)",
                  borderTop: "3px solid transparent",
                  borderBottom: "3px solid transparent",
                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function CaseStudyCard({ project, index, inView }) {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("problem");
  const TABS = ["problem", "process", "outcome"];

  const tabContent = {
    problem: project.problem,
    process: project.process,
    outcome: project.outcome,
  };

  const tabColors = {
    problem: "#F87171",
    process: "#3B82F6",
    outcome: "#10B981",
  };

  return (
    <div
      className="relative border rounded overflow-hidden transition-all duration-500"
      style={{
        borderColor: open
          ? `${project.statusColor}30`
          : "rgba(255,255,255,0.06)",
        background: open ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0.35)",
        backdropFilter: "blur(10px)",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s, border-color 0.3s, background 0.3s`,
      }}
    >
      {/* Left accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-0.5 transition-all duration-300"
        style={{
          background: open
            ? `linear-gradient(to bottom, ${project.statusColor}, transparent)`
            : "transparent",
        }}
      />

      {/* ── Card header (always visible) ── */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left p-5 group"
      >
        <div className="flex items-start justify-between gap-4 flex-wrap">
          {/* Left side */}
          <div className="flex items-start gap-4">
            {/* ID */}
            <span
              className="text-3xl font-black leading-none mt-0.5 flex-shrink-0"
              style={{
                fontFamily: "'Orbitron', monospace",
                color: `${project.statusColor}20`,
              }}
            >
              {project.id}
            </span>
            <div>
              {/* Codename + status */}
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span
                  className="text-[9px] tracking-[0.4em]"
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    color: `${project.statusColor}60`,
                  }}
                >
                  {project.codename}
                </span>
                <span
                  className="text-[8px] px-1.5 py-0.5 rounded-sm tracking-widest"
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    background: `${project.statusColor}18`,
                    color: project.statusColor,
                    border: `1px solid ${project.statusColor}30`,
                  }}
                >
                  {project.status}
                </span>
                <span
                  className="text-[8px] px-1.5 py-0.5 rounded-sm tracking-widest"
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    background: "rgba(255,255,255,0.04)",
                    color: "rgba(156,163,175,0.6)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {project.type}
                </span>
              </div>
              {/* Title */}
              <h3
                className="text-lg md:text-xl font-bold text-white mb-1 group-hover:text-opacity-90 transition-colors"
                style={{
                  fontFamily: "'Orbitron', monospace",
                  letterSpacing: "0.04em",
                }}
              >
                {project.title}
              </h3>
              {/* Tagline */}
              <p
                className="text-sm italic"
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  color: `${project.statusColor}70`,
                }}
              >
                "{project.tagline}"
              </p>
            </div>
          </div>

          {/* Right side — metrics preview */}
          <div className="flex gap-3 flex-wrap">
            {project.metrics.slice(0, 2).map((m) => (
              <div key={m.k} className="text-right">
                <p
                  className="text-lg font-bold"
                  style={{
                    fontFamily: "'Orbitron', monospace",
                    color: project.statusColor,
                  }}
                >
                  {m.v}
                </p>
                <p
                  style={{ fontFamily: "'Share Tech Mono', monospace" }}
                  className="text-[9px] text-gray-600"
                >
                  {m.k}
                </p>
              </div>
            ))}

            {/* Expand chevron */}
            <div
              className="self-center ml-2 text-gray-600 transition-transform duration-300"
              style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2 4L7 10L12 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Stack pills — always visible */}
        <div className="flex gap-1.5 flex-wrap mt-3">
          {project.stack.map((s) => (
            <span
              key={s}
              className="text-[9px] px-2 py-0.5 rounded-sm"
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(156,163,175,0.6)",
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </button>

      {/* ── Expanded case study ── */}
      <div
        className="overflow-hidden transition-all duration-500"
        style={{ maxHeight: open ? "900px" : "0px" }}
      >
        <div className="px-5 pb-5">
          {/* Divider */}
          <div
            className="h-px w-full mb-5"
            style={{
              background: `linear-gradient(to right, ${project.statusColor}30, transparent)`,
            }}
          />

          {/* All 4 metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {project.metrics.map((m) => (
              <div
                key={m.k}
                className="p-3 rounded border"
                style={{
                  borderColor: `${project.statusColor}15`,
                  background: `${project.statusColor}06`,
                }}
              >
                <p
                  className="text-xl font-black mb-0.5"
                  style={{
                    fontFamily: "'Orbitron', monospace",
                    color: project.statusColor,
                  }}
                >
                  {m.v}
                </p>
                <p
                  style={{ fontFamily: "'Share Tech Mono', monospace" }}
                  className="text-[9px] text-gray-500"
                >
                  {m.k}
                </p>
                <p
                  style={{ fontFamily: "'Share Tech Mono', monospace" }}
                  className="text-[9px] text-gray-600"
                >
                  {m.delta}
                </p>
              </div>
            ))}
          </div>

          {/* Tab selector */}
          <div className="flex gap-0 mb-4 border-b border-white/5">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-4 py-2 text-[10px] tracking-[0.35em] transition-all duration-200 relative"
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  color:
                    activeTab === tab
                      ? tabColors[tab]
                      : "rgba(107,114,128,0.6)",
                  borderBottom:
                    activeTab === tab
                      ? `1.5px solid ${tabColors[tab]}`
                      : "1.5px solid transparent",
                  marginBottom: "-1px",
                  background:
                    activeTab === tab ? `${tabColors[tab]}06` : "transparent",
                }}
              >
                {tab === "problem"
                  ? "⚠ PROBLEM"
                  : tab === "process"
                    ? "⚙ PROCESS"
                    : "✓ OUTCOME"}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div
            className="p-4 rounded border mb-5 min-h-[80px]"
            style={{
              borderColor: `${tabColors[activeTab]}15`,
              background: `${tabColors[activeTab]}05`,
            }}
          >
            <div className="flex gap-2 items-start">
              <div
                className="w-px self-stretch flex-shrink-0 mt-1"
                style={{
                  background: tabColors[activeTab],
                  minHeight: "40px",
                  width: "2px",
                  borderRadius: "2px",
                }}
              />
              <p
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  color: "rgba(209,213,219,0.85)",
                }}
                className="text-sm leading-relaxed"
              >
                {tabContent[activeTab]}
              </p>
            </div>
          </div>

          {/* Architecture diagram */}
          <div
            className="border rounded p-3"
            style={{
              borderColor: "rgba(0,245,212,0.08)",
              background: "rgba(0,0,0,0.3)",
            }}
          >
            <p
              style={{ fontFamily: "'Share Tech Mono', monospace" }}
              className="text-[9px] text-cyan-400/30 mb-3 tracking-widest"
            >
              // SYSTEM_ARCHITECTURE
            </p>
            <ArchDiagram nodes={project.arch} />
            {/* Legend */}
            <div className="flex gap-3 flex-wrap mt-3 pt-2 border-t border-white/5">
              {Object.entries(NODE_COLORS).map(([type, color]) => (
                <div key={type} className="flex items-center gap-1">
                  <div
                    className="w-2 h-2 rounded-sm"
                    style={{
                      background: `${color}40`,
                      border: `1px solid ${color}60`,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      color: `${color}70`,
                    }}
                    className="text-[8px] tracking-wider"
                  >
                    {type}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer links */}
          <div className="flex gap-3 mt-4">
            <button
              className="text-[10px] tracking-widest px-4 py-2 rounded-sm transition-all duration-200 hover:opacity-80"
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                border: `1px solid ${project.statusColor}30`,
                color: project.statusColor,
                background: `${project.statusColor}08`,
              }}
            >
              VIEW_LIVE →
            </button>
            <button
              className="text-[10px] tracking-widest px-4 py-2 rounded-sm transition-all duration-200 hover:opacity-80"
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(156,163,175,0.6)",
              }}
            >
              SOURCE_CODE →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef);
  const [filter, setFilter] = useState("ALL");

  const FILTERS = [
    "ALL",
    "Full Stack + AI",
    "Systems + Backend",
    "Backend + Security",
  ];

  const filtered =
    filter === "ALL" ? PROJECTS : PROJECTS.filter((p) => p.type === filter);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col grid-bg overflow-hidden"
      style={{ background: "#030712" }}
    >
      {/* HUD corners */}
      <div className="hud-bracket hud-tl" />
      <div className="hud-bracket hud-tr" />
      <div className="hud-bracket hud-bl" />
      <div className="hud-bracket hud-br" />

      {/* Ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-48 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(59,130,246,0.05) 0%, transparent 70%)",
        }}
      />

      {/* ── Header bar ── */}
      <div
        className="relative z-20 flex items-center justify-between px-8 py-3 border-b border-cyan-400/10"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(-12px)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}
      >
        <div className="flex items-center gap-3">
          <span
            className="w-2 h-2 rounded-full bg-blue-400"
            style={{ boxShadow: "0 0 6px rgba(59,130,246,0.8)" }}
          />
          <span
            style={{ fontFamily: "'Share Tech Mono', monospace" }}
            className="text-xs text-blue-400/60 tracking-[0.3em]"
          >
            SECTION_03 // PROJECTS
          </span>
        </div>
        <span
          style={{ fontFamily: "'Share Tech Mono', monospace" }}
          className="text-xs text-gray-600 tracking-[0.25em]"
        >
          CASE_STUDIES · PROBLEM→PROCESS→OUTCOME
        </span>
        <span
          style={{ fontFamily: "'Share Tech Mono', monospace" }}
          className="text-xs text-cyan-400/30 tracking-[0.3em]"
        >
          {PROJECTS.length} ENTRIES LOADED
        </span>
      </div>

      {/* ── Body ── */}
      <div className="flex-1 relative z-10 px-4 md:px-8 py-10 max-w-5xl mx-auto w-full">
        {/* Section title */}
        <div
          className="mb-8"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
          }}
        >
          <p
            style={{ fontFamily: "'Share Tech Mono', monospace" }}
            className="text-[10px] text-blue-400/40 tracking-[0.5em] mb-2"
          >
            // ENGINEERING_LOG
          </p>
          <h2
            className="text-4xl md:text-5xl font-black tracking-tight mb-2"
            style={{
              fontFamily: "'Orbitron', monospace",
              background:
                "linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.4) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            CASE STUDIES
          </h2>
          <p
            style={{ fontFamily: "'Rajdhani', sans-serif" }}
            className="text-gray-400 text-base max-w-xl"
          >
            Not a portfolio. An engineering record. Each entry documents the
            problem as it actually was, the decision-making process, and what
            shipped.
          </p>
        </div>

        {/* Filter bar */}
        <div
          className="flex gap-2 flex-wrap mb-6"
          style={{
            opacity: inView ? 1 : 0,
            transition: "opacity 0.5s ease 0.3s",
          }}
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="text-[9px] px-3 py-1.5 rounded-sm tracking-widest transition-all duration-200"
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                border:
                  filter === f
                    ? "1px solid rgba(0,245,212,0.4)"
                    : "1px solid rgba(255,255,255,0.07)",
                background:
                  filter === f ? "rgba(0,245,212,0.08)" : "rgba(0,0,0,0.3)",
                color: filter === f ? "#00F5D4" : "rgba(107,114,128,0.7)",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Case study cards */}
        <div className="flex flex-col gap-4">
          {filtered.map((p, i) => (
            <CaseStudyCard key={p.id} project={p} index={i} inView={inView} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className="mt-10 flex items-center gap-4"
          style={{
            opacity: inView ? 1 : 0,
            transition: "opacity 0.6s ease 0.8s",
          }}
        >
          <div
            className="h-px flex-1"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(0,245,212,0.15))",
            }}
          />
          <span
            style={{ fontFamily: "'Share Tech Mono', monospace" }}
            className="text-[10px] text-cyan-400/30 tracking-widest"
          >
            MORE ON GITHUB →
          </span>
          <div
            className="h-px flex-1"
            style={{
              background:
                "linear-gradient(to left, transparent, rgba(0,245,212,0.15))",
            }}
          />
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="relative z-20 flex items-center justify-between px-8 py-3 border-t border-cyan-400/10">
        <span
          style={{ fontFamily: "'Share Tech Mono', monospace" }}
          className="text-xs text-gray-600 tracking-widest"
        >
          END_OF_SECTION_03
        </span>
        <span
          style={{ fontFamily: "'Share Tech Mono', monospace" }}
          className="text-xs text-gray-600 tracking-widest"
        >
          SCROLL → SECTION_04
        </span>
      </div>
    </section>
  );
}
