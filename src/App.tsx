import { useState, type ReactElement } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { ReasoningScreen } from '@/components/reasoning/ReasoningScreen'

type Screen = 'reasoning' | 'dashboard'

const screenVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit:    { opacity: 0, transition: { duration: 0.3 } },
}

function App(): ReactElement {
  const [screen, setScreen] = useState<Screen>('reasoning')
  const [isDark, setIsDark] = useState(true)

  function toggleColorMode(): void {
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

  function goToDashboard(): void {
    setScreen('dashboard')
  }

  function rerunAnalysis(): void {
    setScreen('reasoning')
  }

  return (
    <AnimatePresence mode="wait">
      {screen === 'reasoning' ? (
        <motion.div
          key="reasoning"
          variants={screenVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <ReasoningScreen
            onSkip={goToDashboard}
            onLaunch={goToDashboard}
          />
        </motion.div>
      ) : (
        <motion.div
          key="dashboard"
          variants={screenVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* Dashboard placeholder — will be replaced by the subhub-dashboard epic */}
          <Box
            minH="100vh"
            bg="bg.canvas"
            display="flex"
            flexDirection="column"
          >
            {/* Header bar */}
            <Flex
              as="header"
              align="center"
              justify="space-between"
              px="6"
              py="3"
              borderBottom="1px solid"
              borderColor="border.1"
              bg="surface.1"
            >
              <Text
                fontFamily="heading"
                fontWeight="700"
                fontSize="lg"
                color="text.primary"
                letterSpacing="tight"
              >
                SubHub Intelligence
              </Text>

              <Flex align="center" gap="3">
                <Button
                  size="sm"
                  variant="ghost"
                  color="text.secondary"
                  _hover={{ color: 'text.primary', bg: 'surface.2' }}
                  fontFamily="mono"
                  fontSize="xs"
                  letterSpacing="wide"
                  onClick={rerunAnalysis}
                >
                  ↺ Re-run analysis
                </Button>

                <Button
                  size="sm"
                  variant="ghost"
                  color="text.secondary"
                  _hover={{ color: 'text.primary', bg: 'surface.2' }}
                  fontFamily="mono"
                  fontSize="xs"
                  onClick={toggleColorMode}
                >
                  {isDark ? '☀' : '◐'}
                </Button>
              </Flex>
            </Flex>

            {/* Dashboard placeholder content */}
            <Flex
              flex={1}
              align="center"
              justify="center"
              direction="column"
              gap="4"
            >
              <Text
                fontFamily="mono"
                fontSize="sm"
                color="text.muted"
                letterSpacing="wide"
              >
                Dashboard — coming soon (subhub-dashboard epic)
              </Text>
              <Text
                fontFamily="mono"
                fontSize="xs"
                color="text.muted"
              >
                mil-v3.0 · expansionjs · role: PM
              </Text>
            </Flex>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default App
