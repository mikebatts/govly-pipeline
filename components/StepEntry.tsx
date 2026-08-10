"use client";

import { useState } from "react";
import { DemoStep, StepData, SOLICITATIONS } from "@/lib/data";
import SolicitationCard from "./SolicitationCard";
import ScoreBar from "./ScoreBar";

interface Props {
  step: DemoStep;
  index: number;
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-90" : ""}`}
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M5 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function StepEntry({ step, index }: Props) {
  const [expanded, setExpanded] = useState(false);

  const solicitation = step.solicitationId
    ? SOLICITATIONS.find((s) => s.id === step.solicitationId)
    : null;

  const data: StepData = step.data ?? {};

  const typeConfig: Record<
    DemoStep["type"],
    { label: string; icon: string; color: string; bg: string }
  > = {
    "system-start": {
      label: "System",
      icon: "◆",
      color: "text-[var(--text-muted)]",
      bg: "bg-[var(--surface-raised)]",
    },
    ingest: {
      label: "Ingest",
      icon: "↓",
      color: "text-[var(--text-secondary)]",
      bg: "bg-[var(--surface-raised)]",
    },
    "filter-pass": {
      label: "Filter",
      icon: "✓",
      color: "text-[#1f5c3a]",
      bg: "bg-[#e8f3ed]",
    },
    "filter-reject": {
      label: "Filter",
      icon: "✕",
      color: "text-[#8b1a1a]",
      bg: "bg-[#fdeaea]",
    },
    "agency-lookup": {
      label: "Intel",
      icon: "⊕",
      color: "text-[#1a4a7a]",
      bg: "bg-[#e8f0fb]",
    },
    score: {
      label: "Score",
      icon: "◎",
      color: "text-[var(--text-primary)]",
      bg: "bg-white",
    },
    draft: {
      label: "Draft",
      icon: "✎",
      color: "text-[#1f5c3a]",
      bg: "bg-[#e8f3ed]",
    },
    "flag-review": {
      label: "Flag",
      icon: "⚑",
      color: "text-[#1a4a7a]",
      bg: "bg-[#e8f0fb]",
    },
    gate: {
      label: "Gate",
      icon: "▣",
      color: "text-[var(--text-primary)]",
      bg: "bg-white",
    },
  };

  const config = typeConfig[step.type];

  function renderSummaryLine() {
    switch (step.type) {
      case "system-start":
        return (
          <span className="text-[var(--text-secondary)]">
            Initialized for{" "}
            <span className="font-medium text-[var(--text-primary)]">
              {String(data.profile ?? "")}
            </span>
            . Watching{" "}
            {(data.vehicles as string[])?.join(", ")}.
          </span>
        );
      case "ingest":
        return (
          <span className="text-[var(--text-secondary)]">
            {String(data.message ?? "")}
          </span>
        );
      case "filter-pass":
        return (
          <span>
            <span className="font-medium text-[var(--text-primary)]">
              {solicitation?.title ?? step.solicitationId}
            </span>{" "}
            <span className="text-[var(--text-secondary)]">passed filter.</span>
          </span>
        );
      case "filter-reject":
        return (
          <span>
            <span className="font-medium text-[#8b1a1a]">
              {solicitation?.title ?? step.solicitationId}
            </span>{" "}
            <span className="text-[var(--text-secondary)]">excluded.</span>
          </span>
        );
      case "agency-lookup":
        return (
          <span className="text-[var(--text-secondary)]">
            Pulled award history for{" "}
            <span className="font-medium text-[var(--text-primary)]">
              {solicitation?.agencyAbbr}
            </span>
            .{" "}
            {String(data.awardsLast12Mo ?? "")} awards in 12 months, avg{" "}
            {String(data.avgAwardValue ?? "")}.
          </span>
        );
      case "score":
        return (
          <span>
            <span className="font-medium text-[var(--text-primary)]">
              {solicitation?.agencyAbbr} — {solicitation?.title}
            </span>{" "}
            <span className="text-[var(--text-secondary)]">scored</span>{" "}
            <span
              className={`font-semibold ${
                (data.total as number) >= 85
                  ? "text-[#1f5c3a]"
                  : (data.total as number) >= 70
                  ? "text-[#8b7a00]"
                  : "text-[#8b1a1a]"
              }`}
            >
              {String(data.total ?? "")}/100
            </span>
            .
          </span>
        );
      case "flag-review":
        return (
          <span>
            <span className="font-medium text-[#1a4a7a]">
              {solicitation?.agencyAbbr} — {solicitation?.title}
            </span>{" "}
            <span className="text-[var(--text-secondary)]">
              flagged for human review. Scoring paused.
            </span>
          </span>
        );
      case "draft":
        return (
          <span className="text-[var(--text-secondary)]">
            Capture summary drafted for{" "}
            <span className="font-medium text-[var(--text-primary)]">
              {solicitation?.agencyAbbr} — {solicitation?.title}
            </span>
            .
          </span>
        );
      case "gate":
        return (
          <span className="font-medium text-[var(--text-primary)]">
            Awaiting your call.
          </span>
        );
      default:
        return null;
    }
  }

  function renderDetail() {
    switch (step.type) {
      case "system-start":
        return (
          <div className="space-y-2 text-xs font-mono">
            <div className="flex gap-2">
              <span className="text-[var(--text-muted)]">naics</span>
              <span className="text-[var(--text-primary)]">
                {(data.naics as string[])?.join(", ")}
              </span>
            </div>
            <div className="flex gap-2">
              <span className="text-[var(--text-muted)]">vehicles</span>
              <span className="text-[var(--text-primary)]">
                {(data.vehicles as string[])?.join(", ")}
              </span>
            </div>
          </div>
        );

      case "filter-pass":
      case "filter-reject":
        return (
          <div className="space-y-3">
            <div
              className={`text-xs font-mono rounded p-2 ${
                step.type === "filter-reject"
                  ? "bg-[#fdeaea] text-[#8b1a1a]"
                  : "bg-[#e8f3ed] text-[#1f5c3a]"
              }`}
            >
              {String(data.reason ?? "")}
            </div>
            {solicitation && (
              <SolicitationCard
                solicitation={solicitation}
                status={step.type === "filter-pass" ? "pass" : "reject"}
                compact
              />
            )}
          </div>
        );

      case "agency-lookup":
        return (
          <div className="space-y-2">
            {solicitation && (
              <div className="text-xs font-mono text-[var(--text-muted)] mb-2">
                {solicitation.agency}
              </div>
            )}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded bg-[var(--surface-raised)] p-2">
                <div className="text-[var(--text-muted)] mb-0.5">Awards / 12 mo</div>
                <div className="font-semibold text-[var(--text-primary)]">
                  {String(data.awardsLast12Mo ?? "")}
                </div>
              </div>
              <div className="rounded bg-[var(--surface-raised)] p-2">
                <div className="text-[var(--text-muted)] mb-0.5">Avg award</div>
                <div className="font-semibold text-[var(--text-primary)]">
                  {String(data.avgAwardValue ?? "")}
                </div>
              </div>
            </div>
            <div className="rounded bg-[var(--surface-raised)] p-2 text-xs">
              <div className="text-[var(--text-muted)] mb-1">Top recipients</div>
              <div className="flex flex-wrap gap-1">
                {(data.topRecipients as string[])?.map((r) => (
                  <span
                    key={r}
                    className="bg-[var(--border)] text-[var(--text-secondary)] px-1.5 py-0.5 rounded text-[10px] font-mono"
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-[10px] font-mono text-[var(--text-muted)] italic px-0.5">
              Recent: {String(data.recentAward ?? "")}
            </div>
          </div>
        );

      case "score":
        return (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div
                className={`text-3xl font-semibold tabular-nums ${
                  (data.total as number) >= 85
                    ? "text-[#1f5c3a]"
                    : (data.total as number) >= 70
                    ? "text-[#8b7a00]"
                    : "text-[#8b1a1a]"
                }`}
              >
                {String(data.total ?? "")}
              </div>
              <div className="text-[var(--text-muted)] text-sm">/100</div>
            </div>
            <div className="space-y-2">
              <ScoreBar label="Vehicle fit" value={data.vehicleFit as number} delay={50} />
              <ScoreBar label="NAICS fit" value={data.naicsFit as number} delay={150} />
              <ScoreBar
                label="Competition level"
                value={data.competitionLevel as number}
                delay={250}
              />
              <ScoreBar
                label="Value alignment"
                value={data.valueAlignment as number}
                delay={350}
              />
            </div>
            <div className="text-xs text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border)] pt-2">
              {String(data.reasoning ?? "")}
            </div>
          </div>
        );

      case "flag-review":
        return (
          <div className="space-y-3">
            <div className="rounded bg-[#e8f0fb] border border-[#c5d8f0] p-3 text-xs text-[#1a4a7a]">
              <div className="font-medium mb-1">Low confidence detected</div>
              {String(data.reason ?? "")}
            </div>
            <div className="space-y-2">
              <ScoreBar label="Vehicle fit" value={data.vehicleFit as number} delay={50} />
              <ScoreBar label="NAICS fit" value={data.naicsFit as number} delay={150} />
              <ScoreBar
                label="Competition level"
                value={data.competitionLevel as number}
                delay={250}
              />
              <ScoreBar
                label="Value alignment"
                value={data.valueAlignment as number}
                delay={350}
              />
            </div>
          </div>
        );

      case "draft":
        return (
          <div className="space-y-2">
            {solicitation && (
              <SolicitationCard solicitation={solicitation} status="pass" compact />
            )}
            <div className="rounded border border-[#b8d9c5] bg-[#f0f9f4] p-3 text-sm text-[var(--text-primary)] leading-relaxed">
              {String(data.summary ?? "")}
            </div>
          </div>
        );

      case "gate":
        return (
          <div className="rounded border-2 border-[var(--accent)] bg-[#e8f3ed] p-4 text-sm">
            <div className="font-semibold text-[var(--accent)] mb-1">
              Recommended: Pursue VA VISN 5 — score 91/100
            </div>
            <div className="text-[var(--text-secondary)] text-xs mb-3">
              {String(data.message ?? "")}
            </div>
            <div className="flex gap-2">
              <div className="px-4 py-2 bg-[var(--accent)] text-white rounded text-xs font-medium cursor-default">
                Approve and capture
              </div>
              <div className="px-4 py-2 border border-[var(--border-strong)] text-[var(--text-secondary)] rounded text-xs font-medium cursor-default">
                Pass
              </div>
            </div>
            <div className="mt-2 text-[10px] font-mono text-[var(--text-muted)]">
              Nothing submits until you confirm. Agent is waiting.
            </div>
          </div>
        );

      default:
        return null;
    }
  }

  const isExpandable = step.type !== "ingest" && step.type !== "gate";

  return (
    <div className="step-enter" style={{ animationDelay: `${index * 20}ms` }}>
      <div className="flex gap-3">
        {/* Timeline */}
        <div className="flex flex-col items-center">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] shrink-0 font-mono ${config.bg} ${config.color} border border-[var(--border)]`}
          >
            {config.icon}
          </div>
          <div className="w-px bg-[var(--step-line)] flex-1 mt-1 min-h-[8px]" />
        </div>

        {/* Content */}
        <div className="flex-1 pb-4 min-w-0">
          <div className="flex items-start gap-2 justify-between mb-1">
            <div className="text-sm leading-snug min-w-0">{renderSummaryLine()}</div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                {config.label}
              </span>
              {isExpandable && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className={`flex items-center gap-1 text-[10px] font-mono rounded px-1.5 py-0.5 transition-colors min-h-[44px] sm:min-h-0 ${
                    expanded
                      ? "bg-[var(--border)] text-[var(--text-secondary)]"
                      : "text-[var(--text-muted)] hover:bg-[var(--border)]"
                  }`}
                  aria-label={expanded ? "Collapse step detail" : "Expand step detail"}
                >
                  <ChevronIcon open={expanded} />
                  {expanded ? "hide" : "show"}
                </button>
              )}
            </div>
          </div>

          {(expanded || step.type === "gate" || step.type === "draft") && (
            <div className={`mt-2 ${step.type !== "gate" && step.type !== "draft" ? "pl-0" : ""}`}>
              {renderDetail()}
            </div>
          )}

          {step.type === "ingest" && (
            <div className="mt-1 text-xs font-mono text-[var(--text-muted)]">
              Scanning SEWP V, GSA MAS, CIO-SP3, OASIS+...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
