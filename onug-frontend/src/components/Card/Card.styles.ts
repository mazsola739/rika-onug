import styled from '@emotion/styled'
import { StyledCardProps } from './Card.types'

export const StyledCard = styled.div<StyledCardProps>`
  width: ${({ sizeW }) => sizeW}px;
  height: ${({ sizeH }) => sizeH}px;
`
