"use client";

import { useEffect, useState } from "react";

interface Props {
  label: string;
  value: number;
  delay?: number;
}

export default function ScoreBar({ label, value, delay = 0 }: Props) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setWidth(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  const color =
    value >= 85
      ? "bg-[#1f5c3a]"
      : value >= 65
      ? "bg-[#8b7a00]"
      : "bg-[#8b1a1a]";

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-mono text-[var(--text-secondary)]">{label}</span>
        <span className="text-[11px] font-mono font-medium text-[var(--text-primary)]">
          {value}
        </span>
      </div>
      <div className="h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${color}`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}
