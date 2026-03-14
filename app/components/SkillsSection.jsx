"use client";
import { useEffect, useRef, useState } from "react";

// ─── Data ───────────────────────────────────────────────
const RADAR_SKILLS = [
  { label: "Frontend", value: 92 },
  { label: "Backend", value: 87 },
  { label: "AI / ML", value: 78 },
  { label: "DevOps", value: 71 },
  { label: "Security", value: 65 },
  { label: "Systems", value: 83 },
];

const DOMAINS = [
  {
    name: "Frontend Engineering",
    color: "#00F5D4",
    score: 92,
    tags: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind",
      "Framer Motion",
      "WebSockets",
    ],
    note: "Production apps, design systems, real-time UIs",
  },
  {
    name: "Backend & APIs",
    color: "#3B82F6",
    score: 87,
    tags: ["Node.js", "Express", "PostgreSQL", "Redis", "REST", "GraphQL"],
    note: "High-throughput services, job queues, auth systems",
  },
  {
    name: "AI / ML Engineering",
    color: "#9B5DE5",
    score: 78,
    tags: [
      "OpenAI API",
      "LangChain",
      "RAG",
      "Pinecone",
      "Embeddings",
      "Python",
    ],
    note: "RAG pipelines, vector search, LLM orchestration",
  },
  {
    name: "DevOps & Cloud",
    color: "#F59E0B",
    score: 71,
    tags: ["Docker", "CI/CD", "GitHub Actions", "AWS", "Nginx", "Linux"],
    note: "Containerised deploys, automated pipelines",
  },
  {
    name: "Systems & Security",
    color: "#F87171",
    score: 68,
    tags: [
      "OS Internals",
      "TCP/IP",
      "JWT",
      "OAuth2",
      "Rate Limiting",
      "Cryptography",
    ],
    note: "Secure auth flows, network-layer thinking",
  },
];

const TOOLS = [
  { name: "VS Code", level: 5, cat: "env" },
  { name: "Git", level: 5, cat: "env" },
  { name: "Docker", level: 4, cat: "infra" },
  { name: "Figma", level: 3, cat: "design" },
  { name: "Postman", level: 5, cat: "env" },
  { name: "GitHub Actions", level: 4, cat: "infra" },
  { name: "AWS EC2", level: 3, cat: "infra" },
  { name: "Postgres", level: 5, cat: "data" },
  { name: "Redis", level: 4, cat: "data" },
  { name: "Pinecone", level: 4, cat: "data" },
  { name: "Linux", level: 4, cat: "env" },
  { name: "Nginx", level: 3, cat: "infra" },
  { name: "Jest", level: 4, cat: "env" },
  { name: "Prisma", level: 4, cat: "data" },
  { name: "Vercel", level: 5, cat: "infra" },
  { name: "OpenAI SDK", level: 5, cat: "ai" },
  { name: "LangChain", level: 4, cat: "ai" },
  { name: "Hugging Face", level: 3, cat: "ai" },
];

const CAT_COLORS = {
  env: "#00F5D4",
  infra: "#3B82F6",
  data: "#F59E0B",
  design: "#9B5DE5",
  ai: "#F87171",
};

// ─── Hook ────────────────────────────────────────────────
function useInView(ref, threshold = 0.15) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

