import { useEffect, useRef } from "react";

/**
 * Full-screen 80s synthwave grid + sun animation.
 * Pure canvas — performant and self-contained.
 */
const SynthwaveGrid = ({ onComplete }: { onComplete?: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let frame: number;
    let completed = false;
    const start = performance.now();
    const DURATION = 3200; // ms total intro

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const draw = (now: number) => {
      const t = now - start;
      const p = Math.min(t / DURATION, 1); // 0→1

      ctx.clearRect(0, 0, w, h);

      // Background — deep navy to black
      const bg = ctx.createLinearGradient(0, 0, 0, h);
      bg.addColorStop(0, "#0a0014");
      bg.addColorStop(0.4, "#0d0028");
      bg.addColorStop(1, "#000008");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      const horizonY = h * 0.55;

      // --- SUN ---
      const sunRadius = Math.min(w, h) * 0.18;
      const sunY = horizonY - sunRadius * 0.3;
      const sunProgress = Math.min(p * 1.5, 1);
      const sunScale = easeOutExpo(sunProgress);

      // Sun glow
      const glowR = sunRadius * 2.5 * sunScale;
      const glow = ctx.createRadialGradient(w / 2, sunY, 0, w / 2, sunY, glowR);
      glow.addColorStop(0, "rgba(255, 50, 120, 0.4)");
      glow.addColorStop(0.3, "rgba(255, 120, 50, 0.15)");
      glow.addColorStop(1, "rgba(255, 50, 120, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      // Sun body with horizontal line slices
      ctx.save();
      ctx.beginPath();
      ctx.arc(w / 2, sunY, sunRadius * sunScale, 0, Math.PI * 2);
      ctx.clip();

      const sunGrad = ctx.createLinearGradient(0, sunY - sunRadius, 0, sunY + sunRadius);
      sunGrad.addColorStop(0, "#ff2975");
      sunGrad.addColorStop(0.5, "#ff6b35");
      sunGrad.addColorStop(1, "#ffcc00");
      ctx.fillStyle = sunGrad;
      ctx.fillRect(0, sunY - sunRadius, w, sunRadius * 2);

      // Horizontal scan lines through sun
      ctx.fillStyle = "#0a0014";
      const lineCount = 8;
      for (let i = 0; i < lineCount; i++) {
        const ly = sunY + (i / lineCount) * sunRadius * 0.9;
        const lh = 2 + i * 1.5;
        ctx.fillRect(0, ly, w, lh);
      }
      ctx.restore();

      // --- GRID FLOOR ---
      const gridProgress = Math.min(Math.max((p - 0.15) / 0.85, 0), 1);
      if (gridProgress > 0) {
        const gp = easeOutExpo(gridProgress);
        ctx.save();
        ctx.globalAlpha = gp;

        // Perspective grid
        const vanishX = w / 2;
        const vanishY = horizonY;
        const gridLines = 20;
        const hLines = 30;
        const speed = (t * 0.0004) % 1;

        // Vertical converging lines
        ctx.strokeStyle = "rgba(0, 220, 255, 0.35)";
        ctx.lineWidth = 1;
        for (let i = -gridLines; i <= gridLines; i++) {
          const x = vanishX + (i / gridLines) * w * 1.2;
          ctx.beginPath();
          ctx.moveTo(vanishX, vanishY);
          ctx.lineTo(x, h + 20);
          ctx.stroke();
        }

        // Horizontal receding lines
        ctx.strokeStyle = "rgba(0, 220, 255, 0.25)";
        for (let i = 0; i < hLines; i++) {
          const frac = ((i / hLines) + speed) % 1;
          const y = vanishY + (h - vanishY) * (frac * frac); // quadratic depth
          const spread = (y - vanishY) / (h - vanishY);
          const x1 = vanishX - w * spread * 1.2;
          const x2 = vanishX + w * spread * 1.2;
          ctx.beginPath();
          ctx.moveTo(x1, y);
          ctx.lineTo(x2, y);
          ctx.stroke();
        }

        // Edge glow on horizon
        const horizGlow = ctx.createLinearGradient(0, vanishY - 2, 0, vanishY + 2);
        horizGlow.addColorStop(0, "rgba(0, 220, 255, 0)");
        horizGlow.addColorStop(0.5, "rgba(0, 220, 255, 0.6)");
        horizGlow.addColorStop(1, "rgba(0, 220, 255, 0)");
        ctx.fillStyle = horizGlow;
        ctx.fillRect(0, vanishY - 2, w, 4);

        ctx.restore();
      }

      // --- STARS ---
      if (p > 0.1) {
        ctx.save();
        ctx.globalAlpha = Math.min((p - 0.1) * 2, 0.8);
        const seed = 42;
        for (let i = 0; i < 80; i++) {
          const sx = pseudoRandom(seed + i) * w;
          const sy = pseudoRandom(seed + i + 100) * horizonY * 0.9;
          const sr = pseudoRandom(seed + i + 200) * 1.5 + 0.5;
          const flicker = 0.5 + 0.5 * Math.sin(t * 0.003 + i);
          ctx.globalAlpha = flicker * 0.6;
          ctx.fillStyle = "#fff";
          ctx.fillRect(sx, sy, sr, sr);
        }
        ctx.restore();
      }

      if (p < 1) {
        frame = requestAnimationFrame(draw);
      } else {
        // Keep running grid animation after intro
        frame = requestAnimationFrame(draw);
        // Signal completion exactly once
        if (!completed) {
          completed = true;
          onCompleteRef.current?.();
        }
      }
    };

    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 1 }}
    />
  );
};

function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function pseudoRandom(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

export default SynthwaveGrid;
