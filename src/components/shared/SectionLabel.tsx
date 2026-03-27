import { type ReactElement, type ReactNode } from 'react'
import { Text } from '@chakra-ui/react'

interface SectionLabelProps {
  children: ReactNode
}

export function SectionLabel({ children }: SectionLabelProps): ReactElement {
  return (
    <Text
      fontFamily="mono"
      fontSize="2xs"
      fontWeight="500"
      color="text.muted"
      letterSpacing="widest"
      textTransform="uppercase"
    >
      {children}
    </Text>
  )
}
