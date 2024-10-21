import styled from '@emotion/styled'
import { ReadyType } from './ReadyList.types'

export const StyledReadyList = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(4, calc( calc(100vw  - 420px) / 4));
  gap: 5px;
  grid-auto-flow: column;
`

export const Player = styled.div`
  align-items: center;
  display: flex;
  color: white;
  flex-direction: row;
  gap: 5px;
`

export const PlayerReadyName = styled.span<ReadyType>`
  color: ${({ ready }) => (ready ? 'white' : 'rgba(255, 255, 255, 0.6)')};
  opacity: ${({ ready }) => (ready ? 1 : 0.6)};
`
