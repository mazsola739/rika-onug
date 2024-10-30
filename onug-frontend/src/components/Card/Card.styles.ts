import styled from '@emotion/styled'
import { StyledCardProps } from './Card.types'

export const StyledCard = styled.div<StyledCardProps>`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${({ size }) => size}px;
  margin: 5px;
`

export const PlayerName = styled.span`
  font-size: 20px;
  text-align: center;
  color: white;
  font-weight: 600;
  top: 48%;
  z-index: 2;
`
