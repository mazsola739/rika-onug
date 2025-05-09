import styled from '@emotion/styled'
import { GuessTokensProps, StyledPlayerCardProps } from './PlayerCard.types'

export const StyledPlayerCard = styled.div<StyledPlayerCardProps>`
  /* Flexbox/Grid */
  display: flex;
  flex-direction: ${({ ownCard }) => (ownCard ? `row` : `column`)};
  justify-content: center;
  align-items: center;
`

export const CardContainer = styled.div`
  /* Flexbox/Grid */
  display: flex;
  justify-content: center;
  align-items: flex-start;
`

export const CardHolder = styled.div`
  /* Flexbox/Grid */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

/* TODO get better name background   background: transparent url(/assets/backgrounds/name2.webp) center center/cover no-repeat;*/
export const PlayerName = styled.span`
  /* Box Model */
  width: 100%;
  padding: 3px;

  /* Typography */
  font-size: 14px;
  text-align: center;

  /* Visuals */
  filter: drop-shadow(3px 3px 3px black);
  text-shadow: 2px 2px 2px black;
`

export const Tokens = styled.div`
  /* Flexbox/Grid */
  display: flex;
  flex-direction: column;
  gap: 2px;
`

export const GuessTokens = styled.div<GuessTokensProps>`
  /* Box Model */
  min-width: ${({ width }) => width}px;
  min-height: ${({ width }) => width}px;

  /* Flexbox/Grid */
  display: flex;
  flex-direction: ${({ ownCard }) => (ownCard ? `column` : `row`)};
  gap: 3px;
`
