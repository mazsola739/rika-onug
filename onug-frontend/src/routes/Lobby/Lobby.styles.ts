import styled from '@emotion/styled'
import { StyledLobbyProps } from './Lobby.types'

export const StyledLobby = styled.div`
  height: 100%;
  margin: auto;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 150px);
  grid-template-rows: repeat(3, 150px);
  gap: 0.3125rem;
  justify-items: center;
  align-items: center;
  justify-content: center;
  align-content: center;
`

export const StyledLobbyButton = styled.button<StyledLobbyProps>`
  background: ${({ img }) => `url(/assets/rooms/${img}.webp)`} center center/cover no-repeat;
  border-radius: 50%;
  text-shadow: 0.125rem 0.125rem 0.125rem black;
  cursor: pointer;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 900;
  height: 8.75rem;
  width: 8.75rem;
  &:hover {
    transition: 0.75s;
    filter: drop-shadow(0.5rem 0.3125rem 0.3125rem black);
  }
`
