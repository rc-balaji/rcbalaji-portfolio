"use client";
import { useEffect, useState } from "react";

export default function TypewriterText({ phrases }) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const phrase = phrases[idx];
    const speed = deleting ? 38 : 85;
    const t = setTimeout(() => {
      if (!deleting) {
        setText(phrase.slice(0, text.length + 1));
        if (text.length + 1 === phrase.length)
          setTimeout(() => setDeleting(true), 1800);
      } else {
        setText(text.slice(0, -1));
        if (text.length === 1) {
          setDeleting(false);
          setIdx((i) => (i + 1) % phrases.length);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, deleting, idx, phrases]);

  return (
    <span className="font-mono text-gray-300">
      {text}
      <span className="tw-cursor" />
    </span>
  );
}
