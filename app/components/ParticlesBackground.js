"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function ParticlesBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  if (!init) return null;

  return (
    <Particles
      className="fixed top-0 left-0 w-full h-full"
      options={{
        background: {
          color: "transparent",
        },
        particles: {
          number: {
            value: 120,
          },
          color: {
            value: "#00F5D4",
          },
          links: {
            enable: true,
            distance: 160,
            color: "#00F5D4",
            opacity: 0.6,
            width: 1,
          },
          move: {
            enable: true,
            speed: 2,
          },
          size: {
            value: { min: 2, max: 5 },
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse",
            },
          },
          modes: {
            repulse: {
              distance: 150,
            },
          },
        },
      }}
    />
  );
}
