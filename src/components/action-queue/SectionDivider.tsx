import { type ReactElement } from 'react'
import { Flex, Box, Text } from '@chakra-ui/react'

type ColorScheme = 'amber' | 'brand' | 'rose' | 'muted'

interface SectionDividerProps {
  label: string
  count: number
  colorScheme: ColorScheme
}

const DOT_COLOR: Record<ColorScheme, string> = {
  amber: 'amber.300',
  brand: 'brand.300',
  rose:  'rose.500',
  muted: 'text.muted',
}

const LINE_COLOR: Record<ColorScheme, string> = {
  amber: 'amber.900',
  brand: 'brand.900',
  rose:  'rose.900',
  muted: 'border.1',
}

export function SectionDivider({ label, count, colorScheme }: SectionDividerProps): ReactElement {
  const dotColor  = DOT_COLOR[colorScheme]
  const lineColor = LINE_COLOR[colorScheme]

  return (
    <Flex align="center" gap="2" my="2">
      {/* Left line */}
      <Box flex={1} h="1px" bg={lineColor} />

      {/* Dot */}
      <Box w="7px" h="7px" borderRadius="full" bg={dotColor} flexShrink={0} />

      {/* Label + count */}
      <Text
        fontFamily="mono"
        fontSize="2xs"
        fontWeight="600"
        color={dotColor}
        letterSpacing="wide"
        textTransform="uppercase"
        whiteSpace="nowrap"
      >
        {label} ({count})
      </Text>

      {/* Right line */}
      <Box flex={1} h="1px" bg={lineColor} />
    </Flex>
  )
}
