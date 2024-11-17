import styled from '@emotion/styled'

export const StyledReadyStatus = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
`

export const ReadyTitle = styled.h3`
  color: yellow;
  padding: 0;
  margin: 0;
  padding: 10px 0;
  text-align: center;
`

export const ReadyPlayerList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(6, auto);
  gap: 5px;
  min-width: 100%;
  border-bottom: 2px solid #969290;
  padding-bottom: 5px;
`

export const StyledReadyPlayer = styled.div`
  align-items: center;
  display: flex;
  color: white;
  flex-direction: row;
  gap: 5px;
`

export const Ready = styled.span<{ ready: boolean }>`
  color: ${({ ready }) => (ready ? 'white' : 'rgba(255, 255, 255, 0.6)')};
  opacity: ${({ ready }) => (ready ? 1 : 0.6)};
  font-size: 14px;
`
