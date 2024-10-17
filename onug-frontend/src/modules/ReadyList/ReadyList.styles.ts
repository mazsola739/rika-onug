import styled from 'styled-components'
import { ReadyType } from './ReadyList.types'

export const StyledReadyList = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  border: 1px solid black;
  border-radius: 4px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 300px;
  max-height: 355px;
`

export const Player = styled.div`
  align-items: center;
  display: flex;
  font-family: 'Josefin Sans', sans-serif;
  color: white;
  flex-direction: row;
  gap: 5px;
`

export const PlayerReadyName = styled.span<ReadyType>`
  color: ${({ ready }) => (ready ? 'white' : 'rgba(255, 255, 255, 0.6)')};
  opacity: ${({ ready }) => (ready ? 1 : 0.6)};
`