// ─── Radar Chart (pure SVG) ───────────────────────────────
function RadarChart({ skills, animate }) {
  const cx = 160,
    cy = 160,
    r = 110;
  const levels = [0.25, 0.5, 0.75, 1];
  const angleStep = (2 * Math.PI) / skills.length;
  const getPoint = (i, ratio) => {
    const angle = i * angleStep - Math.PI / 2;
    return {
      x: cx + r * ratio * Math.cos(angle),
      y: cy + r * ratio * Math.sin(angle),
    };
  };

  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (!animate) return;
    let start = null;
    const dur = 1200;
    const tick = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      setProgress(p < 1 ? p : 1);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [animate]);

  const dataPoints = skills.map((s, i) =>
    getPoint(i, (s.value / 100) * progress),
  );
  const dataPath =
    dataPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") +
    " Z";

  return (
    <svg
      viewBox="0 0 320 320"
      className="w-full max-w-xs mx-auto"
      style={{ overflow: "visible" }}
    >
      {/* Grid rings */}
      {levels.map((lvl) => {
        const pts = skills.map((_, i) => getPoint(i, lvl));
        const path =
          pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") +
          " Z";
        return (
          <path
            key={lvl}
            d={path}
            fill="none"
            stroke="rgba(0,245,212,0.08)"
            strokeWidth="1"
          />
        );
      })}

      {/* Axis lines */}
      {skills.map((_, i) => {
        const outer = getPoint(i, 1);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={outer.x}
            y2={outer.y}
            stroke="rgba(0,245,212,0.1)"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
        );
      })}

      {/* Filled polygon */}
      <path
        d={dataPath}
        fill="rgba(0,245,212,0.08)"
        stroke="#00F5D4"
        strokeWidth="1.5"
        style={{ filter: "drop-shadow(0 0 6px rgba(0,245,212,0.5))" }}
      />

      {/* Data points */}
      {dataPoints.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="3"
          fill="#00F5D4"
          style={{ filter: "drop-shadow(0 0 4px rgba(0,245,212,0.9))" }}
        />
      ))}

      {/* Labels */}
      {skills.map((s, i) => {
        const lp = getPoint(i, 1.22);
        return (
          <text
            key={i}
            x={lp.x}
            y={lp.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="rgba(156,163,175,0.75)"
            fontSize="9"
            fontFamily="'Share Tech Mono', monospace"
            letterSpacing="1"
          >
            {s.label.toUpperCase()}
          </text>
        );
      })}

      {/* Value labels on points */}
      {skills.map((s, i) => {
        const vp = getPoint(i, (s.value / 100) * progress + 0.12);
        return (
          <text
            key={`v${i}`}
            x={vp.x}
            y={vp.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#00F5D4"
            fontSize="8"
            fontFamily="'Orbitron', monospace"
            opacity={progress > 0.7 ? 1 : 0}
          >
            {s.value}
          </text>
        );
      })}

      {/* Center label */}
      <text
        x={cx}
        y={cy - 6}
        textAnchor="middle"
        fill="rgba(0,245,212,0.5)"
        fontSize="8"
        fontFamily="'Share Tech Mono', monospace"
        letterSpacing="2"
      >
        SKILL
      </text>
      <text
        x={cx}
        y={cy + 7}
        textAnchor="middle"
        fill="rgba(0,245,212,0.5)"
        fontSize="8"
        fontFamily="'Share Tech Mono', monospace"
        letterSpacing="2"
      >
        MATRIX
      </text>
    </svg>
  );
}

