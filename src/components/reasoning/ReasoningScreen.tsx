import { useState, useEffect, type ReactElement } from 'react'
import { motion } from 'framer-motion'
import { Box, Flex, Text, Button } from '@chakra-ui/react'
import { StreamLog } from './StreamLog'
import { TaskChecklist } from './TaskChecklist'
import { FindingCards } from './FindingCards'
import { ProgressBar } from './ProgressBar'
import { useReasoningSequence } from '@/hooks/useReasoningSequence'
import { STREAM_LINES } from '@/data/reasoning'
import { getReasoningData } from '@/api'
import type { FindingEntry } from '@/data/reasoning'
import type { Finding } from '@/types/subhub'  // API type from mock-api-layer

interface ReasoningScreenProps {
  onSkip: () => void
  onLaunch: () => void
  onRestart?: (restartFn: () => void) => void
}

const GRID_BG_IMAGE = [
  'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
  'linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
].join(',')

const PULSE_STYLES = `
  @keyframes mil-pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.5; transform: scale(1.4); }
  }
  .mil-status-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #059669;
    animation: mil-pulse 1.8s ease-in-out infinite;
    flex-shrink: 0;
  }
`

function mapFindingToCard(f: Finding): FindingEntry {
  return { id: f.text, severity: f.type, text: f.text }
}

