import styled from '@emotion/styled'
import { StyledGameCardProps } from './GameCard.types'

export const StyledGameCard = styled.div<StyledGameCardProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 120px;
  font-size: 10px;
  font-weight: 500;
  font-family: 'Josefin Sans', sans-serif;
  background-image: ${(props) => `url(${props.backgroundImage})`};
  background-size: calc(100% - 10px) calc(100% - 10px);
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
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
