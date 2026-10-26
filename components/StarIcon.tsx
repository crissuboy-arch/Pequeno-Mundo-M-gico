type Props = {
  size?: number;
  fill?: string;
  stroke?: string;
  className?: string;
};

export function StarIcon({ size = 24, fill = "#F6BE3F", stroke = "#E3A41E", className }: Props) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" className={className}>
      <path
        d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.3 5.8 20.9l1.6-7L2 9.2l7.1-.6z"
        fill={fill}
        stroke={stroke}
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Wave({ fill = "#FFF8EC", className = "" }: { fill?: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`block h-14 w-full sm:h-[90px] ${className}`}
    >
      <path
        d="M0 55 C 120 5, 250 5, 370 45 S 610 95, 730 50 S 970 0, 1090 40 S 1330 90, 1440 45 L1440 100 L0 100Z"
        fill={fill}
      />
    </svg>
  );
}
