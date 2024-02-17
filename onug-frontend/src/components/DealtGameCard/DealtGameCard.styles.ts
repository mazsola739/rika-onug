import styled from '@emotion/styled'
import { StyledDealtGameCardProps } from './DealtGameCard.types'

export const StyledDealtGameCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

export const CardBack = styled.div<StyledDealtGameCardProps>`
  align-items: center;
  background-image: ${(props) => `url(${props.backgroundImage})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
  border: 3px solid white;

  border-radius: 6px;
  height: 90px;
  justify-content: center;
  width: 90px;
`

export const Tokens = styled.div`
  display: flex;
  flex-wrap: row;
  justify-content: center;
  color: red;
  gap: 2px;
`
