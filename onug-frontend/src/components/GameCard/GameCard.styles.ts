import styled from '@emotion/styled'
import { StyledGameCardProps } from './GameCard.types'

export const StyledGameCard = styled.div`
  display: flex;
  flex-direction: column;
`

export const CardBack = styled.div<StyledGameCardProps>`
  align-items: center;
  background-image: ${(props) => `url(${props.backgroundImage})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
  border: 5px 2px solid white;
  border-radius: 6px;
  height: 130px;
  justify-content: center;
  width: 90px;
`

export const Tokens = styled.div`
  display: flex;
  flex-wrap: row;
  justify-content: center;
  gap: 2px;
`

export const TokenImage = styled.img`
  width: 35px;
  height: 35px;
`
