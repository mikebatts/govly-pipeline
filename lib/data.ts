// All demo data is hardcoded. No API calls, no LLM, no secrets.

export type Vehicle = "SEWP V" | "GSA MAS" | "CIO-SP3" | "OASIS+" | "GWACs" | "Open Market";
export type Verdict = "pursue" | "reject" | "human-review";

export interface Solicitation {
  id: string;
  agency: string;
  agencyAbbr: string;
  title: string;
  naics: string;
  vehicle: Vehicle;
  responseDeadline: string;
  value: string;
  description: string;
}

export interface AgencyHistory {
  agency: string;
  awardsLast12Mo: number;
  avgAwardValue: string;
  topRecipients: string[];
  recentAward: string;
}

export interface Score {
  total: number;
  vehicleFit: number;
  naicsFit: number;
  competitionLevel: number;
  valueAlignment: number;
  reasoning: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type StepData = Record<string, any>;

export interface DemoStep {
  id: string;
  type:
    | "system-start"
    | "ingest"
    | "filter-pass"
    | "filter-reject"
    | "agency-lookup"
    | "score"
    | "draft"
    | "flag-review"
    | "gate";
  delayMs: number;
  solicitationId?: string;
  data?: StepData;
}

// Contractor profile
export const CONTRACTOR = {
  name: "Meridian Systems",
  type: "IT Infrastructure VAR",
  naics: ["541512", "541519", "541611"],
  vehicles: ["SEWP V", "GSA MAS"] as Vehicle[],
  clearances: ["Secret"],
  pastPerformance: ["DHS", "VA", "DoD", "EPA"],
  revenue: "$8.2M TTM",
};

// Mock solicitations
export const SOLICITATIONS: Solicitation[] = [
  {
    id: "sol-001",
    agency: "Department of Veterans Affairs",
    agencyAbbr: "VA",
    title: "Enterprise Network Infrastructure Refresh — VISN 5",
    naics: "541512",
    vehicle: "SEWP V",
    responseDeadline: "2026-09-08",
    value: "$2.4M",
    description:
      "Cisco switching and routing hardware refresh across 14 medical centers. Includes installation, configuration, and 3-year maintenance.",
  },
  {
    id: "sol-002",
    agency: "Environmental Protection Agency",
    agencyAbbr: "EPA",
    title: "Hybrid Cloud Migration and Managed Services",
    naics: "541512",
    vehicle: "GSA MAS",
    responseDeadline: "2026-09-15",
    value: "$1.1M",
    description:
      "Migrate on-prem workloads to AWS GovCloud. Ongoing managed services for 24 months post-migration.",
  },
  {
    id: "sol-003",
    agency: "Defense Logistics Agency",
    agencyAbbr: "DLA",
    title: "Data Center Consolidation and Storage Modernization",
    naics: "541519",
    vehicle: "CIO-SP3",
    responseDeadline: "2026-09-22",
    value: "$5.7M",
    description:
      "Consolidate two legacy data centers into single primary site. NetApp and Pure Storage hardware preferred.",
  },
  {
    id: "sol-004",
    agency: "General Services Administration",
    agencyAbbr: "GSA",
    title: "IT Security Operations Center Support",
    naics: "541512",
    vehicle: "SEWP V",
    responseDeadline: "2026-09-29",
    value: "$870K",
    description:
      "SOC staffing and tooling support. 24/7 monitoring, SIEM management, and incident response for GSA's enterprise network.",
  },
  {
    id: "sol-005",
    agency: "Department of Homeland Security",
    agencyAbbr: "DHS",
    title: "End-User Device Procurement and Lifecycle Management",
    naics: "541512",
    vehicle: "GSA MAS",
    responseDeadline: "2026-10-06",
    value: "$3.2M",
    description:
      "Laptop and workstation procurement for 1,800 users across multiple components. Includes ITAM software and disposal services.",
  },
  {
    id: "sol-006",
    agency: "Department of Transportation",
    agencyAbbr: "DOT",
    title: "Agile Software Development and DevSecOps Platform",
    naics: "541511",
    vehicle: "OASIS+",
    responseDeadline: "2026-10-13",
    value: "$9.1M",
    description:
      "Custom software development for FMCSA licensing portal modernization. DevSecOps pipeline, CI/CD, ATO support.",
  },
];

// Agency award history (mock intel)
export const AGENCY_HISTORY: Record<string, AgencyHistory> = {
  VA: {
    agency: "Department of Veterans Affairs",
    awardsLast12Mo: 47,
    avgAwardValue: "$1.8M",
    topRecipients: ["Carahsoft Technology", "SAIC", "General Dynamics IT"],
    recentAward: "$2.1M SEWP V award to Carahsoft for network hardware, Apr 2026",
  },
  EPA: {
    agency: "Environmental Protection Agency",
    awardsLast12Mo: 12,
    avgAwardValue: "$900K",
    topRecipients: ["Leidos", "CGI Federal", "Accenture Federal"],
    recentAward: "$1.3M GSA MAS award to CGI Federal for cloud services, Mar 2026",
  },
  DLA: {
    agency: "Defense Logistics Agency",
    awardsLast12Mo: 89,
    avgAwardValue: "$4.2M",
    topRecipients: ["SAIC", "Booz Allen Hamilton", "ManTech"],
    recentAward: "$6.4M CIO-SP3 award to ManTech for data center ops, Feb 2026",
  },
  GSA: {
    agency: "General Services Administration",
    awardsLast12Mo: 31,
    avgAwardValue: "$650K",
    topRecipients: ["Peraton", "CACI", "Leidos"],
    recentAward: "$980K SEWP V award to Peraton for SOC tooling, May 2026",
  },
  DHS: {
    agency: "Department of Homeland Security",
    awardsLast12Mo: 63,
    avgAwardValue: "$2.7M",
    topRecipients: ["General Dynamics IT", "Leidos", "Booz Allen Hamilton"],
    recentAward: "$3.8M GSA MAS award to GDITI for device management, Jan 2026",
  },
  DOT: {
    agency: "Department of Transportation",
    awardsLast12Mo: 18,
    avgAwardValue: "$5.1M",
    topRecipients: ["Accenture Federal", "Deloitte", "SAIC"],
    recentAward: "$8.2M OASIS+ award to Accenture for portal dev, Jun 2026",
  },
};

// Scores (deterministic)
export const SCORES: Record<string, Score> = {
  "sol-001": {
    total: 91,
    vehicleFit: 100,
    naicsFit: 100,
    competitionLevel: 72,
    valueAlignment: 88,
    reasoning:
      "Strong vehicle and NAICS alignment. VA is a repeat customer with past performance on file. Competition will be 6-10 primes; Meridian's SEWP V pricing position is competitive. Value sits inside our sweet spot. Recommend pursue.",
  },
  "sol-002": {
    total: 78,
    vehicleFit: 100,
    naicsFit: 100,
    competitionLevel: 60,
    valueAlignment: 70,
    reasoning:
      "GSA MAS is on-vehicle. Cloud migration is adjacent to core competency but EPA has active relationships with CGI and Leidos. Past performance with EPA is a differentiator. Value is below average ticket but margin on managed services is strong.",
  },
  "sol-004": {
    total: 74,
    vehicleFit: 100,
    naicsFit: 95,
    competitionLevel: 55,
    valueAlignment: 65,
    reasoning:
      "SEWP V vehicle match. SOC support is within NAICS 541512 scope but Meridian's SOC bench is thin. Competition will include Peraton and CACI with deeper SOC depth. Value is $870K, which is workable. Flagging for human review on capability fit before scoring final.",
  },
  "sol-005": {
    total: 85,
    vehicleFit: 100,
    naicsFit: 100,
    competitionLevel: 66,
    valueAlignment: 90,
    reasoning:
      "GSA MAS on-vehicle, DHS past performance is a notable asset. Device procurement and lifecycle is a core Meridian strength. $3.2M is high-confidence territory. Recommend pursue.",
  },
};

// The scripted demo trace
export const DEMO_STEPS: DemoStep[] = [
  {
    id: "step-0",
    type: "system-start",
    delayMs: 0,
    data: {
      message: "Capture agent initialized. Watching 4 contract vehicles: SEWP V, GSA MAS, CIO-SP3, OASIS+.",
      profile: CONTRACTOR.name,
      vehicles: CONTRACTOR.vehicles,
      naics: CONTRACTOR.naics,
    },
  },
  {
    id: "step-1",
    type: "ingest",
    delayMs: 900,
    data: { count: 6, message: "6 new solicitations detected in the last 24 hours." },
  },
  // Filter pass: sol-001 (VA SEWP V)
  {
    id: "step-2",
    type: "filter-pass",
    delayMs: 1400,
    solicitationId: "sol-001",
    data: { reason: "SEWP V on-vehicle. NAICS 541512 exact match." },
  },
  // Filter pass: sol-002 (EPA GSA MAS)
  {
    id: "step-3",
    type: "filter-pass",
    delayMs: 1900,
    solicitationId: "sol-002",
    data: { reason: "GSA MAS on-vehicle. NAICS 541512 exact match." },
  },
  // Filter reject: sol-003 (DLA CIO-SP3) - wrong vehicle
  {
    id: "step-4",
    type: "filter-reject",
    delayMs: 2400,
    solicitationId: "sol-003",
    data: {
      reason:
        "CIO-SP3 vehicle. Meridian does not hold a CIO-SP3 task order. Excluded from scoring.",
    },
  },
  // Filter pass: sol-004 (GSA SOC)
  {
    id: "step-5",
    type: "filter-pass",
    delayMs: 2900,
    solicitationId: "sol-004",
    data: { reason: "SEWP V on-vehicle. NAICS 541512 exact match." },
  },
  // Filter pass: sol-005 (DHS device)
  {
    id: "step-6",
    type: "filter-pass",
    delayMs: 3400,
    solicitationId: "sol-005",
    data: { reason: "GSA MAS on-vehicle. NAICS 541512 exact match." },
  },
  // Filter reject: sol-006 (DOT software dev) - wrong NAICS
  {
    id: "step-7",
    type: "filter-reject",
    delayMs: 3900,
    solicitationId: "sol-006",
    data: {
      reason:
        "NAICS 541511 (custom software dev) is outside Meridian's registered NAICS codes. OASIS+ vehicle not held. Double exclusion.",
    },
  },
  // Agency lookups
  {
    id: "step-8",
    type: "agency-lookup",
    delayMs: 5000,
    solicitationId: "sol-001",
    data: AGENCY_HISTORY["VA"],
  },
  {
    id: "step-9",
    type: "agency-lookup",
    delayMs: 5700,
    solicitationId: "sol-002",
    data: AGENCY_HISTORY["EPA"],
  },
  {
    id: "step-10",
    type: "agency-lookup",
    delayMs: 6400,
    solicitationId: "sol-004",
    data: AGENCY_HISTORY["GSA"],
  },
  {
    id: "step-11",
    type: "agency-lookup",
    delayMs: 7100,
    solicitationId: "sol-005",
    data: AGENCY_HISTORY["DHS"],
  },
  // Scores
  {
    id: "step-12",
    type: "score",
    delayMs: 8500,
    solicitationId: "sol-001",
    data: SCORES["sol-001"],
  },
  {
    id: "step-13",
    type: "score",
    delayMs: 9300,
    solicitationId: "sol-002",
    data: SCORES["sol-002"],
  },
  // Flag sol-004 for human review
  {
    id: "step-14",
    type: "flag-review",
    delayMs: 10100,
    solicitationId: "sol-004",
    data: {
      ...SCORES["sol-004"],
      reason:
        "Capability gap detected: SOC bench depth is unconfirmed. Scoring paused. Human review required before advancing.",
    },
  },
  {
    id: "step-15",
    type: "score",
    delayMs: 10900,
    solicitationId: "sol-005",
    data: SCORES["sol-005"],
  },
  // Draft for best match (sol-001, score 91)
  {
    id: "step-16",
    type: "draft",
    delayMs: 12500,
    solicitationId: "sol-001",
    data: {
      summary:
        "Meridian Systems is well-positioned to pursue the VA VISN 5 network refresh. Our active SEWP V contract covers all hardware categories in scope, and we hold documented past performance with the VA from the 2024 VISN 8 Catalyst refresh. Key differentiator: our GSA pricing is currently 11% below the nearest SEWP V competitor on Cisco Catalyst 9000 series. Recommend immediate teaming call with our Cisco rep to confirm stock and delivery lead times before the September 8 deadline.",
    },
  },
  // Human gate
  {
    id: "step-17",
    type: "gate",
    delayMs: 14000,
    solicitationId: "sol-001",
    data: {
      recommendation: "pursue",
      topScore: 91,
      message:
        "Analysis complete. Top recommendation: VA VISN 5 (score 91/100). Capture summary drafted. One opportunity flagged for human review before scoring (GSA SOC). Awaiting your call.",
    },
  },
];
