"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
  { k: "FOCUS",      v: "Performance + UX" },
  { k: "WORKFLOW",   v: "Solo → Team" },
  { k: "LEARNING",   v: "Daily" },
  { k: "TIMEZONE",   v: "IST UTC+5:30" },
  { k: "COFFEE_DEP", v: "Critical" },
];

export default function AboutSection() {
  const sectionRef  = useRef(null);
  const leftRef     = useRef(null);
  const rightRef    = useRef(null);
  const headerRef   = useRef(null);
  const quoteRef    = useRef(null);
  const traitRef    = useRef(null);
  const ctaRef      = useRef(null);
  const imgRef      = useRef(null);
  const canvasRef   = useRef(null);
  const powerLineRef = useRef(null);
  const nodeRefs    = useRef([]);

  const [scanLine, setScanLine] = useState(0);

  /* ── Scanline loop ── */
  useEffect(() => {
    const id = setInterval(() => setScanLine((p) => (p + 1) % 100), 22);
    return () => clearInterval(id);
  }, []);

  /* ── GSAP ── */
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const ctx = gsap.context(() => {

        /* ── Header slides down ── */
        gsap.fromTo(headerRef.current,
          { opacity: 0, y: -20 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );

        /* ── Left panel slides in ── */
        gsap.fromTo(leftRef.current,
          { opacity: 0, x: -60 },
          {
            opacity: 1, x: 0, duration: 0.9, ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );

        /* ── CRT TV power-on sequence ── */
        if (imgRef.current && canvasRef.current && powerLineRef.current) {
          const img       = imgRef.current;
          const canvas    = canvasRef.current;
          const powerLine = powerLineRef.current;

          let noiseRaf    = null;
          let noiseActive = false;

          const syncCanvas = () => {
            canvas.width  = img.offsetWidth  || 400;
            canvas.height = img.offsetHeight || 530;
          };

          const drawStatic = (intensity = 1) => {
            const c   = canvas.getContext("2d");
            const w   = canvas.width;
            const h   = canvas.height;
            const img2 = c.createImageData(w, h);
            const d   = img2.data;
            for (let i = 0; i < d.length; i += 4) {
              const v = Math.random() > (1 - intensity * 0.6) ? 255 : 0;
              d[i] = d[i + 1] = d[i + 2] = v;
              d[i + 3] = Math.floor(Math.random() * 180 * intensity);
            }
            c.putImageData(img2, 0, 0);
          };

          const startNoise = (intensity) => {
            noiseActive = true;
            const loop = () => {
              if (!noiseActive) return;
              drawStatic(intensity);
              noiseRaf = requestAnimationFrame(loop);
            };
            loop();
          };

          const stopNoise = () => {
            noiseActive = false;
            cancelAnimationFrame(noiseRaf);
            const c = canvas.getContext("2d");
            c.clearRect(0, 0, canvas.width, canvas.height);
          };

          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
            onEnter: () => {
              syncCanvas();

              const tl = gsap.timeline();

              /* Phase 1 — static noise burst */
              tl.call(() => {
                gsap.to(canvas, { opacity: 1, duration: 0.1 });
                startNoise(1);
              })

              /* Phase 2 — cyan power line stretches horizontally */
              .to(powerLine, {
                scaleX: 1,
                duration: 0.3,
                ease: "power4.out",
                delay: 0.35,
              })

              /* Phase 3 — line expands to fill full height */
              .to(powerLine, {
                height: "100%",
                top: "0%",
                transform: "translateY(0)",
                duration: 0.45,
                ease: "power3.inOut",
              })

              /* Phase 4 — rapid flicker sequence */
              .call(() => {
                gsap.to(img, { filter: "grayscale(80%) brightness(0.5) contrast(1.4)", duration: 0.07 });
              })
              .to({}, { duration: 0.07 })

              .call(() => {
                gsap.to(img, { filter: "grayscale(100%) brightness(0) contrast(1.2)", duration: 0.05 });
              })
              .to({}, { duration: 0.09 })

              .call(() => {
                gsap.to(img, { filter: "grayscale(60%) brightness(0.7) contrast(1.35)", duration: 0.06 });
              })
              .to({}, { duration: 0.06 })

              .call(() => {
                gsap.to(img, { filter: "grayscale(100%) brightness(0.1) contrast(1.2)", duration: 0.05 });
              })
              .to({}, { duration: 0.1 })

              .call(() => {
                gsap.to(img, { filter: "grayscale(40%) brightness(0.8) contrast(1.3)", duration: 0.07 });
              })
              .to({}, { duration: 0.07 })

              .call(() => {
                gsap.to(img, { filter: "grayscale(100%) brightness(0) contrast(1.2)", duration: 0.04 });
              })
              .to({}, { duration: 0.13 })

              /* Phase 5 — burn in, static fades, image settles */
              .call(() => {
                stopNoise();
                gsap.to(canvas,    { opacity: 0,   duration: 0.4 });
                gsap.to(powerLine, { opacity: 0,   duration: 0.5 });
                gsap.to(img, {
                  filter: "grayscale(30%) brightness(0.9) contrast(1.1)",
                  duration: 1.1,
                  ease: "power2.out",
                });
              });
            },
          });
        }

        /* ── Trait panel ── */
        gsap.fromTo(traitRef.current,
          { opacity: 0, y: 24 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: "power2.out",
            scrollTrigger: {
              trigger: traitRef.current,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );

        /* ── Pull quote ── */
        gsap.fromTo(quoteRef.current,
          { opacity: 0, x: 50 },
          {
            opacity: 1, x: 0, duration: 0.9, ease: "power3.out",
            scrollTrigger: {
              trigger: quoteRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );

        /* ── Story nodes — one by one as each enters viewport ── */
        nodeRefs.current.forEach((el) => {
          if (!el) return;

          gsap.fromTo(el,
            { opacity: 0, x: 40 },
            {
              opacity: 1, x: 0, duration: 0.6, ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 82%",
                toggleActions: "play none none none",
              },
            }
          );

          const dot = el.querySelector(".timeline-dot");
          if (dot) {
            gsap.fromTo(dot,
              { scale: 0, opacity: 0 },
              {
                scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)",
                scrollTrigger: {
                  trigger: el,
                  start: "top 82%",
                  toggleActions: "play none none none",
                },
              }
            );
          }

          const line = el.querySelector(".timeline-line");
          if (line) {
            gsap.fromTo(line,
              { scaleY: 0, transformOrigin: "top center" },
              {
                scaleY: 1, duration: 0.5, ease: "power2.inOut", delay: 0.15,
                scrollTrigger: {
                  trigger: el,
                  start: "top 82%",
                  toggleActions: "play none none none",
                },
              }
            );
          }
        });

        /* ── CTA row ── */
        gsap.fromTo(ctaRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );

        /* ── PIN: left sticks while right scrolls (desktop only) ── */
        const mm = gsap.matchMedia();
        mm.add("(min-width: 1024px)", () => {
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top top",
            end: () => {
              const rightH = rightRef.current?.offsetHeight ?? 0;
              const leftH  = leftRef.current?.offsetHeight  ?? 0;
              return `+=${Math.max(rightH - leftH, 0)}`;
            },
            pin: leftRef.current,
            pinSpacing: false,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          });
        });

      }, sectionRef);

      return () => ctx.revert();
    });

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col grid-bg overflow-visible"
      style={{ background: "#030712" }}
    >
      {/* HUD corners */}
      <div className="hud-bracket hud-tl" />
      <div className="hud-bracket hud-tr" />
      <div className="hud-bracket hud-bl" />
      <div className="hud-bracket hud-br" />

      {/* Ambient blobs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,245,212,0.04) 0%, transparent 70%)" }} />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(155,93,229,0.05) 0%, transparent 70%)" }} />

      {/* ── Header bar ── */}
      <div
        ref={headerRef}
        className="relative z-20 flex items-center justify-between px-8 py-3 border-b border-cyan-400/10"
        style={{ opacity: 0 }}
      >
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-purple-400"
            style={{ boxShadow: "0 0 6px rgba(155,93,229,0.8)" }} />
          <span style={{ fontFamily: "'Share Tech Mono', monospace" }}
            className="text-xs text-purple-400/60 tracking-[0.3em]">
            SECTION_02 // ABOUT
          </span>
        </div>
        <span style={{ fontFamily: "'Share Tech Mono', monospace" }}
          className="text-xs text-gray-600 tracking-[0.25em]">
          IDENTITY MATRIX LOADED
        </span>
        <span style={{ fontFamily: "'Share Tech Mono', monospace" }}
          className="text-xs text-cyan-400/30 tracking-[0.3em]">
          NODE: RC_BALAJI
        </span>
      </div>

      {/* ── Main grid ── */}
      <div className="flex items-start justify-center relative z-10 px-4 py-10">
        <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-8 xl:gap-16 items-start">

          {/* ════ LEFT — pinned photo panel ════ */}
          <div
            ref={leftRef}
            className="flex flex-col gap-5 items-center lg:items-start w-full lg:w-[420px] flex-shrink-0"
            style={{ opacity: 0 }}
          >
            <div className="flex items-center gap-3 self-start">
              <div className="w-8 h-px bg-cyan-400/50" />
              <span style={{ fontFamily: "'Share Tech Mono', monospace" }}
                className="text-[10px] text-cyan-400/50 tracking-[0.4em]">
                SUBJECT PROFILE
              </span>
            </div>

            {/* ── Photo frame ── */}
            <div className="relative w-full max-w-sm">
              <div
                className="relative rounded overflow-hidden"
                style={{ border: "1px solid rgba(0,245,212,0.15)", background: "rgba(0,0,0,0.5)" }}
              >
                {/* HUD notch corners */}
                {["top-0 left-0","top-0 right-0","bottom-0 left-0","bottom-0 right-0"].map((pos, i) => (
                  <div key={i} className={`absolute ${pos} w-4 h-4 z-20`} style={{
                    borderTop:    i < 2  ? "1.5px solid rgba(0,245,212,0.7)" : "none",
                    borderBottom: i >= 2 ? "1.5px solid rgba(0,245,212,0.7)" : "none",
                    borderLeft:   i % 2 === 0 ? "1.5px solid rgba(0,245,212,0.7)" : "none",
                    borderRight:  i % 2 !== 0 ? "1.5px solid rgba(0,245,212,0.7)" : "none",
                  }} />
                ))}

                {/* CRT static canvas */}
                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  style={{ zIndex: 30, mixBlendMode: "screen", opacity: 0 }}
                />

                {/* Power-on line — starts as thin horizontal line at center */}
                <div
                  ref={powerLineRef}
                  className="absolute inset-x-0 pointer-events-none"
                  style={{
                    zIndex: 28,
                    top: "50%",
                    height: "2px",
                    transform: "translateY(-50%) scaleX(0)",
                    transformOrigin: "center center",
                    background: "rgba(0,245,212,0.95)",
                    boxShadow: "0 0 14px rgba(0,245,212,1), 0 0 40px rgba(0,245,212,0.5)",
                  }}
                />

                {/* Duotone wash */}
                <div className="absolute inset-0 z-10 pointer-events-none mix-blend-color"
                  style={{ background: "linear-gradient(135deg, rgba(0,245,212,0.25) 0%, rgba(155,93,229,0.25) 100%)" }} />

                {/* Live scanline sweep */}
                <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                  <div className="absolute left-0 right-0 h-8"
                    style={{
                      top: `${scanLine}%`,
                      background: "linear-gradient(to bottom, transparent, rgba(0,245,212,0.06), transparent)",
                      transition: "top 0.02s linear",
                    }} />
                </div>

                {/* CRT horizontal scanlines texture */}
                <div className="absolute inset-0 z-10 pointer-events-none opacity-30"
                  style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.15) 3px, rgba(0,0,0,0.15) 4px)" }} />

                {/* Vignette */}
                <div className="absolute inset-0 z-10 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.65) 100%)" }} />

                {/* Photo — GSAP owns the filter */}
                <img
                  ref={imgRef}
                  src="/profile.png"
                  alt="RC Balaji"
                  className="w-full object-contain"
                  style={{
                    filter: "grayscale(100%) brightness(0) contrast(1.2)",
                    aspectRatio: "3/4",
                    maxHeight: "460px",
                    display: "block",
                    position: "relative",
                    zIndex: 5,
                  }}
                />

                {/* Bottom data strip */}
                <div className="absolute bottom-0 left-0 right-0 z-20 px-3 py-2"
                  style={{ background: "linear-gradient(to top, rgba(3,7,18,0.95), rgba(3,7,18,0.4))" }}>
                  <div className="flex justify-between items-end">
                    <div>
                      <p style={{ fontFamily: "'Orbitron', monospace" }}
                        className="text-xs text-cyan-400 font-bold tracking-wider">RC BALAJI</p>
                      <p style={{ fontFamily: "'Share Tech Mono', monospace" }}
                        className="text-[9px] text-gray-500 tracking-widest">SOFTWARE ENGINEER · CHENNAI</p>
                    </div>
                    <div className="text-right">
                      <p style={{ fontFamily: "'Share Tech Mono', monospace" }}
                        className="text-[9px] text-cyan-400/50">ID: RCB-2025</p>
                      <div className="flex items-center gap-1 justify-end">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400"
                          style={{ boxShadow: "0 0 4px rgba(74,222,128,0.8)" }} />
                        <span style={{ fontFamily: "'Share Tech Mono', monospace" }}
                          className="text-[9px] text-green-400">VERIFIED</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Side accent line */}
              <div className="absolute -left-3 top-8 bottom-8 w-px"
                style={{ background: "linear-gradient(to bottom, transparent, rgba(0,245,212,0.4), transparent)" }} />
            </div>

            {/* Trait grid */}
            <div
              ref={traitRef}
              className="w-full max-w-sm border border-purple-500/15 rounded bg-black/40 backdrop-blur-sm p-4"
              style={{ opacity: 0 }}
            >
              <p style={{ fontFamily: "'Share Tech Mono', monospace" }}
                className="text-[10px] text-purple-400/40 mb-3 tracking-widest">
                // TRAIT_MATRIX
              </p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {TRAITS.map((t) => (
                  <div key={t.k}>
                    <p style={{ fontFamily: "'Share Tech Mono', monospace" }}
                      className="text-[9px] text-gray-600">{t.k}</p>
                    <p style={{ fontFamily: "'Share Tech Mono', monospace" }}
                      className="text-[10px] text-cyan-400">{t.v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ════ RIGHT — scrolling story ════ */}
          <div ref={rightRef} className="flex-1 min-w-0 pt-2 pb-32">

            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-purple-500/50" />
              <span style={{ fontFamily: "'Share Tech Mono', monospace" }}
                className="text-[10px] text-purple-400/50 tracking-[0.4em]">
                ORIGIN_SEQUENCE
              </span>
            </div>

            {/* Pull quote */}
            <div ref={quoteRef} className="mb-10 relative pl-5" style={{ opacity: 0 }}>
              <div className="absolute left-0 top-0 bottom-0 w-px"
                style={{ background: "linear-gradient(to bottom, #00F5D4, #9B5DE5)" }} />
              <p className="text-xl md:text-2xl font-semibold leading-relaxed text-white/80"
                style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                I don't just{" "}
                <span className="text-cyan-400"
                  style={{ fontFamily: "'Orbitron', monospace", fontSize: "0.9em" }}>
                  write code
                </span>
                . I design the{" "}
                <span className="text-purple-400"
                  style={{ fontFamily: "'Orbitron', monospace", fontSize: "0.9em" }}>
                  thinking
                </span>{" "}
                behind it.
              </p>
              <p style={{ fontFamily: "'Share Tech Mono', monospace" }}
                className="text-[10px] text-gray-600 mt-2 tracking-widest">
                // CORE_PHILOSOPHY
              </p>
            </div>

            {/* Story nodes */}
            {STORY_NODES.map((node, i) => (
              <div
                key={node.year}
                ref={(el) => (nodeRefs.current[i] = el)}
                className="relative flex gap-4 md:gap-8 items-start group"
                style={{ opacity: 0 }}
              >
                {/* Spine */}
                <div className="flex flex-col items-center flex-shrink-0 w-8">
                  <div
                    className="timeline-dot w-3 h-3 rounded-full border-2 mt-1 z-10 relative transition-all duration-300 group-hover:scale-150"
                    style={{
                      borderColor: node.color,
                      background: "rgba(3,7,18,1)",
                      boxShadow: `0 0 10px ${node.color}`,
                      transform: "scale(0)",
                      opacity: 0,
                    }}
                  />
                  {i < STORY_NODES.length - 1 && (
                    <div
                      className="timeline-line w-px flex-1 mt-1"
                      style={{
                        background: `linear-gradient(to bottom, ${node.color}40, transparent)`,
                        minHeight: "60px",
                        transformOrigin: "top center",
                        transform: "scaleY(0)",
                      }}
                    />
                  )}
                </div>

                {/* Card */}
                <div
                  className="flex-1 mb-8 p-4 rounded border group-hover:translate-x-1 transition-transform duration-300"
                  style={{
                    borderColor: `${node.color}20`,
                    background: "rgba(0,0,0,0.35)",
                    backdropFilter: "blur(8px)",
                  }}
                >
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
                    <span style={{ fontFamily: "'Share Tech Mono', monospace", color: `${node.color}70` }}
                      className="text-[10px]">
                      {node.year}
                    </span>
                    <div className="flex-1 h-px"
                      style={{ background: `linear-gradient(to right, ${node.color}30, transparent)` }} />
                  </div>
                  <h3 className="text-sm font-bold mb-1 tracking-wider"
                    style={{ fontFamily: "'Orbitron', monospace", color: node.color }}>
                    {node.title}
                  </h3>
                  <p style={{ fontFamily: "'Rajdhani', sans-serif" }}
                    className="text-gray-400 text-sm leading-relaxed">
                    {node.body}
                  </p>
                </div>
              </div>
            ))}

            {/* CTA */}
            <div ref={ctaRef} className="flex gap-3 flex-wrap mt-2" style={{ opacity: 0 }}>
              <button
                className="relative group px-6 py-2.5 text-xs tracking-widest overflow-hidden"
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  border: "1px solid rgba(0,245,212,0.35)",
                  borderRadius: "3px",
                  color: "#00F5D4",
                }}
              >
                <div className="absolute inset-0 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-400"
                  style={{ background: "rgba(0,245,212,0.08)" }} />
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
                <div className="absolute inset-0 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-400"
                  style={{ background: "rgba(155,93,229,0.08)" }} />
                <span className="relative">LET'S_CONNECT →</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="relative z-20 flex items-center justify-between px-8 py-3 border-t border-cyan-400/10">
        <span style={{ fontFamily: "'Share Tech Mono', monospace" }}
          className="text-xs text-gray-600 tracking-widest">END_OF_SECTION_02</span>
        <span style={{ fontFamily: "'Share Tech Mono', monospace" }}
          className="text-xs text-gray-600 tracking-widest">SCROLL → SECTION_03</span>
      </div>
    </section>
  );
}