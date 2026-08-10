"use client";

import { useState, useEffect, useRef } from "react";
import { DEMO_STEPS, CONTRACTOR } from "@/lib/data";
import StepEntry from "./StepEntry";

type RunState = "idle" | "running" | "done";

export default function PipelineDemo() {
  const [runState, setRunState] = useState<RunState>("idle");
  const [visibleSteps, setVisibleSteps] = useState<number>(0);
  const [elapsed, setElapsed] = useState<number>(0);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<number>(0);

  function clearAll() {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    if (intervalRef.current) clearInterval(intervalRef.current);
  }

  function run() {
    clearAll();
    setVisibleSteps(0);
    setElapsed(0);
    setRunState("running");
    startTimeRef.current = Date.now();

    intervalRef.current = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);

    const totalDuration = DEMO_STEPS[DEMO_STEPS.length - 1].delayMs;

    DEMO_STEPS.forEach((step, i) => {
      const t = setTimeout(() => {
        setVisibleSteps((prev) => Math.max(prev, i + 1));
        setTimeout(() => {
          bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }, 50);
      }, step.delayMs);
      timeoutsRef.current.push(t);
    });

    const done = setTimeout(() => {
      setRunState("done");
      if (intervalRef.current) clearInterval(intervalRef.current);
    }, totalDuration + 500);
    timeoutsRef.current.push(done);
  }

  function reset() {
    clearAll();
    setVisibleSteps(0);
    setElapsed(0);
    setRunState("idle");
  }

  useEffect(() => {
    return () => clearAll();
  }, []);

  const totalMs = DEMO_STEPS[DEMO_STEPS.length - 1].delayMs;

  return (
    <div className="rounded-xl border border-[var(--border)] bg-white overflow-hidden shadow-sm">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-[var(--surface-raised)]">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#f0b429] opacity-70" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#3ecf8e] opacity-70" />
          </div>
          <div className="text-xs font-mono text-[var(--text-muted)]">
            capture-agent / {CONTRACTOR.name}
          </div>
        </div>
        <div className="flex items-center gap-3">
          {runState === "running" && (
            <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--text-muted)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1f5c3a] pulse-dot inline-block" />
              {elapsed}s
            </div>
          )}
          {runState === "done" && (
            <div className="text-xs font-mono text-[#1f5c3a]">
              completed in ~{Math.round(totalMs / 1000)}s
            </div>
          )}
          <div className="flex gap-2">
            {runState === "idle" ? (
              <button
                onClick={run}
                className="px-4 py-1.5 bg-[var(--accent)] text-white rounded text-xs font-medium hover:bg-[var(--accent-mid)] transition-colors min-h-[44px] sm:min-h-0"
              >
                Run
              </button>
            ) : runState === "running" ? (
              <button
                onClick={reset}
                className="px-4 py-1.5 border border-[var(--border-strong)] text-[var(--text-secondary)] rounded text-xs font-medium hover:bg-[var(--border)] transition-colors min-h-[44px] sm:min-h-0"
              >
                Reset
              </button>
            ) : (
              <button
                onClick={run}
                className="px-4 py-1.5 border border-[var(--border-strong)] text-[var(--text-secondary)] rounded text-xs font-medium hover:bg-[var(--border)] transition-colors min-h-[44px] sm:min-h-0"
              >
                Run again
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Contractor profile strip */}
      <div className="px-4 py-2.5 border-b border-[var(--border)] bg-[var(--bg)] flex flex-wrap gap-3 text-[10px] font-mono text-[var(--text-muted)]">
        <span>
          <span className="text-[var(--text-secondary)]">contractor</span>{" "}
          {CONTRACTOR.name}
        </span>
        <span>
          <span className="text-[var(--text-secondary)]">type</span> {CONTRACTOR.type}
        </span>
        <span>
          <span className="text-[var(--text-secondary)]">naics</span>{" "}
          {CONTRACTOR.naics.join(", ")}
        </span>
        <span>
          <span className="text-[var(--text-secondary)]">vehicles</span>{" "}
          {CONTRACTOR.vehicles.join(", ")}
        </span>
        <span>
          <span className="text-[var(--text-secondary)]">past-perf</span>{" "}
          {CONTRACTOR.pastPerformance.join(", ")}
        </span>
      </div>

      {/* Trace area */}
      <div className="p-4 min-h-[320px]">
        {runState === "idle" && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-10 h-10 rounded-full border-2 border-[var(--border)] flex items-center justify-center mb-4">
              <span className="text-[var(--text-muted)] text-lg">▷</span>
            </div>
            <div className="text-sm text-[var(--text-muted)]">
              Hit Run to start the capture agent.
            </div>
            <div className="text-xs font-mono text-[var(--text-muted)] mt-1">
              6 solicitations queued. ~14s scripted demo.
            </div>
          </div>
        )}

        {runState !== "idle" && (
          <div className="space-y-0">
            {DEMO_STEPS.slice(0, visibleSteps).map((step, i) => (
              <StepEntry key={step.id} step={step} index={i} />
            ))}

            {runState === "running" && visibleSteps < DEMO_STEPS.length && (
              <div className="flex gap-3 py-2">
                <div className="w-6 h-6 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)] pulse-dot inline-block" />
                </div>
                <span className="text-xs font-mono text-[var(--text-muted)] self-center">
                  processing...
                  <span className="cursor-blink">|</span>
                </span>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* Progress bar */}
      {runState !== "idle" && (
        <div className="h-0.5 bg-[var(--border)]">
          <div
            className="h-full bg-[var(--accent)] transition-all duration-300"
            style={{
              width:
                runState === "done"
                  ? "100%"
                  : `${Math.min(100, (visibleSteps / DEMO_STEPS.length) * 100)}%`,
            }}
          />
        </div>
      )}
    </div>
  );
}
