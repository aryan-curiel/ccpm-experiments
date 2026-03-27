import { type ReactElement } from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'
import { Badge, SectionLabel } from '@/components/shared'
import type { BadgeVariant } from '@/components/shared'
import type { Subcontractor } from '@/types/subhub'

interface SubcontractorLeagueProps {
  contractors: Subcontractor[]
}

const ROW_TINT: Record<Subcontractor['status'], string> = {
  breach:  'rose.900',
  atRisk:  'amber.900',
  onTrack: 'transparent',
}

const BADGE_VARIANT: Record<Subcontractor['status'], BadgeVariant> = {
  breach:  'breach',
  atRisk:  'nearBreach',
  onTrack: 'onTrack',
}

function ContractorRow({ contractor, rank }: { contractor: Subcontractor; rank: number }): ReactElement {
  return (
    <Flex
      align="center"
      gap="3"
      px="3"
      py="2.5"
      borderRadius="lg"
      bg={ROW_TINT[contractor.status]}
      mb="1"
      _hover={{ bg: 'surface.2' }}
      cursor="default"
      transition="background 0.15s ease"
    >
      {/* Rank */}
      <Text
        fontFamily="mono"
        fontSize="2xs"
        color="text.muted"
        w="4"
        textAlign="right"
        flexShrink={0}
      >
        {rank}
      </Text>

      {/* Name */}
      <Text fontSize="sm" color="text.primary" fontFamily="body" flex={1} minW={0} truncate>
        {contractor.name}
      </Text>

      {/* On-time rate */}
      <Text fontFamily="mono" fontSize="sm" fontWeight="600" color="text.primary" flexShrink={0}>
        {contractor.onTimeRate}%
      </Text>

      {/* Active projects */}
      <Text fontFamily="mono" fontSize="xs" color="text.secondary" w="8" textAlign="center" flexShrink={0}>
        {contractor.activeProjects}
      </Text>

      {/* Status badge */}
      <Box flexShrink={0}>
        <Badge variant={BADGE_VARIANT[contractor.status]} label={contractor.status === 'atRisk' ? 'At Risk' : contractor.status === 'breach' ? 'Breach' : 'On Track'} />
      </Box>
    </Flex>
  )
}

export function SubcontractorLeague({ contractors }: SubcontractorLeagueProps): ReactElement {
  return (
    <Box>
      <Box mb="3">
        <SectionLabel>Subcontractor Performance</SectionLabel>
      </Box>

      {/* Column headers */}
      <Flex align="center" gap="3" px="3" mb="1">
        <Box w="4" />
        <Text fontSize="2xs" color="text.muted" fontFamily="mono" flex={1}>Name</Text>
        <Text fontSize="2xs" color="text.muted" fontFamily="mono" flexShrink={0}>On-Time</Text>
        <Text fontSize="2xs" color="text.muted" fontFamily="mono" w="8" textAlign="center" flexShrink={0}>Active</Text>
        <Text fontSize="2xs" color="text.muted" fontFamily="mono" flexShrink={0}>Status</Text>
      </Flex>

      {contractors.map((contractor, index) => (
        <ContractorRow key={contractor.id} contractor={contractor} rank={index + 1} />
      ))}
    </Box>
  )
}
