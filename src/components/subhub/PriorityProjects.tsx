import { type ReactElement } from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'
import { Badge, SectionLabel } from '@/components/shared'
import type { BadgeVariant } from '@/components/shared'
import type { Project } from '@/types/subhub'

interface PriorityProjectsProps {
  projects: Project[]
}

const BADGE_VARIANT: Record<Project['riskStatus'], BadgeVariant> = {
  breach: 'breach',
  atRisk: 'nearBreach',
  near:   'nearBreach',
}

const BADGE_LABEL: Record<Project['riskStatus'], string> = {
  breach: 'Breach',
  atRisk: 'At Risk',
  near:   'Near',
}

const HEALTH_COLOR: Record<Project['riskStatus'], string> = {
  breach: 'rose.500',
  atRisk: 'amber.500',
  near:   'amber.500',
}

function ProjectItem({ project }: { project: Project }): ReactElement {
  const healthPct = Math.max(0, project.healthPct)

  return (
    <Box
      py="3"
      px="3"
      borderRadius="xl"
      border="1px solid"
      borderColor="border.1"
      bg="surface.1"
      mb="2"
      _hover={{ bg: 'surface.2', borderColor: 'border.2' }}
      cursor="default"
      transition="all 0.15s ease"
    >
      {/* Top row: badge + project ID */}
      <Flex align="center" justify="space-between" mb="1.5">
        <Badge variant={BADGE_VARIANT[project.riskStatus]} label={BADGE_LABEL[project.riskStatus]} />
        <Text fontFamily="mono" fontSize="2xs" color="text.muted">
          {project.id}
        </Text>
      </Flex>

      {/* Project name */}
      <Text
        fontSize="sm"
        fontWeight="600"
        color="text.primary"
        fontFamily="body"
        mb="1"
        lineHeight="1.3"
      >
        {project.name}
      </Text>

      {/* Stage + days */}
      <Text fontSize="xs" color="text.secondary" mb="2">
        {project.stage} · {project.currentDay}d / {project.slaDays}d SLA
      </Text>

      {/* Tags row: subcontractor + contract value */}
      <Flex gap="1.5" mb="2.5" flexWrap="wrap">
        <Box
          as="span"
          px="1.5"
          py="0.5"
          borderRadius="sm"
          bg="surface.3"
          border="1px solid"
          borderColor="border.1"
          fontSize="2xs"
          color="text.secondary"
          fontFamily="mono"
        >
          {project.subcontractor}
        </Box>
        <Box
          as="span"
          px="1.5"
          py="0.5"
          borderRadius="sm"
          bg="surface.3"
          border="1px solid"
          borderColor="border.1"
          fontSize="2xs"
          color="text.secondary"
          fontFamily="mono"
        >
          {project.contractValue}
        </Box>
      </Flex>

      {/* Health bar */}
      <Box position="relative" h="4px" bg="surface.3" borderRadius="full" overflow="hidden">
        <Box
          position="absolute"
          left={0}
          top={0}
          h="100%"
          borderRadius="full"
          bg={HEALTH_COLOR[project.riskStatus]}
          style={{ width: `${healthPct}%` }}
        />
      </Box>
    </Box>
  )
}

export function PriorityProjects({ projects }: PriorityProjectsProps): ReactElement {
  return (
    <Box>
      <Box mb="3">
        <SectionLabel>Priority Projects</SectionLabel>
      </Box>
      <Box overflowY="auto">
        {projects.map(project => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </Box>
    </Box>
  )
}
