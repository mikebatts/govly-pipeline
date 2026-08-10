"use client";

import { Solicitation } from "@/lib/data";

interface Props {
  solicitation: Solicitation;
  status: "pending" | "pass" | "reject" | "review";
  compact?: boolean;
}

const vehicleColors: Record<string, string> = {
  "SEWP V": "bg-[#e8f3ed] text-[#1f5c3a]",
  "GSA MAS": "bg-[#e8f0fb] text-[#1a4a7a]",
  "CIO-SP3": "bg-[#f5f0ff] text-[#4a1a7a]",
  "OASIS+": "bg-[#fef3e2] text-[#8b5a00]",
  "GWACs": "bg-[#f0f5ff] text-[#1a3a7a]",
  "Open Market": "bg-[#f5f5f5] text-[#5c5a55]",
};

export default function SolicitationCard({ solicitation, status, compact }: Props) {
  const vehicleClass = vehicleColors[solicitation.vehicle] ?? "bg-gray-100 text-gray-700";

  const statusIndicator = {
    pending: null,
    pass: (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-[#1f5c3a]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#1f5c3a] inline-block" />
        In scope
      </span>
    ),
    reject: (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-[#8b1a1a]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#8b1a1a] inline-block" />
        Excluded
      </span>
    ),
    review: (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-[#1a4a7a]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#1a4a7a] inline-block pulse-dot" />
        Human review
      </span>
    ),
  }[status];

  return (
    <div
      className={`rounded-lg border p-3 transition-all duration-200 ${
        status === "reject"
          ? "border-[#fdeaea] bg-[#fdeaea] opacity-60"
          : status === "review"
          ? "border-[#e8f0fb] bg-[#e8f0fb]"
          : "border-[var(--border)] bg-white"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-[11px] font-mono font-medium text-[var(--text-muted)]">
              {solicitation.agencyAbbr}
            </span>
            <span
              className={`text-[10px] font-mono font-medium px-1.5 py-0.5 rounded ${vehicleClass}`}
            >
              {solicitation.vehicle}
            </span>
            <span className="text-[10px] font-mono text-[var(--text-muted)]">
              NAICS {solicitation.naics}
            </span>
          </div>
          <p className="text-sm font-medium text-[var(--text-primary)] leading-snug">
            {solicitation.title}
          </p>
          {!compact && (
            <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
              {solicitation.description}
            </p>
          )}
        </div>
        <div className="text-right shrink-0">
          <div className="text-sm font-semibold text-[var(--text-primary)]">
            {solicitation.value}
          </div>
          <div className="text-[10px] font-mono text-[var(--text-muted)] mt-0.5">
            Due {solicitation.responseDeadline}
          </div>
        </div>
      </div>
      {statusIndicator && (
        <div className="mt-2 pt-2 border-t border-[var(--border)]">{statusIndicator}</div>
      )}
    </div>
  );
}
