import styled from '@emotion/styled'
import { ReadyProps } from './ReadyStatus.types'

export const StyledReadyStatus = styled.div`
  /* Flexbox/Grid */
  display: flex;
  flex-direction: column;
`

export const ReadyPlayerList = styled.div`
  /* Box Model */
  border-bottom: 2px solid #969290;
  padding: 5px 0;

  /* Flexbox/Grid */
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(6, auto);
  gap: 5px;
`

export const StyledReadyPlayer = styled.div`
  /* Flexbox/Grid */
  display: flex;
  align-items: center;
  gap: 5px;
`

export const Ready = styled.span<ReadyProps>`
  /* Typography */
  color: ${({ ready }) => (ready ? 'white' : 'rgba(255, 255, 255, 0.6)')};
  font-size: 12px;

  /* Visuals */
  opacity: ${({ ready }) => (ready ? 1 : 0.6)};
`
