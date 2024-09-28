import styled from '@emotion/styled'
import { StyledBoardCardProps, StyledBoardMarkProps } from './BoardCard.types'

export const StyledBoardCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
`

export const CardBack = styled.div<StyledBoardCardProps>`
  align-items: center;
  background-image: ${(props) => `url(${props.cardBackgroundImage})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
  filter: ${(props) =>
    props.selectable_cards
      ? props.isSelectedCard
        ? 'drop-shadow(5px 5px 5px yellow);'
        : 'drop-shadow(5px 5px 5px green);'
      : 'drop-shadow(5px 5px 5px black);'};
  border-radius: 10px;
  border: 2px solid ${(props) =>
        props.selectable_cards
          ? props.isSelectedCard
            ? 'yellow'
            : 'green'
          : 'transparent'};
  height: 110px;
  justify-content: center;
  width: 80px;
`

export const MarkBack = styled.div<StyledBoardMarkProps>`
  align-items: center;
  background-image: ${(props) => `url(${props.markBackgroundImage})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;

  filter: ${(props) =>
    props.selectable_marks
      ? props.isSelectedMark
        ? 'drop-shadow(5px 5px 5px yellow);'
        : 'drop-shadow(5px 5px 5px green);'
      : 'drop-shadow(5px 5px 5px black);'};
  height: 50px;
  justify-content: center;
  width: 50px;
`

export const Tokens = styled.div`
  display: flex;
  flex-wrap: row;
  justify-content: center;
  color: red;
  gap: 2px;
  min-height: 25px;
`