function MilLogo(): ReactElement {
  return (
    <svg
      viewBox="0 0 32 32"
      width="32"
      height="32"
      fill="none"
      aria-label="MIL logo"
    >
      <rect width="32" height="32" rx="6" fill="var(--chakra-colors-brand-500)" />
      <path
        d="M7 22V10l5 8 4-6 4 6 5-8v12"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ReasoningScreen({ onSkip, onLaunch, onRestart }: ReasoningScreenProps): ReactElement {
  const [apiFindingsOverride, setApiFindingsOverride] = useState<FindingEntry[] | undefined>(undefined)

  useEffect(() => {
    getReasoningData().then(data => {
      if (data.findings.length > 0) {
        setApiFindingsOverride(data.findings.map(mapFindingToCard))
      }
    }).catch(() => {
      // fall back to static FINDINGS
    })
  }, [])

  const { visibleLines, tasks, findings, visibleFindings, progress, isComplete, restart } =
    useReasoningSequence({
      onComplete: () => {
        setTimeout(onLaunch, 2000)
      },
      findings: apiFindingsOverride,
    })

  useEffect(() => {
    onRestart?.(restart)
  }, [restart, onRestart])

  const lines = STREAM_LINES.map(l => l.text)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{ position: 'fixed', inset: 0, zIndex: 9999, overflow: 'hidden' }}
    >
      <style>{PULSE_STYLES}</style>

      {/* Background canvas + tactical grid */}
      <Box
        position="absolute"
        inset={0}
        bg="bg.canvas"
        style={{
          backgroundImage: GRID_BG_IMAGE,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Ambient orb 1 — top-left, brand blue */}
      <motion.div
        style={{
          position: 'absolute',
          top: '-20%',
          left: '-10%',
          width: 600,
          height: 600,
          borderRadius: '50%',
          pointerEvents: 'none',
          background: 'radial-gradient(circle, var(--chakra-colors-brand-900) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Ambient orb 2 — bottom-right, violet */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '-15%',
          right: '-8%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          pointerEvents: 'none',
          background: 'radial-gradient(circle, var(--chakra-colors-violet-900) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* Ambient orb 3 — center-right, teal */}
      <motion.div
        style={{
          position: 'absolute',
          top: '30%',
          right: '5%',
          width: 300,
          height: 300,
          borderRadius: '50%',
          pointerEvents: 'none',
          background: 'radial-gradient(circle, var(--chakra-colors-teal-900) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* Skip button — top right */}
      <Box position="absolute" top="4" right="4" zIndex={1}>
        <Button
          size="sm"
          variant="ghost"
          color="text.secondary"
          _hover={{ color: 'text.primary', bg: 'surface.2' }}
          onClick={onSkip}
          fontFamily="mono"
          fontSize="xs"
          letterSpacing="wide"
        >
          Skip →
        </Button>
      </Box>

      {/* Main content — centered */}
      <Flex
        position="relative"
        direction="column"
        align="center"
        justify="center"
        h="full"
        px={{ base: '4', md: '8' }}
        py="8"
        gap="6"
        overflowY="auto"
      >
        {/* Brand header */}
        <Flex direction="column" align="center" gap="3" flexShrink={0}>
          <MilLogo />
          <Box textAlign="center">
            <Text
              fontFamily="heading"
              fontSize={{ base: 'xl', md: '2xl' }}
              fontWeight="700"
              color="text.primary"
              letterSpacing="tight"
            >
              SubHub Intelligence
            </Text>
            <Text
              fontFamily="mono"
              fontSize="2xs"
              color="text.muted"
              letterSpacing="widest"
              textTransform="uppercase"
              mt="0.5"
            >
              Management Intelligence Layer
            </Text>
          </Box>

          <Flex align="center" gap="2">
            <span className="mil-status-dot" aria-hidden="true" />
            <Text fontFamily="mono" fontSize="xs" color="text.secondary">
              {isComplete ? 'Analysis complete' : 'Analysing operations data…'}
            </Text>
            <Text fontFamily="mono" fontSize="2xs" color="text.muted">
              · mil-v3.0 · expansionjs
            </Text>
          </Flex>
        </Flex>

        {/* Glass card */}
        <Box
          w="full"
          maxW="1000px"
          borderRadius="2xl"
          border="1px solid"
          borderColor="border.1"
          bg="surface.1"
          backdropFilter="blur(12px)"
          overflow="hidden"
          flexShrink={0}
        >
          {/* Top: StreamLog */}
          <Box
            p="4"
            borderBottom="1px solid"
            borderColor="border.1"
            minH="160px"
          >
            <StreamLog lines={lines} visibleCount={visibleLines} />
          </Box>

          {/* Bottom: TaskChecklist + FindingCards */}
          <Flex direction={{ base: 'column', md: 'row' }}>
            <Box
              flex={1}
              p="4"
              borderRight={{ base: 'none', md: '1px solid' }}
              borderBottom={{ base: '1px solid', md: 'none' }}
              borderColor="border.1"
              overflowY="auto"
              maxH="220px"
            >
              <Text
                fontFamily="mono"
                fontSize="2xs"
                color="text.muted"
                letterSpacing="widest"
                textTransform="uppercase"
                mb="2"
              >
                Analysis Tasks
              </Text>
              <TaskChecklist tasks={tasks} />
            </Box>

            <Box flex={1} p="4" overflowY="auto" maxH="220px">
              <Text
                fontFamily="mono"
                fontSize="2xs"
                color="text.muted"
                letterSpacing="widest"
                textTransform="uppercase"
                mb="2"
              >
                Findings
              </Text>
              <FindingCards findings={findings} visibleCount={visibleFindings} />
            </Box>
          </Flex>

          {/* Footer: ProgressBar + Launch button */}
          <Box p="4" borderTop="1px solid" borderColor="border.1">
            <ProgressBar progress={progress} isComplete={isComplete} />

            {isComplete && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: 0.3 }}
              >
                <Flex justify="center" mt="3">
                  <Button
                    size="sm"
                    bg="brand.500"
                    color="white"
                    _hover={{ bg: 'brand.300' }}
                    fontFamily="mono"
                    fontSize="xs"
                    letterSpacing="wide"
                    onClick={onLaunch}
                  >
                    Launch Dashboard →
                  </Button>
                </Flex>
              </motion.div>
            )}
          </Box>
        </Box>
      </Flex>
    </motion.div>
  )
}
