import { useState } from 'react'
import { Box, Button, Text } from '@chakra-ui/react'

function App() {
  // Chakra v3 uses CSS class-based color mode.
  // `.dark` on <html> activates `_dark` semantic tokens; no class = light mode.
  const [isDark, setIsDark] = useState(true)

  function toggleColorMode() {
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
    <Box
      minH="100vh"
      bg="bg.canvas"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={6}
    >
      <Text
        fontFamily="heading"
        fontWeight="800"
        fontSize="3xl"
        color="text.primary"
        letterSpacing="tight"
      >
        MIL — SubHub Intelligence
      </Text>

      <Text
        fontFamily="body"
        fontWeight="400"
        fontSize="md"
        color="text.secondary"
      >
        Management Intelligence Layer · v3.0.1
      </Text>

      <Text
        fontFamily="mono"
        fontWeight="400"
        fontSize="sm"
        color="text.muted"
      >
        {isDark ? 'Dark mode active (#04070e)' : 'Light mode active (#eff3ff)'}
      </Text>

      <Button
        onClick={toggleColorMode}
        bg="brand.500"
        color="white"
        fontFamily="body"
        fontWeight="600"
        px={6}
        py={3}
        borderRadius="md"
        _hover={{ bg: 'brand.300' }}
      >
        Toggle {isDark ? 'Light' : 'Dark'} Mode
      </Button>
    </Box>
  )
}

export default App
