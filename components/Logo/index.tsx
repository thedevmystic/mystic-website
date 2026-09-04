/* Inline logo SVG */

import { SVGProps } from 'react';

interface LogoProps extends SVGProps<SVGSVGElement> {
  className?: string;
  size?: number | string;
}

export default function Logo({ className = 'text-primary', size = 24 }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="7 15 46 32"
      strokeWidth="6"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      width={size}
      height={size}
      className={className}
    >
      <path d="M10 42 C16 20, 22 20, 26 34 C29 44, 33 44, 32 30 C31 18, 37 18, 40 32 C43 44, 47 44, 50 32" />
    </svg>
  );
}
