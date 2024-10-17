import styled from '@emotion/styled'
import { VotedType } from './VotedList.types'

export const StyledVotedList = styled.div`
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

export const PlayerVotedName = styled.span<VotedType>`
  color: ${({ voted }) => (voted ? 'white' : 'rgba(255, 255, 255, 0.6)')};
  opacity: ${({ voted }) => (voted ? 1 : 0.6)};
`