// ─── Arc Gauge ────────────────────────────────────────────
function ArcGauge({ domain, animate, delay = 0 }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (!animate) return;
    const t = setTimeout(() => {
      let start = null;
      const dur = 1000;
      const tick = (ts) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        // ease-out cubic
        setProgress(1 - Math.pow(1 - p, 3));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(t);
  }, [animate, delay]);

  const W = 120,
    H = 70;
  const cx = 60,
    cy = 66;
  const R = 50;
  // Arc from 200deg to 340deg (140deg sweep)
  const startAngle = 200 * (Math.PI / 180);
  const sweepTotal = 140 * (Math.PI / 180);
  const endAngle = startAngle + sweepTotal * progress * (domain.score / 100);

  const polarToXY = (angle, radius) => ({
    x: cx + radius * Math.cos(angle),
    y: cy + radius * Math.sin(angle),
  });

  const arcPath = (r, start, end, large) => {
    const s = polarToXY(start, r);
    const e = polarToXY(end, r);
    return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large ? 1 : 0} 1 ${e.x} ${e.y}`;
  };

  const fullSweepEnd = startAngle + sweepTotal;
  const activeSweepEnd =
    startAngle + sweepTotal * progress * (domain.score / 100);
  const largeArc =
    sweepTotal * (domain.score / 100) * progress > Math.PI ? 1 : 0;

  return (
    <div
      className="border rounded p-3 transition-all duration-300 hover:border-opacity-40 cursor-default group"
      style={{
        borderColor: `${domain.color}18`,
        background: "rgba(0,0,0,0.35)",
        backdropFilter: "blur(6px)",
      }}
    >
      {/* SVG arc */}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        style={{ maxHeight: "70px" }}
      >
        {/* Track */}
        <path
          d={arcPath(R, startAngle, fullSweepEnd, 1)}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="6"
          strokeLinecap="round"
        />
        {/* Fill */}
        <path
          d={arcPath(R, startAngle, activeSweepEnd, largeArc)}
          fill="none"
          stroke={domain.color}
          strokeWidth="6"
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 4px ${domain.color}80)` }}
        />
        {/* Score text */}
        <text
          x={cx}
          y={cy - 12}
          textAnchor="middle"
          fill={domain.color}
          fontSize="16"
          fontFamily="'Orbitron', monospace"
          fontWeight="700"
        >
          {Math.round(domain.score * progress)}
        </text>
        <text
          x={cx}
          y={cy - 2}
          textAnchor="middle"
          fill={`${domain.color}60`}
          fontSize="6"
          fontFamily="'Share Tech Mono', monospace"
          letterSpacing="1"
        >
          / 100
        </text>
      </svg>

      {/* Domain name */}
      <p
        className="text-center text-[10px] font-bold tracking-wider mb-2"
        style={{ fontFamily: "'Orbitron', monospace", color: domain.color }}
      >
        {domain.name.split(" ")[0].toUpperCase()}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 justify-center">
        {domain.tags.slice(0, 4).map((t) => (
          <span
            key={t}
            className="text-[8px] px-1.5 py-0.5 rounded-sm"
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              background: `${domain.color}10`,
              border: `1px solid ${domain.color}20`,
              color: `${domain.color}80`,
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* Note */}
      <p
        className="text-center text-[9px] text-gray-600 mt-2 leading-relaxed"
        style={{ fontFamily: "'Share Tech Mono', monospace" }}
      >
        {domain.note}
      </p>
    </div>
  );
}

