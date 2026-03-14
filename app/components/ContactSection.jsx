"use client";
import { useEffect, useRef, useState } from "react";

// ─── Data ────────────────────────────────────────────────
const INTENTS = [
  {
    id: "hire",
    label: "HIRE",
    icon: "◈",
    color: "#00F5D4",
    headline: "Looking for your next engineer?",
    sub: "Available for full-time, contract & freelance roles",
    placeholder: "Tell me about the role, stack, and what you're building...",
    cta: "TRANSMIT_APPLICATION",
    tag: "OPEN_TO_WORK",
  },
  {
    id: "collab",
    label: "COLLAB",
    icon: "⬡",
    color: "#9B5DE5",
    headline: "Got an idea that needs an engineer?",
    sub: "Side projects, OSS contributions, hackathons — I'm in",
    placeholder: "What are you building? What's the vision?",
    cta: "INITIATE_COLLAB",
    tag: "BUILDER_MODE",
  },
  {
    id: "talk",
    label: "JUST TALK",
    icon: "◎",
    color: "#3B82F6",
    headline: "No agenda needed.",
    sub: "Tech rabbit holes, engineering philosophy, or a virtual coffee",
    placeholder: "What's on your mind?",
    cta: "OPEN_CHANNEL",
    tag: "ALWAYS_ON",
  },
];

const CHANNELS = [
  {
    label: "EMAIL",
    value: "rcbalaji@gmail.com",
    icon: "✉",
    color: "#00F5D4",
    href: "mailto:rcbalaji@gmail.com",
  },
  {
    label: "LINKEDIN",
    value: "linkedin.com/in/rcbalaji",
    icon: "in",
    color: "#3B82F6",
    href: "https://linkedin.com/in/rcbalaji",
  },
  {
    label: "GITHUB",
    value: "github.com/rcbalaji",
    icon: "⌥",
    color: "#9B5DE5",
    href: "https://github.com/rcbalaji",
  },
  {
    label: "TWITTER",
    value: "@rcbalaji_dev",
    icon: "✕",
    color: "#F59E0B",
    href: "https://twitter.com/rcbalaji_dev",
  },
];

const STATUS_LINES = [
  "SYSTEM NOMINAL · ALL CHANNELS OPEN",
  "RESPONSE TIME · < 24 HOURS",
  "TIMEZONE · IST UTC+5:30",
  "STATUS · AVAILABLE FOR NEW PROJECTS",
];

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

// ─── Signal strength bar ─────────────────────────────────
function SignalMeter({ value, max, color }) {
  const pct = Math.min(value / max, 1);
  const bars = 20;
  const filled = Math.round(pct * bars);
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: bars }).map((_, i) => (
        <div
          key={i}
          className="rounded-sm transition-all duration-100"
          style={{
            width: "3px",
            height: `${6 + (i % 3) * 2}px`,
            background: i < filled ? color : "rgba(255,255,255,0.07)",
            boxShadow: i < filled ? `0 0 3px ${color}80` : "none",
          }}
        />
      ))}
      <span
        style={{ fontFamily: "'Share Tech Mono', monospace" }}
        className="text-[9px] ml-1"
        style2={{ color: `${color}80` }}
      >
        <span style={{ color: `${color}80` }}>{value}</span>
        <span className="text-gray-700">/{max}</span>
      </span>
    </div>
  );
}

