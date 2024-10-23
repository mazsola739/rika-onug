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
  width: ${({ size }) => size+20}px;
`

export const NameBackground = styled.img`
  position: absolute;
  width: 100%;
  top: 33%;
  z-index: 1;
`

export const PlayerName = styled.span`
  font-size: 16px;
  position: absolute;
  text-align: center;
  color: yellow;
  font-weight: 900;
  top: 48%;
  z-index: 2;
`
