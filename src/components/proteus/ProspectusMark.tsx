type ProspectusMarkProps = {
  className?: string;
};

export function ProspectusMark({ className = "" }: ProspectusMarkProps) {
  return (
    <svg className={className} viewBox="0 0 52 28" fill="none" aria-hidden="true">
      <path d="M1 8h8l3 8 5-13 6 21 5-15 4 7h7" />
      <path d="M1 21h12c7 0 8-13 16-13h10" />
      <path d="M39 5c7 0 12 4 12 9s-5 9-12 9" />
      <circle cx="39" cy="14" r="2.2" />
    </svg>
  );
}
