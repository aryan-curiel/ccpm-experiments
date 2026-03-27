import { type ReactElement } from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'

type StatColor = 'rose' | 'amber' | 'sky' | 'mint'

interface StatCardProps {
  label: string
  value: string | number
  note: string
  trend: 'up' | 'down' | 'neutral'
  color: StatColor
}

const BORDER_TOKENS: Record<StatColor, string> = {
  rose:  'rose.500',
  amber: 'amber.500',
  sky:   'sky.500',
  mint:  'mint.500',
}

const BG_TOKENS: Record<StatColor, string> = {
  rose:  'rose.900',
  amber: 'amber.900',
  sky:   'sky.900',
  mint:  'mint.900',
}

const TREND_SYMBOL: Record<StatCardProps['trend'], string> = {
  up:      '↑',
  down:    '↓',
  neutral: '→',
}

const TREND_COLOR: Record<StatCardProps['trend'], string> = {
  up:      'rose.500',
  down:    'mint.500',
  neutral: 'text.muted',
}

export function StatCard({ label, value, note, trend, color }: StatCardProps): ReactElement {
  return (
    <Box
      borderRadius="xl"
      borderTop="3px solid"
      borderColor={BORDER_TOKENS[color]}
      bg={BG_TOKENS[color]}
      border="1px solid"
      borderLeftColor="border.1"
      borderRightColor="border.1"
      borderBottomColor="border.1"
      p="4"
      minW={0}
    >
      <Text
        fontFamily="mono"
        fontSize="2xs"
        color="text.muted"
        letterSpacing="widest"
        textTransform="uppercase"
        mb="2"
      >
        {label}
      </Text>

      <Flex align="baseline" gap="2" mb="1">
        <Text
          fontFamily="heading"
          fontSize="3xl"
          fontWeight="700"
          color="text.primary"
          lineHeight="1"
        >
          {value}
        </Text>
        <Text
          as="span"
          fontSize="lg"
          fontWeight="600"
          color={TREND_COLOR[trend]}
          lineHeight="1"
        >
          {TREND_SYMBOL[trend]}
        </Text>
      </Flex>

      <Text fontSize="xs" color="text.secondary">
        {note}
      </Text>
    </Box>
  )
}
