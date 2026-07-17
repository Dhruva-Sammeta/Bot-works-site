import { useEffect, useRef } from "react";
import "./evidence-field.css";

type EvidenceFieldProps = {
  mode?: "public" | "instrument";
  phase?: number;
  className?: string;
};

type EventLocus = {
  x: number;
  channel: number;
  strength: number;
  uncertainty: number;
};

const CHANNEL_COUNT = 9;

function seededRandom(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function buildLoci() {
  const random = seededRandom(77421);
  return Array.from({ length: 27 }, (_, index): EventLocus => ({
    x: 0.08 + index * 0.033 + (random() - 0.5) * 0.018,
    channel: (index * 5 + Math.floor(random() * 3)) % CHANNEL_COUNT,
    strength: 0.45 + random() * 0.55,
    uncertainty: 0.08 + random() * 0.17,
  }));
}

const loci = buildLoci();
const groups = [
  [2, 6, 10],
  [5, 11, 15, 19],
  [9, 14, 18],
  [12, 17, 22, 25],
];

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const smoothstep = (from: number, to: number, value: number) => {
  const x = clamp((value - from) / Math.max(0.0001, to - from));
  return x * x * (3 - 2 * x);
};

export function EvidenceField({ mode = "public", phase, className = "" }: EvidenceFieldProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const readoutRef = useRef<HTMLDivElement>(null);
  const redrawRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    redrawRef.current?.();
  }, [phase]);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;
    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: 0.62, y: 0.46, tx: 0.62, ty: 0.46, active: 0, targetActive: 0 };
    let width = 1;
    let height = 1;
    let dpr = 1;
    let targetPhase = Number(host.dataset.phase || 0);
    let currentPhase = targetPhase;
    let frame: number | null = null;
    let disposed = false;
    let documentVisible = !document.hidden;
    let elementVisible = true;

    const channelY = (channel: number) => {
      const top = mode === "public" ? height * 0.14 : height * 0.16;
      const span = mode === "public" ? height * 0.69 : height * 0.66;
      return top + (channel / (CHANNEL_COUNT - 1)) * span;
    };

    const locusPoint = (index: number) => {
      const locus = loci[index];
      const inset = mode === "public" ? Math.max(36, width * 0.045) : Math.max(24, width * 0.05);
      return {
        x: inset + locus.x * (width - inset * 2),
        y: channelY(locus.channel),
      };
    };

    const traceValue = (channel: number, normalizedX: number, time: number) => {
      const drift = reducedMotion ? 0 : time * 0.00016;
      let value = Math.sin(normalizedX * 42 + channel * 1.7 + drift) * 0.17;
      value += Math.sin(normalizedX * 91 - channel * 0.83 - drift * 1.7) * 0.08;
      value += Math.sin(normalizedX * 17 + channel * 2.11 + drift * 0.45) * 0.06;
      loci.forEach((locus) => {
        if (locus.channel !== channel) return;
        const distance = normalizedX - locus.x;
        const envelope = Math.exp(-(distance * distance) / 0.00023);
        value += Math.sin(distance * 690) * envelope * locus.strength * 0.88;
      });
      return value;
    };

    const drawTraces = (time: number, opacity: number) => {
      const inset = mode === "public" ? Math.max(36, width * 0.045) : Math.max(24, width * 0.05);
      const usableWidth = width - inset * 2;
      context.lineWidth = mode === "public" ? 0.8 : 0.9;
      for (let channel = 0; channel < CHANNEL_COUNT; channel += 1) {
        const baseY = channelY(channel);
        context.beginPath();
        for (let x = 0; x <= usableWidth; x += 3) {
          const normalizedX = x / usableWidth;
          const value = traceValue(channel, normalizedX, time);
          const amplitude = mode === "public" ? Math.max(13, height * 0.026) : Math.max(10, height * 0.032);
          const y = baseY + value * amplitude;
          if (x === 0) context.moveTo(inset + x, y);
          else context.lineTo(inset + x, y);
        }
        context.strokeStyle = `rgba(241,237,229,${opacity * (channel % 3 === 0 ? 0.72 : 0.44)})`;
        context.stroke();

        context.fillStyle = `rgba(184,177,165,${opacity * 0.52})`;
        context.font = '10px "Recursive Variable", monospace';
        context.textAlign = "left";
        context.fillText(`CH ${String(channel + 1).padStart(2, "0")}`, inset, baseY - 10);
      }
    };

    const drawEvents = (amount: number) => {
      loci.forEach((locus, index) => {
        const point = locusPoint(index);
        const visibleAmount = smoothstep(index / loci.length - 0.08, index / loci.length + 0.15, amount);
        if (visibleAmount <= 0) return;
        const tick = 7 + locus.strength * 10;
        context.beginPath();
        context.moveTo(point.x, point.y - tick * visibleAmount);
        context.lineTo(point.x, point.y + tick * visibleAmount);
        context.strokeStyle = `rgba(120,152,255,${0.25 + visibleAmount * 0.68})`;
        context.lineWidth = 1.15;
        context.stroke();
        context.fillStyle = `rgba(120,152,255,${0.35 + visibleAmount * 0.65})`;
        context.fillRect(point.x - 1.5, point.y - 1.5, 3, 3);
      });
    };

    const drawPairwise = (amount: number) => {
      const edgePairs = loci.map((_, index) => [index, (index + 5 + (index % 3)) % loci.length]).filter((_, index) => index % 3 !== 2);
      edgePairs.forEach(([aIndex, bIndex], index) => {
        if (bIndex <= aIndex || index / edgePairs.length > amount) return;
        const a = locusPoint(aIndex);
        const b = locusPoint(bIndex);
        context.beginPath();
        context.moveTo(a.x, a.y);
        const bend = (aIndex % 2 ? 1 : -1) * Math.min(34, Math.abs(b.x - a.x) * 0.11);
        context.quadraticCurveTo((a.x + b.x) / 2, (a.y + b.y) / 2 + bend, b.x, b.y);
        context.strokeStyle = `rgba(184,177,165,${0.12 + amount * 0.36})`;
        context.lineWidth = 0.7;
        context.stroke();
      });
    };

    const drawGroup = (indices: number[], opacity: number, groupIndex: number) => {
      const points = indices.map(locusPoint);
      const center = points.reduce((acc, point) => ({ x: acc.x + point.x / points.length, y: acc.y + point.y / points.length }), { x: 0, y: 0 });
      const ordered = points.map((point) => ({ point, angle: Math.atan2(point.y - center.y, point.x - center.x) })).sort((a, b) => a.angle - b.angle).map(({ point }) => point);
      if (ordered.length < 3) return;

      context.save();
      context.beginPath();
      ordered.forEach((point, index) => {
        const previous = ordered[(index - 1 + ordered.length) % ordered.length];
        const midpoint = { x: (previous.x + point.x) / 2, y: (previous.y + point.y) / 2 };
        if (index === 0) context.moveTo(midpoint.x, midpoint.y);
        context.quadraticCurveTo(point.x, point.y, (point.x + ordered[(index + 1) % ordered.length].x) / 2, (point.y + ordered[(index + 1) % ordered.length].y) / 2);
      });
      context.closePath();
      context.fillStyle = `rgba(120,152,255,${0.018 + opacity * 0.035})`;
      context.strokeStyle = `rgba(120,152,255,${0.2 + opacity * 0.58})`;
      context.lineWidth = 1.1;
      context.setLineDash(groupIndex % 2 ? [8, 5] : []);
      context.fill();
      context.stroke();
      context.setLineDash([]);
      context.clip();
      context.strokeStyle = `rgba(120,152,255,${opacity * 0.12})`;
      context.lineWidth = 0.6;
      for (let x = center.x - 160; x < center.x + 160; x += 11) {
        context.beginPath();
        context.moveTo(x, center.y - 150);
        context.lineTo(x + 90, center.y + 150);
        context.stroke();
      }
      context.restore();
    };

    const drawHigherOrder = (amount: number) => {
      groups.forEach((group, index) => {
        const opacity = smoothstep(index / groups.length - 0.1, index / groups.length + 0.35, amount);
        if (opacity > 0) drawGroup(group, opacity, index);
      });
    };

    const drawUncertainty = (amount: number) => {
      if (amount <= 0) return;
      const inset = mode === "public" ? Math.max(36, width * 0.045) : Math.max(24, width * 0.05);
      const right = width - inset;
      const top = channelY(1) - height * 0.055;
      const bottom = channelY(7) + height * 0.055;
      context.save();
      context.strokeStyle = `rgba(241,237,229,${amount * 0.24})`;
      context.lineWidth = 0.8;
      context.setLineDash([4, 7]);
      context.strokeRect(inset + 1, top, right - inset - 2, bottom - top);
      context.setLineDash([]);
      context.fillStyle = `rgba(5,5,5,${0.18 * amount})`;
      context.fillRect(inset, top, right - inset, bottom - top);
      context.fillStyle = `rgba(184,177,165,${amount * 0.66})`;
      context.font = '10px "Recursive Variable", monospace';
      context.textAlign = "right";
      context.fillText("BOUND / ILLUSTRATIVE UNCERTAINTY — NO MODEL VALUE", right, bottom + 22);
      context.restore();
    };

    const nearestLocus = () => {
      let nearest = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;
      loci.forEach((_, index) => {
        const point = locusPoint(index);
        const distance = Math.hypot(point.x - pointer.x * width, point.y - pointer.y * height);
        if (distance < nearestDistance) {
          nearest = index;
          nearestDistance = distance;
        }
      });
      return nearest;
    };

    const updateReadout = (selected: number) => {
      const readout = readoutRef.current;
      if (!readout) return;
      const point = locusPoint(selected);
      const locus = loci[selected];
      readout.style.left = `${clamp(point.x + 22, 16, width - 220)}px`;
      readout.style.top = `${clamp(point.y - 58, 18, height - 86)}px`;
      readout.style.opacity = pointer.active > 0.18 ? "1" : "0";
      readout.textContent = `LOCUS ${String(selected + 1).padStart(2, "0")} / CH ${String(locus.channel + 1).padStart(2, "0")} / UNCERTAINTY RETAINED`;
    };

    const renderFrame = (time = 0) => {
      const explicitPhase = host.dataset.phase;
      if (explicitPhase !== "") targetPhase = clamp(Number(explicitPhase), 0, 4);
      currentPhase += (targetPhase - currentPhase) * (reducedMotion ? 1 : 0.075);
      pointer.x += (pointer.tx - pointer.x) * (reducedMotion ? 1 : 0.09);
      pointer.y += (pointer.ty - pointer.y) * (reducedMotion ? 1 : 0.09);
      pointer.active += (pointer.targetActive - pointer.active) * (reducedMotion ? 1 : 0.1);

      context.clearRect(0, 0, width, height);
      context.fillStyle = "#050505";
      context.fillRect(0, 0, width, height);

      const phase0 = 0.78 + smoothstep(0, 0.8, 4 - currentPhase) * 0.22;
      drawTraces(time, phase0);
      drawEvents(smoothstep(0.35, 1.2, currentPhase));
      drawPairwise(smoothstep(1.15, 2.1, currentPhase));
      drawHigherOrder(smoothstep(2.1, 3.2, currentPhase));
      drawUncertainty(smoothstep(3.05, 4, currentPhase));

      if (pointer.active > 0.03) {
        const selected = nearestLocus();
        const point = locusPoint(selected);
        const radius = mode === "public" ? Math.min(112, width * 0.085) : Math.min(92, width * 0.12);
        context.save();
        context.beginPath();
        context.arc(pointer.x * width, pointer.y * height, radius, 0, Math.PI * 2);
        context.strokeStyle = `rgba(120,152,255,${0.2 + pointer.active * 0.7})`;
        context.lineWidth = 1;
        context.stroke();
        context.beginPath();
        context.moveTo(pointer.x * width, pointer.y * height);
        context.lineTo(point.x, point.y);
        context.strokeStyle = `rgba(120,152,255,${pointer.active * 0.72})`;
        context.setLineDash([3, 5]);
        context.stroke();
        context.setLineDash([]);
        context.fillStyle = "#fffdf8";
        context.fillRect(point.x - 2, point.y - 2, 4, 4);
        context.restore();
        updateReadout(selected);
      } else if (readoutRef.current) {
        readoutRef.current.style.opacity = "0";
      }
    };

    redrawRef.current = () => renderFrame(performance.now());

    const resize = () => {
      const rect = host.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 1.6);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      renderFrame(performance.now());
    };

    const shouldAnimate = () => !disposed && !reducedMotion && documentVisible && elementVisible;
    const stopLoop = () => {
      if (frame === null) return;
      window.cancelAnimationFrame(frame);
      frame = null;
    };
    const tick = (time: number) => {
      frame = null;
      if (!shouldAnimate()) return;
      renderFrame(time);
      frame = window.requestAnimationFrame(tick);
    };
    const startLoop = () => {
      if (!shouldAnimate() || frame !== null) return;
      frame = window.requestAnimationFrame(tick);
    };

    const handlePointer = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      pointer.tx = clamp((event.clientX - rect.left) / rect.width);
      pointer.ty = clamp((event.clientY - rect.top) / rect.height);
      pointer.targetActive = 1;
      if (reducedMotion) renderFrame(0);
    };
    const handleLeave = () => {
      pointer.targetActive = 0;
      if (reducedMotion) renderFrame(0);
    };
    const handleTouch = (event: PointerEvent) => {
      if (event.pointerType === "mouse") return;
      pointer.targetActive = pointer.targetActive > 0 ? 0 : 1;
    };
    const handleScroll = () => {
      if (host.dataset.phase !== "") return;
      const root = document.querySelector<HTMLElement>(".pa-prospectus");
      const range = Math.max(1, (root?.scrollHeight ?? document.documentElement.scrollHeight) - window.innerHeight);
      targetPhase = clamp(window.scrollY / range, 0, 1) * 4;
      if (reducedMotion) renderFrame(0);
    };
    const handleVisibility = () => {
      documentVisible = !document.hidden;
      if (documentVisible) startLoop();
      else stopLoop();
    };

    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      elementVisible = entry.isIntersecting;
      if (elementVisible) {
        renderFrame(performance.now());
        startLoop();
      } else stopLoop();
    }, { threshold: 0.01 });

    resizeObserver.observe(host);
    intersectionObserver.observe(host);
    host.addEventListener("pointermove", handlePointer);
    host.addEventListener("pointerleave", handleLeave);
    host.addEventListener("pointerdown", handleTouch);
    document.addEventListener("visibilitychange", handleVisibility);
    if (host.dataset.phase === "") window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    resize();
    startLoop();

    return () => {
      disposed = true;
      redrawRef.current = null;
      stopLoop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      host.removeEventListener("pointermove", handlePointer);
      host.removeEventListener("pointerleave", handleLeave);
      host.removeEventListener("pointerdown", handleTouch);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [mode]);

  const classes = `pa-evidence-field pa-evidence-field-${mode} ${className}`.trim();
  return (
    <div ref={hostRef} className={classes} data-phase={phase ?? ""}>
      <canvas ref={canvasRef} aria-hidden="true" />
      <div ref={readoutRef} className="pa-evidence-readout" aria-hidden="true" />
      <p className="pa-sr-only">
        Illustrative evidence field showing stacked EEG-like traces, temporal event loci, pairwise relationships, higher-order groups, uncertainty bounds, and provenance annotations. It is an interface visualization, not patient data or model output.
      </p>
    </div>
  );
}
