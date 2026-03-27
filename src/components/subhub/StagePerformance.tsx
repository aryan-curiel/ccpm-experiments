import { type ReactElement } from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'
import { SectionLabel } from '@/components/shared'
import type { StageMetric } from '@/types/subhub'

interface StagePerformanceProps {
  stages: StageMetric[]
}

const BAR_COLOR: Record<StageMetric['status'], string> = {
  breach:     'rose.500',
  nearBreach: 'amber.500',
  onTrack:    'mint.500',
}

function StageRow({ stage }: { stage: StageMetric }): ReactElement {
  const barColor = BAR_COLOR[stage.status]
  const slaLinePct = Math.min(100, (stage.slaDays / Math.max(stage.actualDays, stage.slaDays)) * 100)

  return (
    <Box mb="3">
      <Flex justify="space-between" align="baseline" mb="1">
        <Text fontSize="xs" color="text.secondary" fontFamily="body">
          {stage.name}
        </Text>
        <Flex align="baseline" gap="1.5">
          <Text fontSize="sm" fontWeight="600" color="text.primary" fontFamily="mono">
            {stage.actualDays}d
          </Text>
          <Text fontSize="2xs" color="text.muted" fontFamily="mono">
            / SLA {stage.slaDays}d
          </Text>
        </Flex>
      </Flex>

      {/* Bar track */}
      <Box
        position="relative"
        h="6px"
        bg="surface.3"
        borderRadius="full"
        overflow="hidden"
      >
        {/* Filled bar */}
        <Box
          position="absolute"
          left={0}
          top={0}
          h="100%"
          borderRadius="full"
          bg={barColor}
          style={{ width: `${stage.fillPct}%` }}
        />

        {/* SLA target dashed line */}
        <Box
          position="absolute"
          top={0}
          h="100%"
          w="2px"
          bg="border.2"
          style={{ left: `${slaLinePct}%` }}
        />
      </Box>
    </Box>
  )
}

export function StagePerformance({ stages }: StagePerformanceProps): ReactElement {
  return (
    <Box>
      <Box mb="3">
        <SectionLabel>Stage Performance</SectionLabel>
      </Box>
      {stages.map(stage => (
        <StageRow key={stage.name} stage={stage} />
      ))}
    </Box>
  )
}
