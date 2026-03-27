import { useState, type ReactElement } from 'react'
import { Box, Flex, Text, IconButton } from '@chakra-ui/react'
import { ActionQueue } from '@/components/action-queue/ActionQueue'

// Note: This epic delivers ActionQueue in isolation.
// Full dashboard integration (with AppHeader, SubhubDashboard) happens when
// epic/subhub-dashboard and epic/action-queue are both merged to main.

export default function App(): ReactElement {
  const [isDark, setIsDark] = useState(true)

  function toggleTheme(): void {
    const next = !isDark
    setIsDark(next)
    if (next) {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.add('light')
    }
  }

  return (
    <Box minH="100vh" bg="bg.canvas">
      {/* Minimal header for isolated testing */}
      <Flex
        as="header"
        align="center"
        justify="space-between"
        px="6"
        py="3"
        borderBottom="1px solid"
        borderColor="border.1"
        bg="surface.1"
        position="sticky"
        top={0}
        zIndex={100}
      >
        <Text
          fontFamily="heading"
          fontSize="sm"
          fontWeight="700"
          color="text.primary"
          letterSpacing="tight"
        >
          SubHub Intelligence · Action Queue
        </Text>
        <IconButton
          size="sm"
          variant="ghost"
          aria-label="Toggle theme"
          color="text.secondary"
          _hover={{ color: 'text.primary', bg: 'surface.2' }}
          onClick={toggleTheme}
        >
          <Text fontSize="sm">{isDark ? '☀' : '◐'}</Text>
        </IconButton>
      </Flex>

      {/* ActionQueue panel */}
      <Box maxW="720px" mx="auto" px={{ base: '4', md: '6' }} py="6">
        <ActionQueue />
      </Box>
    </Box>
  )
}