// ─── Dot Matrix ───────────────────────────────────────────
function DotMatrix({ tools, animate }) {
  const DOTS = 5;
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {tools.map((tool, ti) => (
        <div
          key={tool.name}
          className="flex items-center gap-2 p-2 rounded border group"
          style={{
            borderColor: "rgba(255,255,255,0.05)",
            background: "rgba(0,0,0,0.25)",
            opacity: animate ? 1 : 0,
            transform: animate ? "translateY(0)" : "translateY(10px)",
            transition: `opacity 0.4s ease ${ti * 0.04}s, transform 0.4s ease ${ti * 0.04}s`,
          }}
        >
          {/* Dot row */}
          <div className="flex gap-0.5 flex-shrink-0">
            {Array.from({ length: DOTS }).map((_, di) => {
              const filled = di < tool.level;
              const color = CAT_COLORS[tool.cat];
              return (
                <div
                  key={di}
                  className="w-1.5 h-1.5 rounded-sm transition-all duration-300"
                  style={{
                    background: filled ? color : "rgba(255,255,255,0.06)",
                    boxShadow: filled ? `0 0 4px ${color}80` : "none",
                    transitionDelay: animate
                      ? `${ti * 0.04 + di * 0.06}s`
                      : "0s",
                  }}
                />
              );
            })}
          </div>
          {/* Name */}
          <span
            className="text-[9px] text-gray-400 group-hover:text-gray-200 transition-colors truncate"
            style={{ fontFamily: "'Share Tech Mono', monospace" }}
          >
            {tool.name}
          </span>
          {/* Cat badge */}
          <span
            className="text-[7px] ml-auto flex-shrink-0 px-1 rounded-sm"
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              color: `${CAT_COLORS[tool.cat]}70`,
              background: `${CAT_COLORS[tool.cat]}10`,
            }}
          >
            {tool.cat}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────
export default function SkillsSection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, 0.1);

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

      {/* Ambient */}
      <div
        className="absolute bottom-0 left-1/4 w-80 h-80 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,245,212,0.04) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-1/3 right-0 w-80 h-80 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(155,93,229,0.04) 0%, transparent 70%)",
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
            className="w-2 h-2 rounded-full bg-yellow-400"
            style={{ boxShadow: "0 0 6px rgba(245,158,11,0.8)" }}
          />
          <span
            style={{ fontFamily: "'Share Tech Mono', monospace" }}
            className="text-xs text-yellow-400/60 tracking-[0.3em]"
          >
            SECTION_04 // SKILLS
          </span>
        </div>
        <span
          style={{ fontFamily: "'Share Tech Mono', monospace" }}
          className="text-xs text-gray-600 tracking-[0.25em]"
        >
          CAPABILITY_MATRIX · VISUALISED
        </span>
        <span
          style={{ fontFamily: "'Share Tech Mono', monospace" }}
          className="text-xs text-cyan-400/30 tracking-[0.3em]"
        >
          {TOOLS.length} TOOLS INDEXED
        </span>
      </div>

      {/* ── Body ── */}
      <div className="flex-1 relative z-10 px-4 md:px-8 py-10 max-w-7xl mx-auto w-full">
        {/* Section title */}
        <div
          className="mb-10"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
          }}
        >
          <p
            style={{ fontFamily: "'Share Tech Mono', monospace" }}
            className="text-[10px] text-yellow-400/40 tracking-[0.5em] mb-2"
          >
            // CAPABILITY_SCAN
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
            SKILL MAP
          </h2>
          <p
            style={{ fontFamily: "'Rajdhani', sans-serif" }}
            className="text-gray-400 text-base max-w-xl"
          >
            Every number is earned, not estimated. Scores reflect production
            usage and time under pressure — not tutorial completions.
          </p>
        </div>

        {/* ══ Zone 1: Radar + Arcs row ══ */}
        <div
          className="grid grid-cols-1 xl:grid-cols-[320px_1fr] gap-8 mb-10"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
          }}
        >
          {/* Radar panel */}
          <div
            className="border rounded p-5 flex flex-col items-center"
            style={{
              borderColor: "rgba(0,245,212,0.12)",
              background: "rgba(0,0,0,0.45)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div className="flex items-center gap-2 self-start mb-4">
              <div className="w-5 h-px bg-cyan-400/50" />
              <span
                style={{ fontFamily: "'Share Tech Mono', monospace" }}
                className="text-[10px] text-cyan-400/50 tracking-widest"
              >
                RADAR_SCAN
              </span>
            </div>
            <RadarChart skills={RADAR_SKILLS} animate={inView} />
            {/* Legend row */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 mt-2 w-full">
              {RADAR_SKILLS.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center justify-between"
                >
                  <span
                    style={{ fontFamily: "'Share Tech Mono', monospace" }}
                    className="text-[9px] text-gray-500"
                  >
                    {s.label}
                  </span>
                  <span
                    style={{ fontFamily: "'Share Tech Mono', monospace" }}
                    className="text-[9px] text-cyan-400"
                  >
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Arc gauges grid */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-0">
              <div className="w-5 h-px bg-purple-400/50" />
              <span
                style={{ fontFamily: "'Share Tech Mono', monospace" }}
                className="text-[10px] text-purple-400/50 tracking-widest"
              >
                DOMAIN_GAUGES
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
              {DOMAINS.map((d, i) => (
                <ArcGauge
                  key={d.name}
                  domain={d}
                  animate={inView}
                  delay={i * 100}
                />
              ))}
            </div>

            {/* Horizontal bar breakdown — expanded tags per domain */}
            <div
              className="border rounded p-4 mt-2"
              style={{
                borderColor: "rgba(255,255,255,0.06)",
                background: "rgba(0,0,0,0.3)",
              }}
            >
              <p
                style={{ fontFamily: "'Share Tech Mono', monospace" }}
                className="text-[10px] text-gray-600 mb-4 tracking-widest"
              >
                // DOMAIN_BREAKDOWN
              </p>
              {DOMAINS.map((d, i) => (
                <div key={d.name} className="mb-3 last:mb-0 group">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          background: d.color,
                          boxShadow: `0 0 4px ${d.color}`,
                        }}
                      />
                      <span
                        style={{ fontFamily: "'Rajdhani', sans-serif" }}
                        className="text-xs text-gray-300 font-semibold"
                      >
                        {d.name}
                      </span>
                    </div>
                    <span
                      style={{ fontFamily: "'Share Tech Mono', monospace" }}
                      className="text-[10px]"
                      style2={{ color: d.color }}
                    >
                      <span style={{ color: d.color }}>{d.score}</span>
                      <span className="text-gray-700">/100</span>
                    </span>
                  </div>
                  {/* Bar */}
                  <div className="h-px bg-gray-800 rounded overflow-hidden">
                    <div
                      className="h-full rounded transition-all duration-1000"
                      style={{
                        width: inView ? `${d.score}%` : "0%",
                        background: `linear-gradient(to right, ${d.color}, ${d.color}60)`,
                        boxShadow: `0 0 6px ${d.color}50`,
                        transitionDelay: `${0.3 + i * 0.1}s`,
                      }}
                    />
                  </div>
                  {/* Tags inline */}
                  <div className="flex gap-1.5 mt-1.5 flex-wrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {d.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[8px] px-1.5 py-px rounded-sm"
                        style={{
                          fontFamily: "'Share Tech Mono', monospace",
                          background: `${d.color}08`,
                          border: `1px solid ${d.color}20`,
                          color: `${d.color}70`,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ Zone 2: Dot Matrix tools ══ */}
        <div
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.7s ease 0.5s, transform 0.7s ease 0.5s",
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-5 h-px bg-yellow-400/50" />
            <span
              style={{ fontFamily: "'Share Tech Mono', monospace" }}
              className="text-[10px] text-yellow-400/50 tracking-widest"
            >
              TOOLS_INDEX · DOT_MATRIX
            </span>
            {/* Category legend */}
            <div className="flex gap-3 flex-wrap ml-auto">
              {Object.entries(CAT_COLORS).map(([cat, col]) => (
                <div key={cat} className="flex items-center gap-1">
                  <div
                    className="w-1.5 h-1.5 rounded-sm"
                    style={{ background: col }}
                  />
                  <span
                    style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      color: `${col}70`,
                    }}
                    className="text-[8px] tracking-wider"
                  >
                    {cat}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div
            className="border rounded p-4"
            style={{
              borderColor: "rgba(255,255,255,0.06)",
              background: "rgba(0,0,0,0.3)",
            }}
          >
            <DotMatrix tools={TOOLS} animate={inView} />
            <p
              style={{ fontFamily: "'Share Tech Mono', monospace" }}
              className="text-[9px] text-gray-700 mt-4 text-right tracking-widest"
            >
              ●●●●● = EXPERT · ●●●● = PROFICIENT · ●●● = WORKING · ●● = LEARNING
            </p>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="relative z-20 flex items-center justify-between px-8 py-3 border-t border-cyan-400/10">
        <span
          style={{ fontFamily: "'Share Tech Mono', monospace" }}
          className="text-xs text-gray-600 tracking-widest"
        >
          END_OF_SECTION_04
        </span>
        <span
          style={{ fontFamily: "'Share Tech Mono', monospace" }}
          className="text-xs text-gray-600 tracking-widest"
        >
          SCROLL → SECTION_05
        </span>
      </div>
    </section>
  );
}
