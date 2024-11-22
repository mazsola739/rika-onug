import styled from '@emotion/styled'

export const StyledPlayerCard = styled.div<{ ownCard?: boolean }>`
  display: flex;
  flex-direction: ${({ ownCard }) => (ownCard ? `row` : `column`)};
  justify-content: center;
  align-items: center;
`

export const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
`
export const CardHolder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
/* TODO get better name background   background: transparent url(/assets/backgrounds/name2.webp) center center/cover no-repeat;*/
export const PlayerName = styled.span`
  width: 100%;
  font-size: 14px;
  filter: drop-shadow(3px 3px 3px black);
  text-shadow: 2px 2px 2px black;
  text-align: center;
  padding: 3px;
`

export const Tokens = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

export const GuessTokens = styled.div<{ width?: number; ownCard?: boolean }>`
  min-width: ${({ width }) => width}px;
  min-height: ${({ width }) => width}px;
  display: flex;
  flex-direction: ${({ ownCard }) => (ownCard ? `column` : `row`)};
  gap: 3px;
`
