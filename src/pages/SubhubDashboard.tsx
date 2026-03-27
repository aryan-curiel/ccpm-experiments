import { useState, useEffect, type ReactElement } from 'react'
import { Box, Grid, GridItem, Flex, Text } from '@chakra-ui/react'
import { AppHeader, StatCard, StagePerformance, SubcontractorLeague, PriorityProjects } from '@/components/subhub'
import { SectionLabel } from '@/components/shared'
import { getStats, getStageMetrics, getSubcontractors, getPriorityProjects } from '@/api'
import type { SubHubStats, StageMetric, Subcontractor, Project } from '@/types/subhub'

interface SubhubDashboardProps {
  onRerun: () => void
  onThemeToggle: () => void
  isDark?: boolean
}

export default function SubhubDashboard({ onRerun, onThemeToggle, isDark = true }: SubhubDashboardProps): ReactElement {
  const [stats, setStats] = useState<SubHubStats | null>(null)
  const [stages, setStages] = useState<StageMetric[]>([])
  const [contractors, setContractors] = useState<Subcontractor[]>([])
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    getStats().then(setStats)
    getStageMetrics().then(setStages)
    getSubcontractors().then(setContractors)
    getPriorityProjects().then(setProjects)
  }, [])

  return (
    <Box minH="100vh" bg="bg.canvas">
      <AppHeader onRerun={onRerun} onThemeToggle={onThemeToggle} isDark={isDark} />

      <Grid
        templateColumns={{ base: '1fr', lg: '65fr 35fr' }}
        gap="6"
        p={{ base: '4', md: '6' }}
        maxW="1600px"
        mx="auto"
      >
        {/* Main content column */}
        <GridItem>
          <Flex direction="column" gap="6">
            {/* Stats row */}
            <Box>
              <Box mb="3">
                <SectionLabel>Operations Overview</SectionLabel>
              </Box>
              {stats && (
                <Grid templateColumns="repeat(4, 1fr)" gap="3">
                  <StatCard
                    label="SLA Breached"
                    value={stats.slaBreached}
                    note={stats.trends.slaBreached.label}
                    trend={stats.trends.slaBreached.direction}
                    color="rose"
                  />
                  <StatCard
                    label="Near Breach"
                    value={stats.nearBreach}
                    note={stats.trends.nearBreach.label}
                    trend={stats.trends.nearBreach.direction}
                    color="amber"
                  />
                  <StatCard
                    label="Active Projects"
                    value={stats.activeProjects}
                    note={stats.trends.activeProjects.label}
                    trend={stats.trends.activeProjects.direction}
                    color="sky"
                  />
                  <StatCard
                    label="On-Track Rate"
                    value={`${stats.onTrackRate}%`}
                    note={stats.trends.onTrackRate.label}
                    trend={stats.trends.onTrackRate.direction}
                    color="mint"
                  />
                </Grid>
              )}
            </Box>

            {/* Stage Performance */}
            {stages.length > 0 && (
              <Box
                p="5"
                borderRadius="xl"
                border="1px solid"
                borderColor="border.1"
                bg="surface.1"
              >
                <StagePerformance stages={stages} />
              </Box>
            )}

            {/* Subcontractor League */}
            {contractors.length > 0 && (
              <Box
                p="5"
                borderRadius="xl"
                border="1px solid"
                borderColor="border.1"
                bg="surface.1"
              >
                <SubcontractorLeague contractors={contractors} />
              </Box>
            )}

            {/* Action Queue placeholder */}
            <Box
              p="5"
              borderRadius="xl"
              border="1px solid"
              borderColor="border.1"
              bg="surface.1"
            >
              <Box mb="3">
                <SectionLabel>Action Queue</SectionLabel>
              </Box>
              <Text fontSize="sm" color="text.muted" fontFamily="mono">
                Action Queue — action-queue epic coming soon
              </Text>
            </Box>
          </Flex>
        </GridItem>

        {/* Sidebar */}
        <GridItem>
          <Box
            position={{ lg: 'sticky' }}
            top={{ lg: '80px' }}
            p="5"
            borderRadius="xl"
            border="1px solid"
            borderColor="border.1"
            bg="surface.1"
            maxH={{ lg: 'calc(100vh - 100px)' }}
            overflowY={{ lg: 'auto' }}
          >
            <PriorityProjects projects={projects} />
          </Box>
        </GridItem>
      </Grid>
    </Box>
  )
}
