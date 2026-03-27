import { type ReactElement } from 'react'
import { motion } from 'framer-motion'
import { Box, Flex, Text } from '@chakra-ui/react'

interface ProgressBarProps {
  progress: number    // 0–100
  isComplete: boolean
}

export function ProgressBar({ progress, isComplete }: ProgressBarProps): ReactElement {
  const label = isComplete
    ? 'Analysis complete'
    : `Analysing… ${Math.floor(progress)}%`

  return (
    <Box w="full">
      <Flex justify="space-between" align="center" mb="1.5">
        <Text fontSize="xs" color="text.muted" fontFamily="mono">
          {label}
        </Text>
        {!isComplete && (
          <Text fontSize="xs" color="text.muted" fontFamily="mono">
            {Math.floor(progress)}%
          </Text>
        )}
      </Flex>

      <Box
        w="full"
        h="3px"
        bg="surface.3"
        borderRadius="full"
        overflow="hidden"
      >
        <motion.div
          style={{
            height: '100%',
            borderRadius: '9999px',
            background: isComplete
              ? 'var(--chakra-colors-brand-300)'
              : 'var(--chakra-colors-brand-500)',
          }}
          animate={{ width: `${Math.min(100, progress)}%` }}
          transition={{ duration: 0.3, ease: 'linear' }}
        />
      </Box>
    </Box>
  )
}
