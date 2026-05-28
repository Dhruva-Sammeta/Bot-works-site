// Inline SVG decorative elements - hand-crafted geometric vectors

export const FacetedGrid = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 400 400" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Faceted wireframe pattern */}
    <g stroke="currentColor" strokeWidth="0.5" opacity="0.15">
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * Math.PI * 2) / 8;
        const x = 200 + Math.cos(angle) * 180;
        const y = 200 + Math.sin(angle) * 180;
        return <line key={i} x1="200" y1="200" x2={x} y2={y} />;
      })}
      <polygon points="200,20 380,110 380,290 200,380 20,290 20,110" />
      <polygon points="200,80 330,140 330,260 200,320 70,260 70,140" />
      <polygon points="200,140 270,170 270,230 200,260 130,230 130,170" />
      <circle cx="200" cy="200" r="180" strokeDasharray="4 8" />
      <circle cx="200" cy="200" r="120" strokeDasharray="2 6" />
    </g>
  </svg>
);

export const DiamondShape = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M60 5L110 35V85L60 115L10 85V35L60 5Z" stroke="currentColor" strokeWidth="1" />
    <path d="M60 5L110 85" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
    <path d="M60 5L10 85" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
    <path d="M10 35L110 35" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
    <path d="M60 5V115" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
  </svg>
);

export const HexGrid = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 800 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="hexgrid" width="60" height="52" patternUnits="userSpaceOnUse" patternTransform="scale(1.2)">
        <path d="M30 0L60 15V37L30 52L0 37V15L30 0Z" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.08" />
      </pattern>
    </defs>
    <rect width="800" height="200" fill="url(#hexgrid)" />
  </svg>
);

export const FloatingParticles = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 600 600" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {Array.from({ length: 30 }).map((_, i) => {
      const x = Math.random() * 600;
      const y = Math.random() * 600;
      const r = Math.random() * 2 + 0.5;
      const opacity = Math.random() * 0.4 + 0.1;
      return <circle key={i} cx={x} cy={y} r={r} fill="currentColor" opacity={opacity} />;
    })}
  </svg>
);

export const CrosshairMarker = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="20" y1="0" x2="20" y2="40" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
    <line x1="0" y1="20" x2="40" y2="20" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
    <circle cx="20" cy="20" r="4" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
    <circle cx="20" cy="20" r="1" fill="currentColor" opacity="0.6" />
  </svg>
);