// ─── Copy channel card ───────────────────────────────────
function ChannelCard({ ch, index, inView }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(ch.value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div
      className="relative border rounded overflow-hidden group cursor-pointer transition-all duration-300 hover:border-opacity-40"
      style={{
        borderColor: `${ch.color}18`,
        background: "rgba(0,0,0,0.4)",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s, border-color 0.3s`,
      }}
      onClick={copy}
    >
      {/* Hover fill sweep */}
      <div
        className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-400 pointer-events-none"
        style={{ background: `${ch.color}06` }}
      />

      {/* Left glow bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: ch.color }}
      />

      <div className="relative p-3 flex items-center gap-3">
        {/* Icon */}
        <div
          className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0 text-sm font-bold"
          style={{
            background: `${ch.color}12`,
            border: `1px solid ${ch.color}25`,
            color: ch.color,
            fontFamily: "'Orbitron', monospace",
          }}
        >
          {ch.icon}
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p
            style={{ fontFamily: "'Share Tech Mono', monospace" }}
            className="text-[9px] tracking-widest mb-0.5"
            style2={{ color: `${ch.color}60` }}
          >
            <span style={{ color: `${ch.color}60` }}>{ch.label}</span>
          </p>
          <p
            style={{ fontFamily: "'Share Tech Mono', monospace" }}
            className="text-[10px] text-gray-400 truncate group-hover:text-gray-200 transition-colors"
          >
            {ch.value}
          </p>
        </div>

        {/* Copy indicator */}
        <div
          className="flex-shrink-0 transition-all duration-200"
          style={{ color: copied ? ch.color : "rgba(107,114,128,0.4)" }}
        >
          {copied ? (
            <span
              style={{ fontFamily: "'Share Tech Mono', monospace" }}
              className="text-[9px] tracking-wider"
            >
              COPIED
            </span>
          ) : (
            <span className="text-xs">⎘</span>
          )}
        </div>
      </div>

      {/* Link arrow */}
      <a
        href={ch.href}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-2 right-2 text-[9px] opacity-0 group-hover:opacity-60 transition-opacity"
        style={{ color: ch.color }}
        onClick={(e) => e.stopPropagation()}
      >
        ↗
      </a>
    </div>
  );
}

// ─── Transmission terminal ───────────────────────────────
function TransmissionTerminal({ intent, inView }) {
  const MAX = 500;
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");

  const handleSend = () => {
    if (!message.trim() || sending || sent) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 2200);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        {/* Pulse ring */}
        <div className="relative mb-6">
          <div
            className="w-16 h-16 rounded-full border-2 flex items-center justify-center"
            style={{
              borderColor: intent.color,
              boxShadow: `0 0 24px ${intent.color}50, 0 0 48px ${intent.color}20`,
            }}
          >
            <span className="text-2xl" style={{ color: intent.color }}>
              ✓
            </span>
          </div>
          <div
            className="absolute inset-0 rounded-full border animate-ping"
            style={{ borderColor: `${intent.color}30` }}
          />
        </div>
        <p
          style={{ fontFamily: "'Orbitron', monospace" }}
          className="text-lg font-bold mb-2"
          style2={{ color: intent.color }}
        >
          <span style={{ color: intent.color }}>TRANSMISSION_SENT</span>
        </p>
        <p
          style={{ fontFamily: "'Share Tech Mono', monospace" }}
          className="text-[10px] text-gray-500 tracking-widest mb-1"
        >
          SIGNAL RECEIVED · RESPONSE &lt; 24H
        </p>
        <p
          style={{ fontFamily: "'Rajdhani', sans-serif" }}
          className="text-sm text-gray-400 mt-3 max-w-xs"
        >
          I'll get back to you within 24 hours. Check your inbox — or ping me
          directly on the channels above.
        </p>
        <button
          onClick={() => {
            setSent(false);
            setMessage("");
            setName("");
            setContact("");
          }}
          className="mt-6 text-[9px] tracking-widest px-4 py-2 rounded-sm transition-all duration-200"
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            border: `1px solid ${intent.color}30`,
            color: `${intent.color}70`,
          }}
        >
          SEND_ANOTHER →
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Terminal header */}
      <div className="flex items-center gap-2 pb-2 border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        </div>
        <span
          style={{ fontFamily: "'Share Tech Mono', monospace" }}
          className="text-[9px] text-gray-600 ml-2 tracking-widest"
        >
          TRANSMISSION_TERMINAL · {intent.label}
        </span>
        <div className="ml-auto flex items-center gap-1">
          <div
            className="w-1.5 h-1.5 rounded-full bg-green-400"
            style={{ boxShadow: "0 0 4px rgba(74,222,128,0.8)" }}
          />
          <span
            style={{ fontFamily: "'Share Tech Mono', monospace" }}
            className="text-[9px] text-green-400/60 tracking-wider"
          >
            {intent.tag}
          </span>
        </div>
      </div>

      {/* Name + contact row */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { val: name, set: setName, label: "YOUR_NAME", ph: "John Doe" },
          {
            val: contact,
            set: setContact,
            label: "YOUR_EMAIL_OR_HANDLE",
            ph: "john@company.com",
          },
        ].map(({ val, set, label, ph }) => (
          <div key={label}>
            <label
              style={{ fontFamily: "'Share Tech Mono', monospace" }}
              className="text-[9px] tracking-widest mb-1 block"
              style2={{ color: `${intent.color}50` }}
            >
              <span style={{ color: `${intent.color}50` }}>// {label}</span>
            </label>
            <input
              value={val}
              onChange={(e) => set(e.target.value)}
              placeholder={ph}
              className="w-full bg-transparent px-3 py-2 text-xs text-gray-300 rounded border outline-none transition-all duration-200 placeholder-gray-700 focus:placeholder-gray-600"
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                borderColor: "rgba(255,255,255,0.08)",
                background: "rgba(0,0,0,0.3)",
              }}
              onFocus={(e) =>
                (e.target.style.borderColor = `${intent.color}40`)
              }
              onBlur={(e) =>
                (e.target.style.borderColor = "rgba(255,255,255,0.08)")
              }
            />
          </div>
        ))}
      </div>

      {/* Message textarea */}
      <div>
        <label
          style={{ fontFamily: "'Share Tech Mono', monospace" }}
          className="text-[9px] tracking-widest mb-1 block"
          style2={{ color: `${intent.color}50` }}
        >
          <span style={{ color: `${intent.color}50` }}>// MESSAGE_BODY</span>
        </label>
        <div className="relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value.slice(0, MAX))}
            placeholder={intent.placeholder}
            rows={5}
            className="w-full bg-transparent px-3 py-3 text-sm text-gray-300 rounded border outline-none resize-none transition-all duration-200 placeholder-gray-700 focus:placeholder-gray-600 leading-relaxed"
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              borderColor: "rgba(255,255,255,0.08)",
              background: "rgba(0,0,0,0.3)",
            }}
            onFocus={(e) => (e.target.style.borderColor = `${intent.color}40`)}
            onBlur={(e) =>
              (e.target.style.borderColor = "rgba(255,255,255,0.08)")
            }
          />
          {/* Blinking cursor when empty */}
          {message.length === 0 && (
            <div className="absolute bottom-3 left-3 pointer-events-none">
              <span
                className="tw-cursor"
                style={{ background: `${intent.color}60` }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Signal meter + send */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex flex-col gap-1">
          <span
            style={{ fontFamily: "'Share Tech Mono', monospace" }}
            className="text-[9px] text-gray-600 tracking-widest"
          >
            SIGNAL_STRENGTH
          </span>
          <SignalMeter value={message.length} max={MAX} color={intent.color} />
        </div>

        <button
          onClick={handleSend}
          disabled={!message.trim() || !name.trim() || sending}
          className="relative px-8 py-3 text-xs tracking-widest rounded-sm overflow-hidden transition-all duration-300 disabled:opacity-30"
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            border: `1px solid ${intent.color}${message.trim() && name.trim() ? "60" : "25"}`,
            color: intent.color,
            background:
              message.trim() && name.trim()
                ? `${intent.color}10`
                : "transparent",
          }}
        >
          {/* Sweep bg on hover */}
          {message.trim() && name.trim() && (
            <div
              className="absolute inset-0 translate-x-[-101%] hover:translate-x-0 transition-transform duration-400 pointer-events-none"
              style={{ background: `${intent.color}10` }}
            />
          )}
          <span className="relative flex items-center gap-2">
            {sending ? (
              <>
                <span
                  className="inline-block w-2 h-2 rounded-full animate-pulse"
                  style={{ background: intent.color }}
                />
                TRANSMITTING...
              </>
            ) : (
              <>
                {intent.cta}
                <span className="text-base">→</span>
              </>
            )}
          </span>
        </button>
      </div>

      {/* Sending progress bar */}
      {sending && (
        <div className="h-px w-full rounded overflow-hidden">
          <div
            className="h-full rounded animate-pulse"
            style={{
              width: "100%",
              background: `linear-gradient(to right, transparent, ${intent.color}, transparent)`,
              animation: "gradientShift 1.5s ease infinite",
            }}
          />
        </div>
      )}
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────
export default function ContactSection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, 0.1);
  const [activeIntent, setActiveIntent] = useState(0);
  const [statusIdx, setStatusIdx] = useState(0);

  /* Rotate status line */
  useEffect(() => {
    const id = setInterval(
      () => setStatusIdx((i) => (i + 1) % STATUS_LINES.length),
      3000,
    );
    return () => clearInterval(id);
  }, []);

  const intent = INTENTS[activeIntent];

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
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-64 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse, ${intent.color}06 0%, transparent 70%)`,
          transition: "background 0.5s ease",
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
            className="w-2 h-2 rounded-full bg-green-400"
            style={{ boxShadow: "0 0 6px rgba(74,222,128,0.8)" }}
          />
          <span
            style={{ fontFamily: "'Share Tech Mono', monospace" }}
            className="text-xs text-green-400/60 tracking-[0.3em]"
          >
            SECTION_05 // CONTACT
          </span>
        </div>
        {/* Rotating status */}
        <div className="overflow-hidden h-4 flex items-center">
          <span
            key={statusIdx}
            style={{ fontFamily: "'Share Tech Mono', monospace" }}
            className="text-[10px] text-gray-600 tracking-widest"
            style2={{ animation: "fadeUp 0.4s ease" }}
          >
            {STATUS_LINES[statusIdx]}
          </span>
        </div>
        <span
          style={{ fontFamily: "'Share Tech Mono', monospace" }}
          className="text-xs text-cyan-400/30 tracking-[0.3em]"
        >
          TRANSMISSION_READY
        </span>
      </div>

      {/* ── Body ── */}
      <div className="flex-1 relative z-10 px-4 md:px-8 py-10 max-w-6xl mx-auto w-full">
        {/* Section title */}
        <div
          className="mb-10 text-center"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
          }}
        >
          <p
            style={{ fontFamily: "'Share Tech Mono', monospace" }}
            className="text-[10px] text-green-400/40 tracking-[0.5em] mb-3"
          >
            // INITIATE_CONTACT
          </p>
          <h2
            className="text-4xl md:text-6xl font-black tracking-tight mb-3"
            style={{
              fontFamily: "'Orbitron', monospace",
              background:
                "linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.35) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            LET'S BUILD
          </h2>
          <p
            style={{ fontFamily: "'Rajdhani', sans-serif" }}
            className="text-gray-400 text-base max-w-lg mx-auto"
          >
            Whether you're hiring, collaborating, or just want to trade ideas —
            pick your signal and open the channel.
          </p>
        </div>

        {/* ── Intent selector ── */}
        <div
          className="flex gap-3 justify-center mb-8 flex-wrap"
          style={{
            opacity: inView ? 1 : 0,
            transition: "opacity 0.5s ease 0.3s",
          }}
        >
          {INTENTS.map((it, i) => (
            <button
              key={it.id}
              onClick={() => setActiveIntent(i)}
              className="relative px-6 py-3 rounded text-xs tracking-widest transition-all duration-300 overflow-hidden group"
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                border: `1px solid ${activeIntent === i ? it.color : "rgba(255,255,255,0.08)"}`,
                background:
                  activeIntent === i ? `${it.color}10` : "rgba(0,0,0,0.3)",
                color: activeIntent === i ? it.color : "rgba(107,114,128,0.6)",
                boxShadow:
                  activeIntent === i ? `0 0 16px ${it.color}20` : "none",
              }}
            >
              <div
                className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none"
                style={{ background: `${it.color}06` }}
              />
              <span className="relative flex items-center gap-2">
                <span className="text-base">{it.icon}</span>
                {it.label}
              </span>
            </button>
          ))}
        </div>

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-start">
          {/* Left — Terminal */}
          <div
            className="border rounded overflow-hidden"
            style={{
              borderColor: `${intent.color}18`,
              background: "rgba(0,0,0,0.45)",
              backdropFilter: "blur(12px)",
              opacity: inView ? 1 : 0,
              transform: inView ? "translateX(0)" : "translateX(-30px)",
              transition:
                "opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s, border-color 0.4s",
            }}
          >
            {/* Intent headline */}
            <div className="px-5 pt-5 pb-4 border-b border-white/5">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg" style={{ color: intent.color }}>
                  {intent.icon}
                </span>
                <h3
                  className="text-lg font-bold"
                  style={{
                    fontFamily: "'Orbitron', monospace",
                    color: intent.color,
                  }}
                >
                  {intent.headline}
                </h3>
              </div>
              <p
                style={{ fontFamily: "'Share Tech Mono', monospace" }}
                className="text-[10px] text-gray-500 tracking-wider"
              >
                {intent.sub}
              </p>
            </div>

            <div className="p-5">
              <TransmissionTerminal
                key={activeIntent}
                intent={intent}
                inView={inView}
              />
            </div>
          </div>

          {/* Right — Channels + availability ── */}
          <div
            className="flex flex-col gap-4"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateX(0)" : "translateX(30px)",
              transition: "opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s",
            }}
          >
            {/* Direct channels */}
            <div
              className="border rounded p-4"
              style={{
                borderColor: "rgba(255,255,255,0.06)",
                background: "rgba(0,0,0,0.4)",
              }}
            >
              <p
                style={{ fontFamily: "'Share Tech Mono', monospace" }}
                className="text-[10px] text-cyan-400/40 mb-3 tracking-widest"
              >
                // DIRECT_CHANNELS
              </p>
              <p
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
                className="text-xs text-gray-500 mb-3"
              >
                Skip the form. Click to copy, or hit ↗ to open directly.
              </p>
              <div className="flex flex-col gap-2">
                {CHANNELS.map((ch, i) => (
                  <ChannelCard
                    key={ch.label}
                    ch={ch}
                    index={i}
                    inView={inView}
                  />
                ))}
              </div>
            </div>

            {/* Availability card */}
            <div
              className="border rounded p-4"
              style={{
                borderColor: "rgba(74,222,128,0.1)",
                background: "rgba(0,0,0,0.4)",
              }}
            >
              <p
                style={{ fontFamily: "'Share Tech Mono', monospace" }}
                className="text-[10px] text-green-400/40 mb-3 tracking-widest"
              >
                // AVAILABILITY_STATUS
              </p>
              {[
                { k: "STATUS", v: "AVAILABLE", color: "#4ADE80" },
                { k: "LOCATION", v: "CHENNAI, IN", color: "#00F5D4" },
                { k: "TIMEZONE", v: "IST · UTC+5:30", color: "#00F5D4" },
                { k: "RESPONSE", v: "< 24 HOURS", color: "#F59E0B" },
                { k: "PREFERRED", v: "EMAIL / LINKEDIN", color: "#9B5DE5" },
              ].map(({ k, v, color }) => (
                <div
                  key={k}
                  className="flex justify-between items-center py-1.5 border-b border-white/4 last:border-0"
                >
                  <span
                    style={{ fontFamily: "'Share Tech Mono', monospace" }}
                    className="text-[9px] text-gray-600"
                  >
                    {k}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      color,
                    }}
                    className="text-[9px]"
                  >
                    {v}
                  </span>
                </div>
              ))}
            </div>

            {/* Mini manifesto */}
            <div
              className="border rounded p-4 relative overflow-hidden"
              style={{
                borderColor: `${intent.color}12`,
                background: "rgba(0,0,0,0.3)",
              }}
            >
              <div
                className="absolute top-0 right-0 w-24 h-24 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at top right, ${intent.color}08, transparent 70%)`,
                  transition: "background 0.5s ease",
                }}
              />
              <p
                style={{ fontFamily: "'Share Tech Mono', monospace" }}
                className="text-[10px] text-gray-600 mb-3 tracking-widest"
              >
                // QUICK_NOTE
              </p>
              <p
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
                className="text-sm text-gray-400 leading-relaxed"
              >
                I read every message personally. No auto-replies, no gatekeeping
                assistant. If it's interesting, I'll respond.
              </p>
              <div className="mt-3 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 status-dot" />
                <span
                  style={{ fontFamily: "'Share Tech Mono', monospace" }}
                  className="text-[9px] text-green-400/60 tracking-widest"
                >
                  RC BALAJI · ONLINE
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer bar ── */}
      <div className="relative z-20 border-t border-cyan-400/10 px-8 py-5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
            <span
              style={{ fontFamily: "'Orbitron', monospace" }}
              className="text-sm font-bold text-white/60 tracking-wider"
            >
              RC BALAJI
            </span>
            <div className="h-3 w-px bg-white/10" />
            <span
              style={{ fontFamily: "'Share Tech Mono', monospace" }}
              className="text-[9px] text-gray-600 tracking-widest"
            >
              SOFTWARE ENGINEER · CHENNAI · 2025
            </span>
          </div>
          <div className="flex items-center gap-6">
            {CHANNELS.map((ch) => (
              <a
                key={ch.label}
                href={ch.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  color: `${ch.color}40`,
                }}
                className="text-[9px] tracking-widest hover:opacity-80 transition-opacity"
              >
                {ch.label}
              </a>
            ))}
          </div>
          <span
            style={{ fontFamily: "'Share Tech Mono', monospace" }}
            className="text-[9px] text-gray-700 tracking-widest"
          >
            END_OF_TRANSMISSION
          </span>
        </div>
      </div>
    </section>
  );
}
