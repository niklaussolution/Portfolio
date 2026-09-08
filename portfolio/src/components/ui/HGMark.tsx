export function HGMark({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M24 2L44 10V24C44 34.5 36 42.5 24 46C12 42.5 4 34.5 4 24V10L24 2Z"
        stroke="#E10600"
        strokeWidth="1.5"
      />
      <path d="M14 16V32M14 24H22M22 16V32" stroke="#F3F3F3" strokeWidth="2" strokeLinecap="square" />
      <path
        d="M27 20C27 17.7909 28.7909 16 31 16H33C35.2091 16 37 17.7909 37 20V22C37 24.2091 35.2091 26 33 26H29V32"
        stroke="#F3F3F3"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <path d="M29 26H35" stroke="#E10600" strokeWidth="2" strokeLinecap="square" />
    </svg>
  );
}
