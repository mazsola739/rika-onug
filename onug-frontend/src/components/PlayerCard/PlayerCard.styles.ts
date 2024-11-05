import styled from '@emotion/styled'

export const StyledPlayerCard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 5px;
`

export const PlayerName = styled.span`
  font-size: 20px;
  text-align: center;
  color: white;
  font-weight: 600;
`

export const Tokens = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  height: 100%;
`

export const GuessTokens = styled.div<{ width?: number }>`
  min-width: ${({ width }) => width}px;
  display: flex;
  flex-direction: column;
  gap: 3px;
`
