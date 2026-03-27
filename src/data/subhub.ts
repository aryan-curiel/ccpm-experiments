import type {
  SubHubStats,
  StageMetric,
  Subcontractor,
  Project,
  ActionQueueResponse,
  ReasoningData,
} from '@/types/subhub'

// ── STATS ─────────────────────────────────────────────────────────────────────

export const STATS: SubHubStats = {
  slaBreached: 4,
  nearBreach: 7,
  activeProjects: 63,
  onTrackRate: 82,
  trends: {
    slaBreached: { direction: 'up', label: '+2 vs last week' },
    nearBreach: { direction: 'up', label: '3 new today' },
    activeProjects: { direction: 'neutral', label: '+4 this month' },
    onTrackRate: { direction: 'down', label: '−4% vs last month' },
  },
}

// ── STAGE METRICS ─────────────────────────────────────────────────────────────
// Source: subhub.html stage-bars section + task spec SLA targets

export const STAGE_METRICS: StageMetric[] = [
  {
    name: 'Permit',
    actualDays: 26.4,
    slaDays: 21,
    fillPct: 78,
    status: 'breach',
  },
  {
    name: 'Installation',
    actualDays: 18.1,
    slaDays: 14,
    fillPct: 55,
    status: 'nearBreach',
  },
  {
    name: 'Inspection',
    actualDays: 8.2,
    slaDays: 10,
    fillPct: 38,
    status: 'onTrack',
  },
  {
    name: 'PTO',
    actualDays: 22.7,
    slaDays: 14,
    fillPct: 65,
    status: 'breach',
  },
  {
    name: 'Payment',
    actualDays: 11.4,
    slaDays: 30,
    fillPct: 22,
    status: 'onTrack',
  },
]

// ── SUBCONTRACTORS ────────────────────────────────────────────────────────────
// Source: subhub.html Subcontractor Scorecard table

export const SUBCONTRACTORS: Subcontractor[] = [
  {
    id: 'suntech',
    name: 'SunTech Partners',
    onTimeRate: 94,
    activeProjects: 12,
    status: 'onTrack',
  },
  {
    id: 'green-valley',
    name: 'Green Valley Solar',
    onTimeRate: 87,
    activeProjects: 9,
    status: 'onTrack',
  },
  {
    id: 'brightfield',
    name: 'Brightfield LLC',
    onTimeRate: 61,
    activeProjects: 7,
    status: 'breach',
  },
  {
    id: 'peaksun',
    name: 'PeakSun Install',
    onTimeRate: 76,
    activeProjects: 8,
    status: 'atRisk',
  },
]

// ── PRIORITY PROJECTS ─────────────────────────────────────────────────────────
// Source: subhub.html Priority Projects sidebar (~lines 870–927)

export const PRIORITY_PROJECTS: Project[] = [
  {
    id: 'PROJ-0241',
    name: 'Rivera Residence',
    clientName: 'Rivera',
    stage: 'Permit → Install',
    currentDay: 34,
    slaDays: 21,
    subcontractor: 'Brightfield',
    contractValue: '$42K',
    riskStatus: 'breach',
    healthPct: 12,
  },
  {
    id: 'PROJ-0188',
    name: 'Mendez Commercial',
    clientName: 'Mendez',
    stage: 'Installation',
    currentDay: 47,
    slaDays: 30,
    subcontractor: 'PeakSun',
    contractValue: '$118K',
    riskStatus: 'breach',
    healthPct: 8,
  },
  {
    id: 'PROJ-0251',
    name: 'Clearwater HOA',
    clientName: 'Clearwater',
    stage: 'PTO',
    currentDay: 18,
    slaDays: 14,
    subcontractor: 'SunTech',
    contractValue: '$24K blocked',
    riskStatus: 'atRisk',
    healthPct: 35,
  },
  {
    id: 'PROJ-0213',
    name: 'Barnes Estate',
    clientName: 'Barnes',
    stage: 'Permit',
    currentDay: 17,
    slaDays: 21,
    subcontractor: 'Green Valley',
    contractValue: '$67K',
    riskStatus: 'near',
    healthPct: 44,
  },
  {
    id: 'PROJ-0227',
    name: 'Torres Warehouse',
    clientName: 'Torres',
    stage: 'Installation',
    currentDay: 22,
    slaDays: 30,
    subcontractor: 'SunTech',
    contractValue: '$89K',
    riskStatus: 'near',
    healthPct: 68,
  },
  {
    id: 'PROJ-0233',
    name: 'Linwood Apartments',
    clientName: 'Linwood',
    stage: 'PTO',
    currentDay: 8,
    slaDays: 14,
    subcontractor: 'Green Valley',
    contractValue: '$56K',
    riskStatus: 'near',
    healthPct: 88,
  },
]

