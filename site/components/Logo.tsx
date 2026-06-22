export default function Logo({ className = "h-9 w-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 40"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Successfulbob"
    >
      <defs>
        <linearGradient id="bob-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3f6bff" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <text
        x="0"
        y="30"
        fontFamily="Inter, system-ui, -apple-system, sans-serif"
        fontWeight="700"
        fontSize="22"
        fill="white"
      >
        Successful
      </text>
      <text
        x="119"
        y="30"
        fontFamily="Inter, system-ui, -apple-system, sans-serif"
        fontWeight="700"
        fontSize="22"
        fill="url(#bob-gradient)"
      >
        bob
      </text>
    </svg>
  );
}
