import styled from '@emotion/styled'
import { StyledGameCardProps } from './GameCard.types'

export const StyledGameCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

export const CardBack = styled.div<StyledGameCardProps>`
  align-items: center;
  background-image: ${(props) => `url(${props.backgroundImage})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
  border: ${(props) =>
    props.selectable
      ? props.isSelected
        ? '3px solid yellow'
        : '3px solid green'
      : '3px solid white'};

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