// ── ACTION QUEUE ──────────────────────────────────────────────────────────────
// Source: subhub.html action queue section (~lines 780–965)

export const ACTION_QUEUE: ActionQueueResponse = {
  pending: [
    {
      id: 'sh-appr-1',
      tag: 'NEEDS APPROVAL · EMAIL',
      tagVariant: 'approval',
      title: 'Escalate PROJ-0188 to Regional Director — 47 days in Installation',
      description:
        'SLA breach (was 30d). Root cause: inspection rescheduled twice. Draft escalation email to R. Martinez prepared.',
      status: 'pending',
    },
    {
      id: 'sh-appr-2',
      tag: 'NEEDS APPROVAL · UPDATE',
      tagVariant: 'approval',
      title: 'Flag PROJ-0251 M2 milestone at risk — PTO blocked, $24K delayed',
      description:
        'Utility confirmation missing 18 days. 20% funding release gated on this. Recommend flagging in system + notifying finance.',
      status: 'pending',
    },
    {
      id: 'sh-appr-3',
      tag: 'NEEDS APPROVAL · REASSIGN',
      tagVariant: 'approval',
      title: 'Reassign PROJ-0204 from Brightfield LLC to SunTech Partners',
      description:
        'Brightfield has 4 simultaneous delays. SunTech has confirmed capacity (94% on-time, 12 active projects).',
      status: 'pending',
    },
  ],
  pendingMore: [
    {
      id: 'sh-appr-4',
      tag: 'NEEDS APPROVAL · REPORT',
      tagVariant: 'approval',
      title: 'Generate weekly SLA summary report for client portfolio review',
      description:
        '15 projects require PM narrative update before Friday board meeting. AI-drafted summaries ready for each, pending approval to publish.',
      status: 'pending',
    },
    {
      id: 'sh-appr-5',
      tag: 'NEEDS APPROVAL · UPDATE',
      tagVariant: 'approval',
      title: 'Mark PROJ-0199 milestone complete — Installation sign-off received',
      description:
        'Physical sign-off document uploaded by field team. System has not been updated. Approving will trigger M1 payment request ($34,000).',
      status: 'pending',
    },
  ],
  blocked: [
    {
      id: 'sh-block-1',
      tag: 'BLOCKED · MISSING DATA',
      tagVariant: 'blocked',
      title: 'Cannot forecast M1 payment date for PROJ-0266',
      description:
        'Contract funding split not recorded. Unable to compute inflow date or risk score.',
      fixNote: 'Fix: Add contract terms → SubcontractorHub → PROJ-0266 → Financials',
      status: 'blocked',
    },
    {
      id: 'sh-block-2',
      tag: 'BLOCKED · PERMISSION',
      tagVariant: 'blocked',
      title: 'Cannot update stage for PROJ-0199 — read-only integration',
      description: 'MIL has no write access to SubcontractorHub for this tenant.',
      fixNote: 'Fix: Enable write permissions → SubcontractorHub → Integrations → MIL',
      status: 'blocked',
    },
  ],
  rejected: [
    {
      id: 'sh-rej-1',
      tag: 'REJECTED',
      tagVariant: 'rejected',
      title: 'Send cancellation risk notice to client — PROJ-0177',
      description: 'AI flagged high cancellation risk (74% confidence). PM rejected.',
      status: 'rejected',
      rejectedBy: 'J. Wilkins',
      rejectedAt: 'Mar 17',
      rejectionReason: 'Client in active negotiation — premature',
    },
  ],
  rejectedMore: [
    {
      id: 'sh-rej-2',
      tag: 'REJECTED',
      tagVariant: 'rejected',
      title: 'Pause new project intake for Brightfield LLC until performance review',
      description:
        'AI flagged Brightfield as systemic risk (61% on-time, 4 active delays).',
      status: 'rejected',
      rejectedBy: 'R. Martinez',
      rejectedAt: 'Mar 10',
      rejectionReason: 'Contractual obligation to continue — reviewing internally',
    },
  ],
}

// ── REASONING DATA ────────────────────────────────────────────────────────────
// Source: old/index.html — STREAM_LINES[], TASKS[], FINDINGS[] arrays

