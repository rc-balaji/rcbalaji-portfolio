"use client";
import { useEffect, useState, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*";

export default function GlitchText({ text, className }) {
  const [display, setDisplay] = useState(text);
  // Using a ref to track the current iteration to avoid closure staleness
  const iterationRef = useRef(0);

  useEffect(() => {
    const trigger = setInterval(() => {
      iterationRef.current = 0;

      const scramble = setInterval(() => {
        setDisplay(() => {
          return text
            .split("")
            .map((char, index) => {
              // 1. Keep spaces as they are
              if (char === " ") return " ";

              // 2. If the index is less than our current progress, lock the correct letter
              if (index < iterationRef.current) {
                return text[index];
              }

              // 3. If it's the specific character we are currently "glitching", show a random char
              // This creates the "one by one" reveal feel
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("");
        });

        iterationRef.current += 1 / 3; // Adjust speed here (smaller = slower reveal)

        if (iterationRef.current >= text.length) {
          clearInterval(scramble);
          setDisplay(text);
        }
      }, 28); // Faster interval for smoother "flicker"
    }, 4500);

    return () => clearInterval(trigger);
  }, [text]);

  return (
    <span
      className={className}
      style={{
        whiteSpace: "nowrap",
        display: "inline-block",
        minWidth: `${text.length}ch`,
      }}
    >
      {display}
    </span>
  );
}
