import styled from '@emotion/styled'
import { ReadyType } from './ReadyList.types'

export const StyledReadyList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 5px;
  max-width: calc(100vw - 300px);
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
