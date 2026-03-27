export interface TrendNote {
  direction: 'up' | 'down' | 'neutral'
  label: string
}

export interface SubHubStats {
  slaBreached: number
  nearBreach: number
  activeProjects: number
  onTrackRate: number        // percentage 0–100
  trends: {
    slaBreached: TrendNote
    nearBreach: TrendNote
    activeProjects: TrendNote
    onTrackRate: TrendNote
  }
}

export interface StageMetric {
  name: string
  actualDays: number
  slaDays: number
  fillPct: number            // pre-computed 0–100 for bar chart width
  status: 'breach' | 'nearBreach' | 'onTrack'
}

export interface Subcontractor {
  id: string
  name: string
  onTimeRate: number         // percentage 0–100
  activeProjects: number
  status: 'onTrack' | 'atRisk' | 'breach'
}

export interface Project {
  id: string
  name: string
  clientName: string
  stage: string
  currentDay: number
  slaDays: number
  subcontractor: string
  contractValue: string      // formatted string e.g. "$42K"
  riskStatus: 'breach' | 'atRisk' | 'near'
  healthPct: number          // 0–100, remaining SLA percentage
}

export type TagVariant = 'alert' | 'approval' | 'blocked' | 'rejected'

export interface ActionItem {
  id: string
  tag: string                // display text e.g. "NEEDS APPROVAL · ALERT"
  tagVariant: TagVariant
  title: string
  description: string
  fixNote?: string           // only for blocked items
  status: 'pending' | 'approved' | 'rejected' | 'blocked'
  rejectedBy?: string
  rejectedAt?: string
  rejectionReason?: string
}

export interface ActionQueueResponse {
  pending: ActionItem[]
  pendingMore: ActionItem[]
  blocked: ActionItem[]
  rejected: ActionItem[]
  rejectedMore: ActionItem[]
}

export type StreamLineType = 'thought' | 'found' | 'alert' | 'good' | 'bad' | 'hdr' | 'dim'

export interface StreamLine {
  text: string
  type: StreamLineType
  icon: string
  delayMs: number
}

export interface ReasoningTask {
  label: string
  displayValue: string
  totalTimeMs: number
}

export type FindingType = 'critical' | 'warning' | 'positive' | 'info'

export interface Finding {
  text: string
  type: FindingType
  icon: string
  delayMs: number
}

export interface ReasoningData {
  streamLines: StreamLine[]
  tasks: ReasoningTask[]
  findings: Finding[]
}
