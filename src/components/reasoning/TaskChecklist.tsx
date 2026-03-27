import { type ReactElement } from 'react'
import { motion, type Variants } from 'framer-motion'
import { Box, Flex, Text } from '@chakra-ui/react'
import type { TaskState } from '@/hooks/useReasoningSequence'

interface TaskChecklistProps {
  tasks: TaskState[]
}

const SPINNER_STYLES = `
  @keyframes mil-spin {
    to { transform: rotate(360deg); }
  }
  .mil-task-spinner {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 2px solid transparent;
    border-top-color: currentColor;
    animation: mil-spin 0.8s linear infinite;
    flex-shrink: 0;
  }
`

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -8 },
  show: { opacity: 1, x: 0 },
}

function TaskIcon({ status }: { status: TaskState['status'] }): ReactElement {
  if (status === 'done') {
    return (
      <Box
        w="16px"
        h="16px"
        flexShrink={0}
        color="green.400"
        fontWeight="bold"
        fontSize="13px"
        lineHeight="16px"
        textAlign="center"
      >
        ✓
      </Box>
    )
  }

  if (status === 'running') {
    return (
      <>
        <style>{SPINNER_STYLES}</style>
        <Box as="span" className="mil-task-spinner" color="brand.300" />
      </>
    )
  }

  // pending
  return (
    <Box
      w="16px"
      h="16px"
      flexShrink={0}
      borderRadius="full"
      border="1.5px solid"
      borderColor="text.muted"
      opacity={0.4}
    />
  )
}

export function TaskChecklist({ tasks }: TaskChecklistProps): ReactElement {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show">
      {tasks.map(task => {
        const isDone = task.status === 'done'
        const isRunning = task.status === 'running'

        return (
          <motion.div
            key={task.id}
            variants={itemVariants}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <Flex
              align="center"
              gap="8px"
              px="2"
              py="1.5"
              borderRadius="md"
              mb="1"
              bg={isRunning ? 'surface.2' : 'transparent'}
              transition="background 0.2s ease"
            >
              <TaskIcon status={task.status} />
              <Text
                fontSize="sm"
                fontFamily="body"
                color={isRunning ? 'text.primary' : 'text.muted'}
                opacity={isDone ? 0.5 : 1}
                textDecoration={isDone ? 'line-through' : 'none'}
                flex={1}
              >
                {task.label}
              </Text>
            </Flex>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
