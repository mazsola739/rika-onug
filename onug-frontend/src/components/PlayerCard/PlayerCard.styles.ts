import styled from '@emotion/styled'
import { StyledPlayerCardProps } from './PlayerCard.types'

export const StyledPlayerCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

export const CardBack = styled.div<StyledPlayerCardProps>`
  align-items: center;
  background-image: ${(props) => `url(${props.backgroundImage})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;

  height: 110px;
  justify-content: center;
  width: 80px;
  filter: drop-shadow(1px 1px 1px black);
`

export const Tokens = styled.div`
  display: flex;
  flex-wrap: row;
  justify-content: center;
  color: red;
  gap: 2px;
  filter: drop-shadow(1px 1px 1px black);
`
