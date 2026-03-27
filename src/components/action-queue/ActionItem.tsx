import React, { type ReactElement } from 'react'
import { Box, Flex, Text, Button } from '@chakra-ui/react'
import type { ActionStatus } from '@/hooks/useActionQueue'
import type { TagVariant } from '@/types/subhub'

const TAG_BG: Record<TagVariant, string> = {
  alert:    'amber.900',
  approval: 'brand.900',
  blocked:  'rose.900',
  rejected: 'surface.3',
}

const TAG_COLOR: Record<TagVariant, string> = {
  alert:    'amber.300',
  approval: 'brand.300',
  blocked:  'rose.500',
  rejected: 'text.muted',
}

export interface ActionItemProps {
  id: string
  tag: string
  tagVariant: TagVariant
  title: string
  description: string
  fixNote?: string
  status: ActionStatus
  rejectedBy?: string
  rejectedAt?: string
  rejectionReason?: string
  onApprove?: (id: string) => void
  onReject?: (id: string) => void
}

export const ActionItem = React.memo(function ActionItem({
  id,
  tag,
  tagVariant,
  title,
  description,
  fixNote,
  status,
  rejectionReason,
  onApprove,
  onReject,
}: ActionItemProps): ReactElement {
  const isPending  = status === 'pending'
  const isApproved = status === 'approved'
  const isRejected = status === 'rejected'
  const isBlocked  = status === 'blocked'

  return (
    <Box
      p="4"
      borderRadius="xl"
      border="1px solid"
      borderColor={isBlocked ? 'rose.900' : 'border.1'}
      borderLeft={isBlocked ? '3px solid' : '1px solid'}
      borderLeftColor={isBlocked ? 'rose.500' : 'border.1'}
      bg="surface.1"
      opacity={isApproved ? 0.6 : 1}
      transition="opacity 0.2s ease"
    >
      {/* Tag pill */}
      <Flex align="center" gap="2" mb="2">
        <Box
          as="span"
          px="1.5"
          py="0.5"
          borderRadius="sm"
          bg={TAG_BG[tagVariant]}
          color={TAG_COLOR[tagVariant]}
          fontFamily="mono"
          fontSize="2xs"
          fontWeight="600"
          letterSpacing="wide"
          textTransform="uppercase"
          lineHeight="1"
        >
          {tag}
        </Box>

        {/* Status chip — shown after action or for blocked/rejected */}
        {isApproved && (
          <Box
            as="span"
            px="1.5"
            py="0.5"
            borderRadius="sm"
            bg="mint.900"
            color="mint.500"
            fontFamily="mono"
            fontSize="2xs"
            fontWeight="600"
            letterSpacing="wide"
            textTransform="uppercase"
            lineHeight="1"
          >
            Approved
          </Box>
        )}
        {isRejected && (
          <Box
            as="span"
            px="1.5"
            py="0.5"
            borderRadius="sm"
            bg="surface.3"
            color="text.muted"
            fontFamily="mono"
            fontSize="2xs"
            fontWeight="600"
            letterSpacing="wide"
            textTransform="uppercase"
            lineHeight="1"
          >
            Rejected
          </Box>
        )}
        {isBlocked && (
          <Box
            as="span"
            px="1.5"
            py="0.5"
            borderRadius="sm"
            bg="rose.900"
            color="rose.500"
            fontFamily="mono"
            fontSize="2xs"
            fontWeight="600"
            letterSpacing="wide"
            textTransform="uppercase"
            lineHeight="1"
          >
            Blocked
          </Box>
        )}
      </Flex>

      {/* Title */}
      <Text
        fontSize="sm"
        fontWeight="600"
        color={isRejected ? 'text.muted' : 'text.primary'}
        fontFamily="body"
        lineHeight="1.4"
        mb="1"
      >
        {title}
      </Text>

      {/* Description */}
      <Text
        fontSize="xs"
        color={isRejected ? 'text.muted' : 'text.secondary'}
        lineHeight="1.6"
        mb={isPending || isBlocked ? '3' : '0'}
      >
        {description}
      </Text>

      {/* Rejection reason */}
      {isRejected && rejectionReason && (
        <Text fontSize="xs" color="text.muted" mt="1">
          Reason: {rejectionReason}
        </Text>
      )}

      {/* Fix note for blocked items */}
      {isBlocked && fixNote && (
        <Flex align="flex-start" gap="1.5" mt="2">
          <Text fontSize="xs" color="rose.500" lineHeight="1.5">
            ⚠ {fixNote}
          </Text>
        </Flex>
      )}

      {/* Approve / Reject buttons for pending items */}
      {isPending && (
        <Flex gap="2">
          <Button
            size="xs"
            bg="mint.900"
            color="mint.500"
            border="1px solid"
            borderColor="mint.500"
            _hover={{ bg: 'mint.500', color: 'white' }}
            fontFamily="mono"
            fontSize="2xs"
            letterSpacing="wide"
            onClick={() => onApprove?.(id)}
          >
            Approve
          </Button>
          <Button
            size="xs"
            bg="rose.900"
            color="rose.500"
            border="1px solid"
            borderColor="rose.500"
            _hover={{ bg: 'rose.500', color: 'white' }}
            fontFamily="mono"
            fontSize="2xs"
            letterSpacing="wide"
            onClick={() => onReject?.(id)}
          >
            Reject
          </Button>
        </Flex>
      )}
    </Box>
  )
})
