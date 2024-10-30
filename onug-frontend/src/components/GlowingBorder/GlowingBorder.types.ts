import { ReactNode } from 'react'

export interface GlowingBorderProps {
  children: ReactNode
  radius?: string
  glowColor?: string
  sizeW?: number
  sizeH?: number
}

export type StyledGlowingBorderProps = {
  radius?: string
  glowColor?: string
  sizeW?: number
  sizeH?: number
}
