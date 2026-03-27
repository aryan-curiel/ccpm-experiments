import { type ReactElement } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Box, Flex, Text } from '@chakra-ui/react'
import type { FindingType } from '@/types/subhub'
import type { FindingEntry } from '@/data/reasoning'

export type { FindingEntry as Finding }

interface FindingCardsProps {
  findings: FindingEntry[]
  visibleCount: number
}

const SEVERITY_CONFIG: Record<FindingType, { icon: string; color: string; label: string }> = {
  critical: { icon: '⚠', color: 'red.400',    label: 'CRITICAL' },
  warning:  { icon: '▲', color: 'orange.400',  label: 'WARNING'  },
  positive: { icon: '✓', color: 'green.400',   label: 'POSITIVE' },
  info:     { icon: 'ℹ', color: 'blue.400',    label: 'INFO'     },
}

export function FindingCards({ findings, visibleCount }: FindingCardsProps): ReactElement {
  const visibleFindings = findings.slice(0, visibleCount)

  return (
    <Box display="flex" flexDir="column" gap="2">
      <AnimatePresence>
        {visibleFindings.map((finding, index) => {
          const cfg = SEVERITY_CONFIG[finding.severity]
          return (
            <motion.div
              key={finding.id}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut', delay: index * 0.1 }}
            >
              <Box
                px="3"
                py="2.5"
                borderRadius="lg"
                border="1px solid"
                borderColor="border.1"
                bg="surface.2"
                backdropFilter="blur(8px)"
              >
                <Flex align="center" gap="2" mb="1">
                  <Text as="span" color={cfg.color} fontSize="sm" lineHeight={1}>
                    {cfg.icon}
                  </Text>
                  <Text
                    fontSize="2xs"
                    fontWeight="semibold"
                    letterSpacing="widest"
                    color={cfg.color}
                  >
                    {cfg.label}
                  </Text>
                </Flex>
                <Text fontSize="xs" color="text.secondary" lineHeight="short">
                  {finding.text}
                </Text>
              </Box>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </Box>
  )
}
