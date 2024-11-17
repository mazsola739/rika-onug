import styled from '@emotion/styled'

export const StyledReadyStatus = styled.div`
  display: flex;
  flex-direction: column;
`

export const ReadyPlayerList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(6, auto);
  gap: 0.3125rem;
  border-bottom: 0.125rem solid #969290;
  padding-bottom: 0.3125rem;
`

export const StyledReadyPlayer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: 0.3125rem;
`

export const Ready = styled.span<{ ready: boolean }>`
  color: ${({ ready }) => (ready ? 'white' : 'rgba(255, 255, 255, 0.6)')};
  opacity: ${({ ready }) => (ready ? 1 : 0.6)};
  font-size: 0.875rem;
`
