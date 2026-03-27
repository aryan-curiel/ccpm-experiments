import { type ReactElement } from 'react'
import { Box } from '@chakra-ui/react'

export type BadgeVariant =
  | 'breach'
  | 'nearBreach'
  | 'onTrack'
  | 'info'
  | 'neutral'
  | 'rejected'
  | 'blocked'

interface BadgeProps {
  variant: BadgeVariant
  label: string
}

const VARIANT_TOKENS: Record<BadgeVariant, { bg: string; color: string }> = {
  breach:     { bg: 'rose.900',   color: 'rose.500'   },
  nearBreach: { bg: 'amber.900',  color: 'amber.500'  },
  onTrack:    { bg: 'mint.900',   color: 'mint.500'   },
  info:       { bg: 'sky.900',    color: 'sky.500'    },
  neutral:    { bg: 'surface.3',  color: 'text.secondary' },
  rejected:   { bg: 'rose.900',   color: 'rose.500'   },
  blocked:    { bg: 'amber.900',  color: 'amber.500'  },
}

export function Badge({ variant, label }: BadgeProps): ReactElement {
  const { bg, color } = VARIANT_TOKENS[variant]
  return (
    <Box
      as="span"
      display="inline-flex"
      alignItems="center"
      px="1.5"
      py="0.5"
      borderRadius="sm"
      bg={bg}
      color={color}
      fontFamily="mono"
      fontSize="2xs"
      fontWeight="600"
      letterSpacing="wide"
      textTransform="uppercase"
      lineHeight="1"
      whiteSpace="nowrap"
    >
      {label}
    </Box>
  )
}
