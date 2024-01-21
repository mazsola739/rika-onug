import styled from '@emotion/styled'
import { StyledGameCardProps } from './GameCard.types'

export const StyledGameCard = styled.div<StyledGameCardProps>`
  align-items: center;
  background-image: ${(props) => `url(${props.backgroundImage})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: calc(100% - 10px) calc(100% - 10px);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 10px;
  font-weight: 500;
  height: 120px;
  justify-content: center;
  width: 90px;
`

export const Tokens = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
  gap: 20px;
`

export const TokenImage = styled.img`
  width: 35px;
  height: 35px;
`
