import { useState, type ReactElement } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ReasoningScreen } from '@/components/reasoning/ReasoningScreen'
import SubhubDashboard from '@/pages/SubhubDashboard'

type Screen = 'reasoning' | 'dashboard'

const screenVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit:    { opacity: 0, transition: { duration: 0.3 } },
}

function App(): ReactElement {
  const [screen, setScreen] = useState<Screen>('reasoning')
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
    <AnimatePresence mode="wait">
      {screen === 'reasoning' ? (
        <motion.div
          key="reasoning"
          variants={screenVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{ position: 'fixed', inset: 0 }}
        >
          <ReasoningScreen
            onSkip={() => setScreen('dashboard')}
            onLaunch={() => setScreen('dashboard')}
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
          <SubhubDashboard
            onRerun={() => setScreen('reasoning')}
            onThemeToggle={toggleTheme}
            isDark={isDark}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default App
