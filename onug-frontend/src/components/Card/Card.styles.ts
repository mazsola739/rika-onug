import styled from '@emotion/styled'
import { StyledCardProps } from './Card.types'

export const StyledCard = styled.div<StyledCardProps>`
  width: ${({ sizeW }) => sizeW}px;
  animation: glowingGold 1s ease-in-out infinite alternate;
`

/*height: ${({ sizeH }) => sizeH}px;
  const sizeH = Math.round(size * 1.37367)
  const glowColor = isSelectable ? "#28a745" : "transparent" */