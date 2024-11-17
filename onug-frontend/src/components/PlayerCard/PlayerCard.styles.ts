import styled from '@emotion/styled'

export const StyledPlayerCard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
`

export const Tokens = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3125rem;
  height: 100%;
`

export const GuessTokens = styled.div<{ width?: number }>`
  min-width: ${({ width }) => width}px;
  display: flex;
  flex-direction: column;
  gap: 0.1875rem;
`
