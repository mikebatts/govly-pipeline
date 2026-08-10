import PipelineDemo from "@/components/PipelineDemo";

export default function Home() {
  return (
    <main
      className="min-h-screen"
      style={{ background: "var(--bg)", color: "var(--text-primary)" }}
    >
      {/* Header */}
      <header
        className="border-b sticky top-0 z-10"
        style={{
          borderColor: "var(--border)",
          background: "rgba(247,246,243,0.92)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="text-xs font-mono px-2 py-1 rounded"
              style={{
                background: "var(--accent-light)",
                color: "var(--accent)",
              }}
            >
              Pipeline
            </div>
            <span
              className="text-xs font-mono"
              style={{ color: "var(--text-muted)" }}
            >
              / capture-agent demo
            </span>
          </div>
          <div
            className="text-xs font-mono"
            style={{ color: "var(--text-muted)" }}
          >
            govly application &middot; Mike Battaglia
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-12">
        {/* Intro section */}
        <section className="space-y-5">
          <div className="space-y-1">
            <h1
              className="text-2xl sm:text-3xl font-semibold tracking-tight leading-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Capture, with the human in command.
            </h1>
            <p
              className="text-base"
              style={{ color: "var(--text-secondary)", lineHeight: "1.65" }}
            >
              I built this for Govly. I applied for the Product Engineer role and wanted to show
              how I think about agentic UX in a procurement context.
            </p>
          </div>

          <div
            className="rounded-lg border p-4 space-y-3 text-sm"
            style={{
              borderColor: "var(--border)",
              background: "var(--surface)",
              lineHeight: "1.65",
            }}
          >
            <p style={{ color: "var(--text-secondary)" }}>
              Government procurement is a trust domain. A contractor reviewing a $3M opportunity
              needs to understand what the agent found, why it scored the way it did, and what it
              does not know. Black-box recommendations don not land here.
            </p>
            <p style={{ color: "var(--text-secondary)" }}>
              The design principle: every step is expandable, every score has visible reasoning,
              and nothing advances past a human gate without an explicit call. I run this same
              pattern in production on personal projects: a home infrastructure agent that manages
              real services and trading bots with explicit kill switches. The agent works; you
              decide.
            </p>
            <p style={{ color: "var(--text-secondary)" }}>
              This demo is fully scripted. No API keys, no LLM calls. The mock contractor is
              Meridian Systems, an IT infrastructure VAR holding SEWP V and GSA MAS vehicles.
            </p>
          </div>

          {/* Quick facts */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Solicitations", value: "6" },
              { label: "Filtered in", value: "4" },
              { label: "Filtered out", value: "2" },
              { label: "Human gates", value: "2" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-lg border p-3 text-center"
                style={{ borderColor: "var(--border)", background: "var(--surface)" }}
              >
                <div
                  className="text-2xl font-semibold tabular-nums"
                  style={{ color: "var(--text-primary)" }}
                >
                  {item.value}
                </div>
                <div
                  className="text-[11px] font-mono mt-0.5"
                  style={{ color: "var(--text-muted)" }}
                >
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Demo */}
        <section className="space-y-3">
          <div className="flex items-baseline justify-between">
            <h2
              className="text-sm font-semibold uppercase tracking-wider"
              style={{ color: "var(--text-muted)" }}
            >
              Live Demo
            </h2>
            <span
              className="text-xs font-mono"
              style={{ color: "var(--text-muted)" }}
            >
              click any step to expand reasoning
            </span>
          </div>
          <PipelineDemo />
        </section>

        {/* Design notes */}
        <section className="space-y-4">
          <h2
            className="text-sm font-semibold uppercase tracking-wider"
            style={{ color: "var(--text-muted)" }}
          >
            Design decisions
          </h2>
          <div
            className="rounded-lg border divide-y text-sm"
            style={{ borderColor: "var(--border)", background: "var(--surface)" }}
          >
            {[
              {
                title: "Deterministic filtering first",
                body: "NAICS codes and contract vehicles are rules, not suggestions. The agent checks hard constraints before touching any heuristic scoring. A DLA CIO-SP3 opportunity is just off-limits if you don't hold that vehicle.",
              },
              {
                title: "Low confidence = flagged, not hidden",
                body: "The SOC support opportunity gets a partial score and a flag rather than a soft recommendation. The agent says what it doesn't know. That's table stakes in a domain where overconfidence costs money.",
              },
              {
                title: "Agency intel before scoring",
                body: "Award history contextualizes competition. Knowing that Peraton just took a SEWP V SOC award from GSA in May changes how you read an 870K ask.",
              },
              {
                title: "Hard stop at the gate",
                body: "The agent drafts a capture summary and then stops. The buttons exist but nothing fires without an explicit human action. This is intentional and should be visible in the UI, not buried in a tooltip.",
              },
            ].map((item) => (
              <div key={item.title} className="p-4 space-y-1">
                <div
                  className="font-medium"
                  style={{ color: "var(--text-primary)" }}
                >
                  {item.title}
                </div>
                <div
                  className="text-[13px]"
                  style={{ color: "var(--text-secondary)", lineHeight: "1.6" }}
                >
                  {item.body}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer / about */}
        <footer
          className="border-t pt-8 space-y-4"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="space-y-2">
              <div
                className="font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                Mike Battaglia
              </div>
              <div
                className="text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                Staff Product Engineer. I build agentic systems in production on my own time.
                This was built as an application artifact for Govly. Not affiliated with Govly.
              </div>
            </div>
            <div className="flex flex-col gap-1 text-sm shrink-0">
              {[
                {
                  label: "GitHub",
                  href: "https://github.com/mikebatts/govly-pipeline",
                },
                { label: "mikebatts.net", href: "https://mikebatts.net" },
                {
                  label: "LinkedIn",
                  href: "https://www.linkedin.com/in/mikebatts/",
                },
                {
                  label: "mbattaglia92@gmail.com",
                  href: "mailto:mbattaglia92@gmail.com",
                },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="hover:underline transition-colors"
                  style={{ color: "var(--accent)" }}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div
            className="text-[11px] font-mono"
            style={{ color: "var(--text-muted)" }}
          >
            No LLM calls. No API keys. All data is hardcoded in TypeScript.
          </div>
        </footer>
      </div>
    </main>
  );
}
