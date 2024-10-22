import styled from '@emotion/styled'
import { StyledCardProps } from './Card.types'

export const StyledCard = styled.div<StyledCardProps>`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
  position: relative;
  transition: 0.75s;
`

export const PlayerName = styled.span`
  font-size: 16px;
  position: absolute;
  text-align: center;
  top: 45%;
  color: white;
`
