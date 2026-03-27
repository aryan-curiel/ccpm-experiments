import { type ReactElement } from 'react'
import { Button, Spinner, Flex, Text } from '@chakra-ui/react'

interface LoadMoreButtonProps {
  remaining: number
  onLoad: () => void
  isLoading: boolean
  label: 'approvals' | 'rejections'
}

export function LoadMoreButton({ remaining, onLoad, isLoading, label }: LoadMoreButtonProps): ReactElement | null {
  if (remaining === 0) return null

  return (
    <Button
      variant="ghost"
      w="full"
      size="sm"
      color="text.muted"
      _hover={{ color: 'text.secondary', bg: 'surface.2' }}
      fontFamily="mono"
      fontSize="xs"
      letterSpacing="wide"
      disabled={isLoading}
      onClick={onLoad}
      mt="1"
    >
      {isLoading ? (
        <Flex align="center" gap="2">
          <Spinner size="xs" color="text.muted" />
          <Text>Loading…</Text>
        </Flex>
      ) : (
        `↓ Load ${remaining} more ${label}`
      )}
    </Button>
  )
}
