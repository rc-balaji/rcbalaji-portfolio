"use client";
import { useEffect, useState } from "react";
import GlitchText from "./GlitchText.js";
import TypewriterText from "./TypewriterText.js";

const ROLES = [
  "Software Engineer",
  "Systems Architect",
  "AI Developer",
  "Full Stack Engineer",
];
const STACK = [
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "TypeScript",
  "AI/ML",
  "Docker",
];
const METRICS = [
  { l: "PROJECTS", v: "24+" },
  { l: "EXPERIENCE", v: "3 YRS" },
  { l: "COMMITS", v: "1.2K" },
  { l: "UPTIME", v: "99%" },
];
const SKILLS = [
  { n: "Frontend", p: 92 },
  { n: "Backend", p: 85 },
  { n: "DevOps", p: 70 },
  { n: "AI / ML", p: 78 },
];
const BARS = [40, 65, 50, 82, 60, 90, 72];

export default function HeroSection() {
  const [time, setTime] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen flex flex-col scanlines noise grid-bg">
      {/* HUD corner brackets */}
      <div className="hud-bracket hud-tl" />
      <div className="hud-bracket hud-tr" />
      <div className="hud-bracket hud-bl" />
      <div className="hud-bracket hud-br" />

      {/* ── Top bar ── */}
      <div className="relative z-20 flex items-center justify-between px-8 py-3 border-b border-cyan-400/10 reveal delay-1">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-cyan-400 status-dot" />
          <span
            style={{ fontFamily: "'Share Tech Mono', monospace" }}
            className="text-xs text-cyan-400/60 tracking-[0.3em]"
          >
            SYSTEM ONLINE
          </span>
        </div>
        <span
          style={{ fontFamily: "'Share Tech Mono', monospace" }}
          className="text-xs text-gray-600 tracking-[0.25em]"
        >
          RC.BALAJI // PORTFOLIO v2.0
        </span>
        <span
          style={{ fontFamily: "'Share Tech Mono', monospace" }}
          className="text-xs text-cyan-400/60 tracking-[0.3em]"
        >
          {time}
        </span>
      </div>

      {/* ── Main layout ── */}
      <div className="flex-1 flex items-center justify-center relative z-10 px-4">
        {/* Left panel */}
        <aside className="hidden xl:flex flex-col gap-3 absolute left-8 top-1/2 -translate-y-1/2 w-48">
          {/* Metrics */}
          <div className="border border-cyan-400/15 rounded bg-black/40 backdrop-blur-sm p-3 reveal delay-2">
            <p
              style={{ fontFamily: "'Share Tech Mono', monospace" }}
              className="text-[10px] text-cyan-400/40 mb-2 tracking-widest"
            ></p>
            {METRICS.map((m) => (
              <div key={m.l} className="flex justify-between mb-1">
                <span
                  style={{ fontFamily: "'Share Tech Mono', monospace" }}
                  className="text-[10px] text-gray-500"
                >
                  {m.l}
                </span>
                <span
                  style={{ fontFamily: "'Share Tech Mono', monospace" }}
                  className="text-[10px] text-cyan-400"
                >
                  {m.v}
                </span>
              </div>
            ))}
          </div>

          {/* Status */}
          <div className="border border-green-500/15 rounded bg-black/40 backdrop-blur-sm p-3 reveal delay-3">
            <p
              style={{ fontFamily: "'Share Tech Mono', monospace" }}
              className="text-[10px] text-green-400/40 mb-2 tracking-widest"
            ></p>
            {["AVAILABLE", "REMOTE OK", "OPEN TO WORK"].map((s) => (
              <div key={s} className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span
                  style={{ fontFamily: "'Share Tech Mono', monospace" }}
                  className="text-[10px] text-gray-400"
                >
                  {s}
                </span>
              </div>
            ))}
          </div>

          {/* Mini bar chart */}
          <div className="border border-cyan-400/15 rounded bg-black/40 backdrop-blur-sm p-3 reveal delay-4">
            <p
              style={{ fontFamily: "'Share Tech Mono', monospace" }}
              className="text-[10px] text-cyan-400/40 mb-2 tracking-widest"
            ></p>
            <div className="flex items-end gap-1 h-10">
              {BARS.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm"
                  style={{
                    height: `${h}%`,
                    background: `rgba(0,245,212,${0.2 + i * 0.06})`,
                  }}
                />
              ))}
            </div>
          </div>
        </aside>

        {/* ── Center content ── */}
        <div className="text-center flex flex-col items-center max-w-2xl w-full">
          {/* Profile image — frameless, large, glowing */}
          <div
            className="relative mx-auto mb-6 reveal delay-1 float-animation"
            style={{
              width: "clamp(180px, 28vw, 320px)",
              height: "clamp(180px, 28vw, 320px)",
            }}
          >
            {/* Deep glow pool beneath the figure */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2"
              style={{
                width: "80%",
                height: "40%",
                background:
                  "radial-gradient(ellipse, rgba(0,245,212,0.35) 0%, transparent 70%)",
                filter: "blur(18px)",
                borderRadius: "50%",
              }}
            />

            {/* Ambient halo behind figure */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 50% 60%, rgba(0,245,212,0.12) 0%, rgba(155,93,229,0.08) 50%, transparent 75%)",
                filter: "blur(24px)",
              }}
            />

            {/* Outer orbit ring — decorative only */}
            <div
              className="absolute -inset-6 rounded-full border border-dashed border-cyan-400/20"
              style={{ animation: "spinSlow 22s linear infinite" }}
            />
            <div
              className="absolute -inset-10 rounded-full border border-dotted border-purple-500/10"
              style={{ animation: "spinSlow 16s linear infinite reverse" }}
            />

            {/* The actual image — NO clip, NO border-radius */}
            <img
              src="/future.png"
              alt="RC Balaji"
              className="relative w-full h-[400px] object-contain drop-shadow-2xl"
              style={{
                filter:
                  "drop-shadow(0 0 32px rgba(0,245,212,0.55)) drop-shadow(0 8px 40px rgba(0,245,212,0.2))",
              }}
            />
          </div>

          {/* Eyebrow */}
          <p
            style={{ fontFamily: "'Share Tech Mono', monospace" }}
            className="text-xs text-cyan-400/40 tracking-[0.5em] mb-3 reveal delay-2"
          >
            ENGINEER // ARCHITECT // BUILDER
          </p>

          {/* Name */}
          <h1
            className="text-7xl md:text-8xl font-black tracking-tight mb-4 reveal delay-3 animate-gradient"
            style={{
              fontFamily: "'Orbitron', monospace",
              background:
                "linear-gradient(135deg, #00F5D4 0%, #3B82F6 45%, #9B5DE5 100%)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 28px rgba(0,245,212,0.45))",
            }}
          >
            <GlitchText text="RC BALAJI" />
          </h1>

          {/* Role typewriter */}
          <div className="flex items-center gap-2 mb-8 reveal delay-4">
            <span
              style={{ fontFamily: "'Share Tech Mono', monospace" }}
              className="text-cyan-400/50 text-sm"
            >
              ›
            </span>
            <span className="text-lg">
              <TypewriterText phrases={ROLES} />
            </span>
          </div>

          {/* Separator */}
          <div className="flex items-center gap-4 mb-8 w-full max-w-xs reveal delay-4">
            <div
              className="flex-1 h-px"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(0,245,212,0.3))",
              }}
            />
            <span className="text-cyan-400/30 text-xs">◆</span>
            <div
              className="flex-1 h-px"
              style={{
                background:
                  "linear-gradient(to left, transparent, rgba(155,93,229,0.3))",
              }}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 justify-center mb-8 reveal delay-5">
            <button
              className="relative group btn-sweep btn-cyan px-8 py-3 overflow-hidden text-sm tracking-widest"
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                border: "1px solid rgba(0,245,212,0.4)",
                borderRadius: "3px",
              }}
            >
              <div className="absolute inset-0 bg-cyan-400/0 group-hover:bg-cyan-400/8 transition-colors duration-300" />
              <span className="relative text-cyan-400 group-hover:text-white transition-colors duration-300">
                VIEW_PROJECTS
              </span>
            </button>

            <button
              className="relative group btn-sweep btn-purple px-8 py-3 overflow-hidden text-sm tracking-widest"
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                border: "1px solid rgba(155,93,229,0.4)",
                borderRadius: "3px",
              }}
            >
              <div className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/8 transition-colors duration-300" />
              <span className="relative text-purple-400 group-hover:text-white transition-colors duration-300">
                CONTACT_ME
              </span>
            </button>
          </div>

          {/* Tech stack tags */}
          <div className="flex flex-wrap gap-2 justify-center reveal delay-6">
            {STACK.map((t) => (
              <span
                key={t}
                className="px-3 py-1 text-xs border border-gray-700/50 rounded-sm hover:border-cyan-400/40 hover:text-cyan-400 text-gray-500 transition-all duration-300"
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  background: "rgba(0,0,0,0.35)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Right panel */}
        <aside className="hidden xl:flex flex-col gap-3 absolute right-8 top-1/2 -translate-y-1/2 w-48">
          {/* Skills */}
          <div className="border border-purple-500/15 rounded bg-black/40 backdrop-blur-sm p-3 reveal delay-2">
            <p
              style={{ fontFamily: "'Share Tech Mono', monospace" }}
              className="text-[10px] text-purple-400/40 mb-3 tracking-widest"
            ></p>
            {SKILLS.map((s) => (
              <div key={s.n} className="mb-3">
                <div className="flex justify-between mb-1">
                  <span
                    style={{ fontFamily: "'Share Tech Mono', monospace" }}
                    className="text-[10px] text-gray-500"
                  >
                    {s.n}
                  </span>
                  <span
                    style={{ fontFamily: "'Share Tech Mono', monospace" }}
                    className="text-[10px] text-purple-400"
                  >
                    {s.p}%
                  </span>
                </div>
                <div className="h-px bg-gray-800 rounded overflow-hidden">
                  <div
                    className="h-full skill-bar rounded"
                    style={{
                      width: `${s.p}%`,
                      background: "linear-gradient(to right, #00F5D4, #9B5DE5)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Connect */}
          <div className="border border-cyan-400/15 rounded bg-black/40 backdrop-blur-sm p-3 reveal delay-3">
            <p
              style={{ fontFamily: "'Share Tech Mono', monospace" }}
              className="text-[10px] text-cyan-400/40 mb-2 tracking-widest"
            ></p>
            {["GITHUB", "LINKEDIN", "TWITTER", "EMAIL"].map((l) => (
              <p
                key={l}
                data-hover
                style={{ fontFamily: "'Share Tech Mono', monospace" }}
                className="text-[10px] text-gray-500 hover:text-cyan-400 transition-colors py-0.5 flex items-center gap-1 cursor-pointer"
              >
                <span className="text-cyan-400/20">→</span> {l}
              </p>
            ))}
          </div>

          {/* Code snippet decoration */}
          <div className="border border-purple-500/10 rounded bg-black/40 backdrop-blur-sm p-3 reveal delay-4">
            <p
              style={{ fontFamily: "'Share Tech Mono', monospace" }}
              className="text-[10px] text-purple-400/40 mb-2 tracking-widest"
            ></p>
            <div
              style={{ fontFamily: "'Share Tech Mono', monospace" }}
              className="text-[9px] leading-4"
            >
              <p>
                <span className="text-purple-400">const</span>{" "}
                <span className="text-cyan-400">dev</span> = {"{"}
              </p>
              <p className="ml-2">
                <span className="text-gray-500">name:</span>{" "}
                <span className="text-green-400">'RC Balaji'</span>,
              </p>
              <p className="ml-2">
                <span className="text-gray-500">loves:</span>{" "}
                <span className="text-green-400">'code'</span>,
              </p>
              <p className="ml-2">
                <span className="text-gray-500">status:</span>{" "}
                <span className="text-yellow-400">true</span>
              </p>
              <p>{"}"}</p>
            </div>
          </div>
        </aside>
      </div>

      {/* ── Bottom bar ── */}
      <div className="relative z-20 flex items-center justify-between px-8 py-3 border-t border-cyan-400/10 reveal delay-1">
        <span
          style={{ fontFamily: "'Share Tech Mono', monospace" }}
          className="text-xs text-gray-600 tracking-widest"
        >
          CODE • SYSTEMS • INTELLIGENCE
        </span>
        <span
          style={{ fontFamily: "'Share Tech Mono', monospace" }}
          className="text-xs text-gray-600 tracking-widest"
        >
          CHENNAI · IN • 13.08°N 80.27°E
        </span>
      </div>
    </div>
  );
}
