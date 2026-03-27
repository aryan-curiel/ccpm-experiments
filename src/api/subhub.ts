// src/api/subhub.ts
import type {
  SubHubStats, StageMetric, Subcontractor,
  Project, ActionQueueResponse, ActionItem, ReasoningData
} from '@/types/subhub'
import {
  STATS, STAGE_METRICS, SUBCONTRACTORS,
  PRIORITY_PROJECTS, ACTION_QUEUE, REASONING_DATA
} from '@/data/subhub'
import { mockDelay } from './utils'

/** Real: GET /api/v1/stats */
export async function getStats(): Promise<SubHubStats> {
  await mockDelay()
  return STATS
}

/** Real: GET /api/v1/stages/metrics */
export async function getStageMetrics(): Promise<StageMetric[]> {
  await mockDelay()
  return STAGE_METRICS
}

/** Real: GET /api/v1/subcontractors */
export async function getSubcontractors(): Promise<Subcontractor[]> {
  await mockDelay()
  return SUBCONTRACTORS
}

/** Real: GET /api/v1/projects?sort=risk&limit=8 */
export async function getPriorityProjects(): Promise<Project[]> {
  await mockDelay()
  return PRIORITY_PROJECTS
}

/** Real: GET /api/v1/actions?status=pending,blocked,rejected */
export async function getActionQueue(): Promise<ActionQueueResponse> {
  await mockDelay()
  return ACTION_QUEUE
}

/** Real: GET /api/v1/actions?section=<section>&page=<page> */
export async function getActionQueueMore(
  section: 'pending' | 'rejected',
  _page: number
): Promise<ActionItem[]> {
  await mockDelay()
  return section === 'pending'
    ? ACTION_QUEUE.pendingMore
    : ACTION_QUEUE.rejectedMore
}

/** Internal — no real API equivalent in v1 */
export async function getReasoningData(): Promise<ReasoningData> {
  await mockDelay(0) // reasoning data loads instantly — no latency simulation
  return REASONING_DATA
}
