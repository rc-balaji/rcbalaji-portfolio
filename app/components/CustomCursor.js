"use client";
import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [hov, setHov] = useState(false);
  const ref = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const move = (e) => {
      ref.current = { x: e.clientX, y: e.clientY };
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", move);

    let raf;
    const animate = () => {
      setTrail((p) => ({
        x: p.x + (ref.current.x - p.x) * 0.1,
        y: p.y + (ref.current.y - p.y) * 0.1,
      }));
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    const onEnter = () => setHov(true);
    const onLeave = () => setHov(false);
    document.querySelectorAll("button,a,[data-hover]").forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        className="fixed pointer-events-none z-[9999]"
        style={{
          transform: `translate(${pos.x - 4}px, ${pos.y - 4}px)`,
          transition: "transform 0.04s linear",
        }}
      >
        <div
          className={`rounded-full bg-cyan-400 transition-all duration-150 ${hov ? "w-3 h-3" : "w-2 h-2"}`}
          style={{
            boxShadow:
              "0 0 12px rgba(0,245,212,1), 0 0 24px rgba(0,245,212,0.5)",
          }}
        />
      </div>
      {/* Trailing ring */}
      <div
        className="fixed pointer-events-none z-[9998]"
        style={{ transform: `translate(${trail.x - 20}px, ${trail.y - 20}px)` }}
      >
        <div
          className={`rounded-full border border-cyan-400/50 transition-all duration-200 ${hov ? "w-12 h-12 border-cyan-400/80" : "w-10 h-10"}`}
          style={{ boxShadow: "0 0 10px rgba(0,245,212,0.25)" }}
        />
      </div>
    </>
  );
}
