import { type ReactElement } from 'react'
import { Box, Flex, Text, Button, IconButton } from '@chakra-ui/react'

interface AppHeaderProps {
  onRerun: () => void
  onThemeToggle: () => void
  isDark?: boolean
}

const LIVE_DOT_STYLES = `
  @keyframes mil-live-pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.4; transform: scale(1.5); }
  }
  .mil-live-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #059669;
    animation: mil-live-pulse 2s ease-in-out infinite;
    flex-shrink: 0;
  }
`

function MilLogo(): ReactElement {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-label="MIL">
      <rect width="24" height="24" rx="5" fill="var(--chakra-colors-brand-500)" />
      <path
        d="M5 17V7l4 6 3-4.5 3 4.5 4-6v10"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function AppHeader({ onRerun, onThemeToggle, isDark = true }: AppHeaderProps): ReactElement {
  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex={200}
      backdropFilter="blur(20px)"
      bg="surface.1"
      borderBottom="1px solid"
      borderColor="border.1"
    >
      <style>{LIVE_DOT_STYLES}</style>

      {/* Gradient top rule */}
      <Box
        h="2px"
        w="full"
        style={{
          background: 'linear-gradient(90deg, var(--chakra-colors-brand-500), var(--chakra-colors-accent-500), var(--chakra-colors-brand-500))',
        }}
      />

      <Flex
        align="center"
        justify="space-between"
        px={{ base: '4', md: '6' }}
        py="3"
        gap="4"
      >
        {/* Left: Logomark + identity */}
        <Flex align="center" gap="3" flexShrink={0}>
          <MilLogo />
          <Box display={{ base: 'none', md: 'block' }}>
            <Text
              fontFamily="heading"
              fontSize="sm"
              fontWeight="700"
              color="text.primary"
              lineHeight="1.2"
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
            >
              Management Intelligence Layer
            </Text>
          </Box>
        </Flex>

        {/* Center: context */}
        <Box textAlign="center" display={{ base: 'none', lg: 'block' }}>
          <Text
            fontFamily="heading"
            fontSize="sm"
            fontWeight="600"
            color="text.primary"
            letterSpacing="tight"
          >
            SubcontractorHub Operations
          </Text>
          <Text fontFamily="mono" fontSize="2xs" color="text.muted">
            63 active projects · Mar 18, 2026
          </Text>
        </Box>

        {/* Right: live pill + actions + avatar */}
        <Flex align="center" gap="2" flexShrink={0}>
          {/* Live pill */}
          <Flex
            align="center"
            gap="1.5"
            px="2.5"
            py="1"
            borderRadius="full"
            bg="mint.900"
            border="1px solid"
            borderColor="mint.500"
          >
            <span className="mil-live-dot" aria-hidden="true" />
            <Text
              fontFamily="mono"
              fontSize="2xs"
              fontWeight="600"
              color="mint.500"
              letterSpacing="wide"
              textTransform="uppercase"
            >
              Live
            </Text>
          </Flex>

          {/* Re-run analysis */}
          <Button
            size="sm"
            variant="ghost"
            color="text.secondary"
            _hover={{ color: 'text.primary', bg: 'surface.2' }}
            fontFamily="mono"
            fontSize="xs"
            letterSpacing="wide"
            display={{ base: 'none', md: 'flex' }}
            onClick={onRerun}
          >
            ↺ Re-run
          </Button>

          {/* Theme toggle */}
          <IconButton
            size="sm"
            variant="ghost"
            aria-label="Toggle theme"
            color="text.secondary"
            _hover={{ color: 'text.primary', bg: 'surface.2' }}
            onClick={onThemeToggle}
          >
            <Text fontSize="sm">{isDark ? '☀' : '◐'}</Text>
          </IconButton>

          {/* Avatar */}
          <Flex
            w="8"
            h="8"
            borderRadius="full"
            bg="brand.900"
            border="1px solid"
            borderColor="brand.500"
            align="center"
            justify="center"
            flexShrink={0}
          >
            <Text
              fontFamily="mono"
              fontSize="2xs"
              fontWeight="700"
              color="brand.300"
              letterSpacing="wide"
            >
              PM
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}