export const REASONING_DATA: ReasoningData = {
  streamLines: [
    {
      text: 'Loading tenant context... workspace: expansionjs · role: PM',
      type: 'hdr',
      icon: '⬡',
      delayMs: 0,
    },
    {
      text: 'ok, pulling SubcontractorHub, Jira, and B2B order sources simultaneously...',
      type: 'thought',
      icon: '·',
      delayMs: 500,
    },
    {
      text: 'SubcontractorHub API: 63 active projects ingested · last sync 2m ago',
      type: 'found',
      icon: '→',
      delayMs: 1000,
    },
    {
      text: 'Jira REST API: Sprint 24 · 34 open issues · 5 stale PRs detected',
      type: 'found',
      icon: '→',
      delayMs: 1500,
    },
    {
      text: 'OMS connector: 148 active orders · $2.3M total value in pipeline',
      type: 'found',
      icon: '→',
      delayMs: 2000,
    },
    {
      text: 'hmm, the permit stage numbers are higher than last scan... let me check baseline',
      type: 'thought',
      icon: '·',
      delayMs: 2500,
    },
    {
      text: 'Permit avg 26.4d — exceeds 21d SLA target · 3 projects share same inspector pattern',
      type: 'alert',
      icon: '⚠',
      delayMs: 3000,
    },
    {
      text: 'this feels systemic, not isolated — cross-referencing contractor assignments...',
      type: 'thought',
      icon: '·',
      delayMs: 3500,
    },
    {
      text: 'Brightfield LLC: 61% on-time · 4 concurrent delays · confidence 91% — systemic flag',
      type: 'bad',
      icon: '✗',
      delayMs: 4000,
    },
    {
      text: 'SunTech Partners: 94% on-time · PTO stage 40% faster than baseline — routing candidate',
      type: 'good',
      icon: '✓',
      delayMs: 4500,
    },
    {
      text: 'sprint 24 velocity drop... 34 vs 42 committed. checking stage distribution...',
      type: 'thought',
      icon: '·',
      delayMs: 5000,
    },
    {
      text: 'Review stage: 4.8d avg — 2.3× above 2.0d target · #1 sprint bottleneck confirmed',
      type: 'alert',
      icon: '⚠',
      delayMs: 5500,
    },
    {
      text: 'J. Kim: 2 tasks blocked by INFRA-88 · escalation path identified',
      type: 'found',
      icon: '→',
      delayMs: 6000,
    },
    {
      text: "the carry-over rate has been climbing 3 sprints in a row, that's a pattern worth flagging...",
      type: 'thought',
      icon: '·',
      delayMs: 6500,
    },
    {
      text: 'Carry-over: S22 14% → S23 22% → S24 forecast 31% · scope creep primary driver',
      type: 'bad',
      icon: '✗',
      delayMs: 7000,
    },
    {
      text: 'B2B: Sino-Tech delays cluster weeks 2–3 monthly · likely internal capacity, not logistics',
      type: 'found',
      icon: '→',
      delayMs: 7500,
    },
    {
      text: '$18.4K penalty exposure if 6 breached orders unresolved by Mar 31',
      type: 'alert',
      icon: '⚠',
      delayMs: 8000,
    },
    {
      text: 'generating action recommendations... auto-classify by confidence and reversibility...',
      type: 'thought',
      icon: '·',
      delayMs: 8500,
    },
    {
      text: '37 total actions generated · 6 auto-dispatched · 18 queued for approval · 4 blocked',
      type: 'good',
      icon: '✓',
      delayMs: 9000,
    },
    {
      text: 'audit log updated · session_id: ses_2c4f9a · render ready',
      type: 'dim',
      icon: '·',
      delayMs: 9500,
    },
  ],
  tasks: [
    {
      label: 'Connect to data sources (SubHub · Jira · OMS)',
      displayValue: '',
      totalTimeMs: 1600,
    },
    {
      label: 'Ingest & normalize entity models',
      displayValue: '',
      totalTimeMs: 1600,
    },
    {
      label: 'SLA breach detection across all scenarios',
      displayValue: '',
      totalTimeMs: 2600,
    },
    {
      label: 'Outlier & anomaly analysis',
      displayValue: '',
      totalTimeMs: 1800,
    },
    {
      label: 'Cross-entity correlation scan',
      displayValue: '',
      totalTimeMs: 1800,
    },
    {
      label: 'Performance scorecard generation',
      displayValue: '',
      totalTimeMs: 2200,
    },
    {
      label: 'Action classification & confidence scoring',
      displayValue: '',
      totalTimeMs: 2200,
    },
    {
      label: 'Auto-dispatch approved actions',
      displayValue: '',
      totalTimeMs: 2200,
    },
  ],
  findings: [
    { text: '4 SLA breaches — SubHub', type: 'critical', icon: '🔴', delayMs: 0 },
    { text: 'Brightfield systemic risk', type: 'critical', icon: '🔴', delayMs: 500 },
    { text: 'Sprint 24 at risk (43%)', type: 'warning', icon: '🟡', delayMs: 1000 },
    { text: '$18.4K penalty exposure', type: 'warning', icon: '🟡', delayMs: 1500 },
    { text: 'Review bottleneck 2.3×', type: 'warning', icon: '🟡', delayMs: 2000 },
    { text: 'SunTech top performer', type: 'positive', icon: '🟢', delayMs: 2500 },
    { text: '37 actions generated', type: 'info', icon: '🔵', delayMs: 3000 },
  ],
}
