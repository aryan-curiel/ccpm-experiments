import type { StreamLine, ReasoningTask, Finding } from '@/types/subhub'

// Stub — will be populated in Issue #34 (Wire sequence and data)
export const STREAM_LINES: StreamLine[] = []

export const TASKS: ReasoningTask[] = []

export interface TaskScheduleEntry {
  id: string
  label: string
  startOffset: number  // ms when task transitions pending → running
  endOffset: number    // ms when task transitions running → done
}

export const TASK_SCHEDULE: TaskScheduleEntry[] = []

export const FINDINGS: Finding[] = []
