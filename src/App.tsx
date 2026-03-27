import { useState, type ReactElement } from 'react'
import SubhubDashboard from '@/pages/SubhubDashboard'

// Note: ReasoningScreen will be wired here when epic/reasoning-screen is merged to main.
// This epic delivers SubhubDashboard; App.tsx renders it directly for isolated development.

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
    <SubhubDashboard
      onRerun={() => {
        // Will trigger reasoning screen re-run when epics merge to main
      }}
      onThemeToggle={toggleTheme}
      isDark={isDark}
    />
  )
}
