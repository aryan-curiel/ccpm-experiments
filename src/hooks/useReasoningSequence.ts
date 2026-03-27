import { useRef, useState, useEffect, useCallback } from 'react'
import { STREAM_LINES, TASK_SCHEDULE, FINDINGS } from '@/data/reasoning'
import type { TaskScheduleEntry } from '@/data/reasoning'

export type TaskStatus = 'pending' | 'running' | 'done'

export interface TaskState {
  id: string
  label: string
  status: TaskStatus
}

interface UseReasoningSequenceOptions {
  onComplete: () => void
}

interface UseReasoningSequenceReturn {
  visibleLines: number
  tasks: TaskState[]
  visibleFindings: number
  progress: number
  isComplete: boolean
  restart: () => void
}

const TOTAL_DURATION_MS = 14_000
const PROGRESS_TICK_MS = 50
const PROGRESS_INCREMENT = 100 / (TOTAL_DURATION_MS / PROGRESS_TICK_MS) // ~0.36 per tick
const LINE_INTERVAL_MS = 500
const FINDING_START_MS = 4_000
const FINDING_INTERVAL_MS = 2_000

function buildInitialTasks(schedule: TaskScheduleEntry[]): TaskState[] {
  return schedule.map(entry => ({ id: entry.id, label: entry.label, status: 'pending' }))
}

export function useReasoningSequence({ onComplete }: UseReasoningSequenceOptions): UseReasoningSequenceReturn {
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([])

  const [visibleLines, setVisibleLines] = useState(0)
  const [tasks, setTasks] = useState<TaskState[]>(() => buildInitialTasks(TASK_SCHEDULE))
  const [visibleFindings, setVisibleFindings] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const onCompleteRef = useRef(onComplete)
  useEffect(() => { onCompleteRef.current = onComplete }, [onComplete])

  const rt = useCallback((fn: () => void, delay: number) => {
    timeouts.current.push(setTimeout(fn, delay))
  }, [])

  const clearAll = useCallback(() => {
    timeouts.current.forEach(clearTimeout)
    timeouts.current = []
  }, [])

  const runSequence = useCallback(() => {
    // Stream lines — one every LINE_INTERVAL_MS
    const lineCount = STREAM_LINES.length
    for (let i = 0; i < lineCount; i++) {
      rt(() => setVisibleLines(i + 1), LINE_INTERVAL_MS * (i + 1))
    }

    // Task state transitions driven by TASK_SCHEDULE
    for (const entry of TASK_SCHEDULE) {
      rt(() => {
        setTasks(prev =>
          prev.map(t => t.id === entry.id ? { ...t, status: 'running' } : t)
        )
      }, entry.startOffset)
      rt(() => {
        setTasks(prev =>
          prev.map(t => t.id === entry.id ? { ...t, status: 'done' } : t)
        )
      }, entry.endOffset)
    }

    // Findings — revealed one every FINDING_INTERVAL_MS starting at FINDING_START_MS
    const findingCount = FINDINGS.length
    for (let i = 0; i < findingCount; i++) {
      rt(() => setVisibleFindings(i + 1), FINDING_START_MS + FINDING_INTERVAL_MS * i)
    }

    // Progress — tick every PROGRESS_TICK_MS for TOTAL_DURATION_MS
    const totalTicks = Math.floor(TOTAL_DURATION_MS / PROGRESS_TICK_MS)
    for (let tick = 1; tick <= totalTicks; tick++) {
      rt(() => {
        setProgress(prev => Math.min(100, prev + PROGRESS_INCREMENT))
      }, tick * PROGRESS_TICK_MS)
    }

    // Completion
    rt(() => {
      setProgress(100)
      setIsComplete(true)
      onCompleteRef.current()
    }, TOTAL_DURATION_MS)
  }, [rt])

  const restart = useCallback(() => {
    clearAll()
    setVisibleLines(0)
    setTasks(buildInitialTasks(TASK_SCHEDULE))
    setVisibleFindings(0)
    setProgress(0)
    setIsComplete(false)
    runSequence()
  }, [clearAll, runSequence])

  useEffect(() => {
    runSequence()
    return clearAll
  }, [runSequence, clearAll])

  return { visibleLines, tasks, visibleFindings, progress, isComplete, restart }
}
