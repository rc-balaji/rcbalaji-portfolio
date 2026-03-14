"use client";
import { useEffect, useRef, useState } from "react";

const STORY_NODES = [
  {
    year: "2018",
    tag: "ORIGIN",
    color: "#00F5D4",
    title: "First Line of Code",
    body: "Wrote 'Hello World' in C. Didn't sleep for 3 days after. The machine talked back — and I've been in conversation with it ever since.",
  },
  {
    year: "2020",
    tag: "EVOLVE",
    color: "#3B82F6",
    title: "Systems Thinking Unlocked",
    body: "Dived deep into data structures, OS internals, and networks. Realized software isn't magic — it's architecture. Precision over guesswork.",
  },
  {
    year: "2022",
    tag: "BUILD",
    color: "#9B5DE5",
    title: "Full Stack Ignition",
    body: "Shipped first production app. React on the front, Node in the back, Postgres underneath. Users actually used it. That changed everything.",
  },
  {
    year: "2023",
    tag: "EXPAND",
    color: "#F59E0B",
    title: "Intelligence Layer",
    body: "Started engineering AI-powered products. Not just calling APIs — understanding embeddings, RAG pipelines, inference latency. The edge is in the details.",
  },
  {
    year: "NOW",
    tag: "CURRENT",
    color: "#00F5D4",
    title: "Building What Matters",
    body: "Open to challenging roles where systems, intelligence, and craft intersect. I don't just write code. I design the thinking behind it.",
  },
];

const TRAITS = [
  { k: "ARCH_STYLE", v: "Systems-first" },
  { k: "FOCUS", v: "Performance + UX" },
  { k: "WORKFLOW", v: "Solo → Team" },
  { k: "LEARNING", v: "Daily" },
  { k: "TIMEZONE", v: "IST UTC+5:30" },
  { k: "COFFEE_DEP", v: "Critical" },
];

