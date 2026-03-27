import type { StreamLineType, FindingType } from '@/types/subhub'

export interface StreamLineEntry {
  text: string
  type: StreamLineType
}

export interface TaskScheduleEntry {
  id: string
  label: string
  startOffset: number  // ms when task transitions pending → running
  endOffset: number    // ms when task transitions running → done
}

export interface FindingEntry {
  id: string
  severity: FindingType
  text: string
}

// ── STREAM LOG LINES ──────────────────────────────────────────────────────────
// Ported from PoC STREAM_LINES array (index.html)

export const STREAM_LINES: StreamLineEntry[] = [
  { type: 'hdr',     text: 'Loading tenant context... workspace: expansionjs · role: PM' },
  { type: 'thought', text: 'ok, pulling SubcontractorHub, Jira, and B2B order sources simultaneously...' },
  { type: 'found',   text: 'SubcontractorHub API: 63 active projects ingested · last sync 2m ago' },
  { type: 'found',   text: 'Jira REST API: Sprint 24 · 34 open issues · 5 stale PRs detected' },
  { type: 'found',   text: 'OMS connector: 148 active orders · $2.3M total value in pipeline' },
  { type: 'thought', text: 'hmm, the permit stage numbers are higher than last scan... let me check baseline' },
  { type: 'alert',   text: 'Permit avg 26.4d — exceeds 21d SLA target · 3 projects share same inspector pattern' },
  { type: 'thought', text: 'this feels systemic, not isolated — cross-referencing contractor assignments...' },
  { type: 'bad',     text: 'Brightfield LLC: 61% on-time · 4 concurrent delays · confidence 91% — systemic flag' },
  { type: 'good',    text: 'SunTech Partners: 94% on-time · PTO stage 40% faster than baseline — routing candidate' },
  { type: 'thought', text: 'sprint 24 velocity drop... 34 vs 42 committed. checking stage distribution...' },
  { type: 'alert',   text: 'Review stage: 4.8d avg — 2.3× above 2.0d target · #1 sprint bottleneck confirmed' },
  { type: 'found',   text: 'J. Kim: 2 tasks blocked by INFRA-88 · escalation path identified' },
  { type: 'thought', text: "the carry-over rate has been climbing 3 sprints in a row, that's a pattern worth flagging..." },
  { type: 'bad',     text: 'Carry-over: S22 14% → S23 22% → S24 forecast 31% · scope creep primary driver' },
  { type: 'found',   text: 'B2B: Sino-Tech delays cluster weeks 2–3 monthly · likely internal capacity, not logistics' },
  { type: 'alert',   text: '$18.4K penalty exposure if 6 breached orders unresolved by Mar 31' },
  { type: 'thought', text: 'generating action recommendations... auto-classify by confidence and reversibility...' },
  { type: 'good',    text: '37 total actions generated · 6 auto-dispatched · 18 queued for approval · 4 blocked' },
  { type: 'dim',     text: 'audit log updated · session_id: ses_2c4f9a · render ready' },
]

// ── TASK SCHEDULE ─────────────────────────────────────────────────────────────
// Ported from PoC TASKS + TASK_SCHEDULE arrays

export const TASK_SCHEDULE: TaskScheduleEntry[] = [
  { id: 't1', label: 'Connect to data sources (SubHub · Jira · OMS)', startOffset: 200,  endOffset: 1800  },
  { id: 't2', label: 'Ingest & normalize entity models',               startOffset: 1600, endOffset: 3200  },
  { id: 't3', label: 'SLA breach detection across all scenarios',      startOffset: 2800, endOffset: 5400  },
  { id: 't4', label: 'Outlier & anomaly analysis',                     startOffset: 4200, endOffset: 7000  },
  { id: 't5', label: 'Cross-entity correlation scan',                  startOffset: 6000, endOffset: 8800  },
  { id: 't6', label: 'Performance scorecard generation',               startOffset: 8000, endOffset: 10200 },
  { id: 't7', label: 'Action classification & confidence scoring',     startOffset: 9600, endOffset: 11800 },
  { id: 't8', label: 'Auto-dispatch approved actions',                 startOffset: 11200,endOffset: 13400 },
]

// ── FINDINGS ──────────────────────────────────────────────────────────────────
// Ported from PoC FINDINGS array

export const FINDINGS: FindingEntry[] = [
  { id: 'f1', severity: 'critical', text: '4 SLA breaches — SubHub' },
  { id: 'f2', severity: 'critical', text: 'Brightfield systemic risk' },
  { id: 'f3', severity: 'warning',  text: 'Sprint 24 at risk (43%)' },
  { id: 'f4', severity: 'warning',  text: '$18.4K penalty exposure' },
  { id: 'f5', severity: 'warning',  text: 'Review bottleneck 2.3×' },
  { id: 'f6', severity: 'positive', text: 'SunTech top performer' },
  { id: 'f7', severity: 'info',     text: '37 actions generated' },
]

// ── PROGRESS LABELS ───────────────────────────────────────────────────────────

export const PROGRESS_LABELS: string[] = [
  'Connecting to data sources...',
  'Ingesting 63 projects...',
  'Running SLA analysis...',
  'Detecting anomalies...',
  'Correlating patterns...',
  'Generating scorecards...',
  'Classifying actions...',
  'Finalizing recommendations...',
  'Analysis complete ✓',
]
