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

export const Tokens = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

export const GuessTokens = styled.div<{ width?: number, ownCard?: boolean }>`
  min-width: ${({ width }) => width}px;
  min-height: ${({ width }) => width}px;
  display: flex;
  flex-direction: ${({ ownCard }) => (ownCard ? `column` : `row`)};
  gap: 3px;
`
