import { useReducer, useCallback } from 'react'

export type ActionStatus = 'pending' | 'approved' | 'rejected' | 'blocked'

export interface ActionQueueItem {
  id: string
  status: ActionStatus
}

type State = Record<string, ActionStatus>

type ReducerAction =
  | { type: 'APPROVE'; id: string }
  | { type: 'REJECT'; id: string }
  | { type: 'SEED'; items: ActionQueueItem[] }

function reducer(state: State, action: ReducerAction): State {
  switch (action.type) {
    case 'APPROVE':
      return { ...state, [action.id]: 'approved' }
    case 'REJECT':
      return { ...state, [action.id]: 'rejected' }
    case 'SEED': {
      const seeded: State = {}
      for (const item of action.items) {
        // Only seed IDs not already in state (preserves optimistic updates)
        seeded[item.id] = state[item.id] ?? item.status
      }
      return seeded
    }
    default:
      return state
  }
}

interface UseActionQueueReturn {
  statuses: State
  approve: (id: string) => void
  reject: (id: string) => void
  seed: (items: ActionQueueItem[]) => void
}

export function useActionQueue(initialItems: ActionQueueItem[] = []): UseActionQueueReturn {
  const initialState: State = Object.fromEntries(
    initialItems.map(item => [item.id, item.status])
  )

  const [statuses, dispatch] = useReducer(reducer, initialState)

  const approve = useCallback((id: string): void => {
    dispatch({ type: 'APPROVE', id })
  }, [])

  const reject = useCallback((id: string): void => {
    dispatch({ type: 'REJECT', id })
  }, [])

  const seed = useCallback((items: ActionQueueItem[]): void => {
    dispatch({ type: 'SEED', items })
  }, [])

  return { statuses, approve, reject, seed }
}
