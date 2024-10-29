import { ReactNode } from 'react'

export interface GlowingBorderProps {
  children: ReactNode
  radius?: string
  glowColor?: string
}

export type StyledGlowingBorderProps = {
  radius?: string
  glowColor?: string
}
