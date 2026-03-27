import { useState, useEffect, type ReactElement } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { getActionQueue, getActionQueueMore } from '@/api'
import { useActionQueue } from '@/hooks/useActionQueue'
import { ActionItem } from './ActionItem'
import { SectionDivider } from './SectionDivider'
import { LoadMoreButton } from './LoadMoreButton'
import type { ActionItem as ActionItemType } from '@/types/subhub'

export function ActionQueue(): ReactElement {
  const [pending, setPending] = useState<ActionItemType[]>([])
  const [blocked, setBlocked] = useState<ActionItemType[]>([])
  const [rejected, setRejected] = useState<ActionItemType[]>([])

  // Extra items loaded via load-more
  const [morePending, setMorePending]   = useState<ActionItemType[]>([])
  const [moreRejected, setMoreRejected] = useState<ActionItemType[]>([])

  // Load-more UI state
  const [pendingLoading, setPendingLoading]   = useState(false)
  const [rejectedLoading, setRejectedLoading] = useState(false)
  const [pendingExhausted, setPendingExhausted]   = useState(false)
  const [rejectedExhausted, setRejectedExhausted] = useState(false)

  const { statuses, approve, reject, seed } = useActionQueue()

  useEffect(() => {
    getActionQueue().then(data => {
      setPending(data.pending)
      setBlocked(data.blocked)
      setRejected(data.rejected)
      // Seed reducer with all initial items
      seed([...data.pending, ...data.blocked, ...data.rejected])
      // Track whether load-more items exist
      if (data.pendingMore.length === 0)  setPendingExhausted(true)
      if (data.rejectedMore.length === 0) setRejectedExhausted(true)
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function handleLoadMorePending(): void {
    setPendingLoading(true)
    setTimeout(() => {
      getActionQueueMore('pending', 1).then(items => {
        setMorePending(prev => [...prev, ...items])
        seed(items)
        setPendingExhausted(true)
        setPendingLoading(false)
      })
    }, 150)
  }

  function handleLoadMoreRejected(): void {
    setRejectedLoading(true)
    setTimeout(() => {
      getActionQueueMore('rejected', 1).then(items => {
        setMoreRejected(prev => [...prev, ...items])
        seed(items)
        setRejectedExhausted(true)
        setRejectedLoading(false)
      })
    }, 150)
  }

  const allPending  = [...pending, ...morePending]
  const allRejected = [...rejected, ...moreRejected]

  // Live pending count: items not yet actioned
  const pendingCount = allPending.filter(
    item => (statuses[item.id] ?? item.status) === 'pending'
  ).length

  return (
    <Flex direction="column" gap="2">
      {/* ── Needs Approval ──────────────────────────────── */}
      <SectionDivider
        label="Needs Approval"
        count={pendingCount}
        colorScheme="amber"
      />

      {allPending.map(item => (
        <ActionItem
          key={item.id}
          id={item.id}
          tag={item.tag}
          tagVariant={item.tagVariant}
          title={item.title}
          description={item.description}
          status={statuses[item.id] ?? item.status}
          onApprove={approve}
          onReject={reject}
        />
      ))}

      <LoadMoreButton
        remaining={pendingExhausted ? 0 : 2}
        onLoad={handleLoadMorePending}
        isLoading={pendingLoading}
        label="approvals"
      />

      {/* ── Cannot Execute (Blocked) ─────────────────────── */}
      {blocked.length > 0 && (
        <>
          <Box mt="2" />
          <SectionDivider
            label="Cannot Execute"
            count={blocked.length}
            colorScheme="rose"
          />
          {blocked.map(item => (
            <ActionItem
              key={item.id}
              id={item.id}
              tag={item.tag}
              tagVariant={item.tagVariant}
              title={item.title}
              description={item.description}
              fixNote={item.fixNote}
              status={item.status}
            />
          ))}
        </>
      )}

      {/* ── Recently Rejected ───────────────────────────── */}
      {allRejected.length > 0 && (
        <>
          <Box mt="2" />
          <SectionDivider
            label="Recently Rejected"
            count={allRejected.length}
            colorScheme="muted"
          />
          {allRejected.map(item => (
            <ActionItem
              key={item.id}
              id={item.id}
              tag={item.tag}
              tagVariant={item.tagVariant}
              title={item.title}
              description={item.description}
              rejectedBy={item.rejectedBy}
              rejectedAt={item.rejectedAt}
              rejectionReason={item.rejectionReason}
              status={item.status}
            />
          ))}

          <LoadMoreButton
            remaining={rejectedExhausted ? 0 : 1}
            onLoad={handleLoadMoreRejected}
            isLoading={rejectedLoading}
            label="rejections"
          />
        </>
      )}
    </Flex>
  )
}