function useInView(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold: 0.15 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

function StoryNode({ node, index, inView }) {
  const isEven = index % 2 === 0;
  return (
    <div
      className="relative flex gap-4 md:gap-8 items-start group"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`,
      }}
    >
      {/* Timeline spine dot */}
      <div className="flex flex-col items-center flex-shrink-0 w-8">
        <div
          className="w-3 h-3 rounded-full border-2 mt-1 z-10 relative transition-all duration-300 group-hover:scale-150"
          style={{
            borderColor: node.color,
            background: "rgba(3,7,18,1)",
            boxShadow: `0 0 10px ${node.color}`,
          }}
        />
        {index < STORY_NODES.length - 1 && (
          <div
            className="w-px flex-1 mt-1"
            style={{
              background: `linear-gradient(to bottom, ${node.color}40, transparent)`,
              minHeight: "60px",
            }}
          />
        )}
      </div>

      {/* Card */}
      <div
        className="flex-1 mb-8 p-4 rounded border transition-all duration-400 group-hover:translate-x-1"
        style={{
          borderColor: `${node.color}20`,
          background: "rgba(0,0,0,0.35)",
          backdropFilter: "blur(8px)",
        }}
      >
        {/* Header row */}
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          <span
            className="text-[10px] px-2 py-0.5 rounded-sm tracking-widest"
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              background: `${node.color}18`,
              color: node.color,
              border: `1px solid ${node.color}30`,
            }}
          >
            {node.tag}
          </span>
          <span
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              color: `${node.color}70`,
            }}
            className="text-[10px]"
          >
            {node.year}
          </span>
          <div
            className="flex-1 h-px"
            style={{
              background: `linear-gradient(to right, ${node.color}30, transparent)`,
            }}
          />
        </div>
        <h3
          className="text-sm font-bold mb-1 tracking-wider"
          style={{ fontFamily: "'Orbitron', monospace", color: node.color }}
        >
          {node.title}
        </h3>
        <p
          style={{ fontFamily: "'Rajdhani', sans-serif" }}
          className="text-gray-400 text-sm leading-relaxed"
        >
          {node.body}
        </p>
      </div>
    </div>
  );
}

export default function AboutSection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef);
  const [scanLine, setScanLine] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);

  /* animated scanline on photo */
  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setScanLine((p) => (p + 1) % 100), 22);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col grid-bg overflow-hidden"
      style={{ background: "#030712" }}
    >
      {/* HUD corner brackets */}
      <div className="hud-bracket hud-tl" />
      <div className="hud-bracket hud-tr" />
      <div className="hud-bracket hud-bl" />
      <div className="hud-bracket hud-br" />

      {/* Ambient blobs */}
      <div
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,245,212,0.04) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(155,93,229,0.05) 0%, transparent 70%)",
        }}
      />

      {/* ── Section header bar ── */}
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
            className="w-2 h-2 rounded-full bg-purple-400"
            style={{ boxShadow: "0 0 6px rgba(155,93,229,0.8)" }}
          />
          <span
            style={{ fontFamily: "'Share Tech Mono', monospace" }}
            className="text-xs text-purple-400/60 tracking-[0.3em]"
          >
            SECTION_02 // ABOUT
          </span>
        </div>
        <span
          style={{ fontFamily: "'Share Tech Mono', monospace" }}
          className="text-xs text-gray-600 tracking-[0.25em]"
        >
          IDENTITY MATRIX LOADED
        </span>
        <span
          style={{ fontFamily: "'Share Tech Mono', monospace" }}
          className="text-xs text-cyan-400/30 tracking-[0.3em]"
        >
          NODE: RC_BALAJI
        </span>
      </div>

      {/* ── Main content ── */}
      <div className="flex-1 flex items-start justify-center relative z-10 px-4 py-10">
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-16 items-start">
          {/* ════ LEFT — Photo + trait panel ════ */}
          <div
            className="flex flex-col gap-5 items-center lg:items-start"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateX(0)" : "translateX(-40px)",
              transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
            }}
          >
            {/* Section label */}
            <div className="flex items-center gap-3 self-start">
              <div className="w-8 h-px bg-cyan-400/50" />
              <span
                style={{ fontFamily: "'Share Tech Mono', monospace" }}
                className="text-[10px] text-cyan-400/50 tracking-[0.4em]"
              >
                SUBJECT PROFILE
              </span>
            </div>

            {/* ── Artistic photo frame ── */}
            <div className="relative w-full max-w-sm">
              {/* Outer frame with HUD notches */}
              <div
                className="relative rounded overflow-hidden"
                style={{
                  border: "1px solid rgba(0,245,212,0.15)",
                  background: "rgba(0,0,0,0.5)",
                }}
              >
                {/* Corner notches */}
                {[
                  "top-0 left-0",
                  "top-0 right-0",
                  "bottom-0 left-0",
                  "bottom-0 right-0",
                ].map((pos, i) => (
                  <div
                    key={i}
                    className={`absolute ${pos} w-4 h-4 z-20`}
                    style={{
                      borderTop:
                        i < 2 ? "1.5px solid rgba(0,245,212,0.7)" : "none",
                      borderBottom:
                        i >= 2 ? "1.5px solid rgba(0,245,212,0.7)" : "none",
                      borderLeft:
                        i % 2 === 0
                          ? "1.5px solid rgba(0,245,212,0.7)"
                          : "none",
                      borderRight:
                        i % 2 !== 0
                          ? "1.5px solid rgba(0,245,212,0.7)"
                          : "none",
                    }}
                  />
                ))}

                {/* Duotone color wash */}
                <div
                  className="absolute inset-0 z-10 pointer-events-none mix-blend-color"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(0,245,212,0.25) 0%, rgba(155,93,229,0.25) 100%)",
                  }}
                />

                {/* Scanline sweep */}
                <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                  <div
                    className="absolute left-0 right-0 h-8 pointer-events-none"
                    style={{
                      top: `${scanLine}%`,
                      background:
                        "linear-gradient(to bottom, transparent, rgba(0,245,212,0.06), transparent)",
                      transition: "top 0.02s linear",
                    }}
                  />
                </div>

                {/* Horizontal scanlines texture */}
                <div
                  className="absolute inset-0 z-10 pointer-events-none opacity-30"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.15) 3px, rgba(0,0,0,0.15) 4px)",
                  }}
                />

                {/* Vignette */}
                <div
                  className="absolute inset-0 z-10 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.65) 100%)",
                  }}
                />

                {/* The photo */}
                <img
                  src="/profile.png"
                  alt="RC Balaji"
                  onLoad={() => setImgLoaded(true)}
                  className="w-full object-contain transition-all duration-700"
                  style={{
                    filter: imgLoaded
                      ? "grayscale(30%) contrast(1.1) brightness(0.9) drop-shadow(0 0 20px rgba(0,245,212,0.3))"
                      : "grayscale(100%) brightness(0.5)",
                    aspectRatio: "3/4",
                    maxHeight: "460px",
                  }}
                />

                {/* Bottom data strip */}
                <div
                  className="absolute bottom-0 left-0 right-0 z-20 px-3 py-2"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(3,7,18,0.95), rgba(3,7,18,0.4))",
                  }}
                >
                  <div className="flex justify-between items-end">
                    <div>
                      <p
                        style={{ fontFamily: "'Orbitron', monospace" }}
                        className="text-xs text-cyan-400 font-bold tracking-wider"
                      >
                        RC BALAJI
                      </p>
                      <p
                        style={{ fontFamily: "'Share Tech Mono', monospace" }}
                        className="text-[9px] text-gray-500 tracking-widest"
                      >
                        SOFTWARE ENGINEER · CHENNAI
                      </p>
                    </div>
                    <div className="text-right">
                      <p
                        style={{ fontFamily: "'Share Tech Mono', monospace" }}
                        className="text-[9px] text-cyan-400/50"
                      >
                        ID: RCB-2024
                      </p>
                      <div className="flex items-center gap-1 justify-end">
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-green-400"
                          style={{ boxShadow: "0 0 4px rgba(74,222,128,0.8)" }}
                        />
                        <span
                          style={{ fontFamily: "'Share Tech Mono', monospace" }}
                          className="text-[9px] text-green-400"
                        >
                          VERIFIED
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Side accent line */}
              <div
                className="absolute -left-3 top-8 bottom-8 w-px"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent, rgba(0,245,212,0.4), transparent)",
                }}
              />
            </div>

            {/* Trait grid */}
            <div
              className="w-full max-w-sm border border-purple-500/15 rounded bg-black/40 backdrop-blur-sm p-4"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s",
              }}
            >
              <p
                style={{ fontFamily: "'Share Tech Mono', monospace" }}
                className="text-[10px] text-purple-400/40 mb-3 tracking-widest"
              >
                // TRAIT_MATRIX
              </p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {TRAITS.map((t) => (
                  <div key={t.k}>
                    <p
                      style={{ fontFamily: "'Share Tech Mono', monospace" }}
                      className="text-[9px] text-gray-600"
                    >
                      {t.k}
                    </p>
                    <p
                      style={{ fontFamily: "'Share Tech Mono', monospace" }}
                      className="text-[10px] text-cyan-400"
                    >
                      {t.v}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ════ RIGHT — Story arc ════ */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateX(0)" : "translateX(40px)",
              transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
            }}
          >
            {/* Section label */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-purple-500/50" />
              <span
                style={{ fontFamily: "'Share Tech Mono', monospace" }}
                className="text-[10px] text-purple-400/50 tracking-[0.4em]"
              >
                ORIGIN_SEQUENCE
              </span>
            </div>

            {/* Big quote */}
            <div className="mb-8 relative pl-5">
              <div
                className="absolute left-0 top-0 bottom-0 w-px"
                style={{
                  background: "linear-gradient(to bottom, #00F5D4, #9B5DE5)",
                }}
              />
              <p
                className="text-xl md:text-2xl font-semibold leading-relaxed text-white/80"
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
              >
                I don't just{" "}
                <span
                  className="text-cyan-400"
                  style={{
                    fontFamily: "'Orbitron', monospace",
                    fontSize: "0.9em",
                  }}
                >
                  write code
                </span>
                . I design the{" "}
                <span
                  className="text-purple-400"
                  style={{
                    fontFamily: "'Orbitron', monospace",
                    fontSize: "0.9em",
                  }}
                >
                  thinking
                </span>{" "}
                behind it.
              </p>
              <p
                style={{ fontFamily: "'Share Tech Mono', monospace" }}
                className="text-[10px] text-gray-600 mt-2 tracking-widest"
              >
                // CORE_PHILOSOPHY
              </p>
            </div>

            {/* Story timeline */}
            <div>
              {STORY_NODES.map((node, i) => (
                <StoryNode
                  key={node.year}
                  node={node}
                  index={i}
                  inView={inView}
                />
              ))}
            </div>

            {/* CTA row */}
            <div
              className="flex gap-3 flex-wrap mt-2"
              style={{
                opacity: inView ? 1 : 0,
                transition: "opacity 0.6s ease 1s",
              }}
            >
              <button
                className="relative group px-6 py-2.5 text-xs tracking-widest overflow-hidden"
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  border: "1px solid rgba(0,245,212,0.35)",
                  borderRadius: "3px",
                  color: "#00F5D4",
                }}
              >
                <div
                  className="absolute inset-0 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-400"
                  style={{ background: "rgba(0,245,212,0.08)" }}
                />
                <span className="relative">DOWNLOAD_RESUME →</span>
              </button>

              <button
                className="relative group px-6 py-2.5 text-xs tracking-widest overflow-hidden"
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  border: "1px solid rgba(155,93,229,0.35)",
                  borderRadius: "3px",
                  color: "#9B5DE5",
                }}
              >
                <div
                  className="absolute inset-0 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-400"
                  style={{ background: "rgba(155,93,229,0.08)" }}
                />
                <span className="relative">LET'S_CONNECT →</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="relative z-20 flex items-center justify-between px-8 py-3 border-t border-cyan-400/10">
        <span
          style={{ fontFamily: "'Share Tech Mono', monospace" }}
          className="text-xs text-gray-600 tracking-widest"
        >
          END_OF_SECTION_02
        </span>
        <span
          style={{ fontFamily: "'Share Tech Mono', monospace" }}
          className="text-xs text-gray-600 tracking-widest"
        >
          SCROLL → SECTION_03
        </span>
      </div>
    </section>
  );
}
