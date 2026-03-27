import { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Box } from '@chakra-ui/react'

interface StreamLogProps {
  lines: string[]
  visibleCount: number
}

const CURSOR_STYLES = `
  @keyframes mil-blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
  .mil-stream-cursor {
    display: inline-block;
    width: 8px;
    height: 1em;
    background: currentColor;
    margin-left: 4px;
    animation: mil-blink 1s step-end infinite;
    vertical-align: text-bottom;
    border-radius: 1px;
  }
`

export function StreamLog({ lines, visibleCount }: StreamLogProps): JSX.Element {
  const bottomRef = useRef<HTMLDivElement>(null)
  const visibleLines = lines.slice(0, visibleCount)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [visibleCount])

  return (
    <Box
      position="relative"
      maxH="280px"
      overflowY="auto"
      fontFamily="mono"
      fontSize="xs"
      lineHeight="tall"
      color="text.secondary"
      css={{
        '&::-webkit-scrollbar': { width: '3px' },
        '&::-webkit-scrollbar-thumb': { background: 'var(--chakra-colors-border-2)', borderRadius: '2px' },
      }}
    >
      <style>{CURSOR_STYLES}</style>

      <AnimatePresence mode="sync">
        {visibleLines.map((line, index) => {
          const isLast = index === visibleLines.length - 1
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              <Box as="span" display="block" py="0.5">
                {line}
                {isLast && visibleCount > 0 && (
                  <span className="mil-stream-cursor" aria-hidden="true" />
                )}
              </Box>
            </motion.div>
          )
        })}
      </AnimatePresence>

      <div ref={bottomRef} />
    </Box>
  )
}
