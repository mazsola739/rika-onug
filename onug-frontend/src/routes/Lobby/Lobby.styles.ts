import styled from '@emotion/styled'
import { StyledLobbyProps } from './Lobby.types'

export const StyledLobby = styled.div`
  height: 100%;
  margin: auto;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 5px;
  justify-items: center;
  align-items: center;
`

export const StyledRoomButton = styled.button<StyledLobbyProps>`

  background: ${({ img }) => `url(/assets/rooms/${img}.png)`} center center/cover no-repeat;
  border-radius: 50%;
  color: white;
  text-shadow: 2px 2px 2px black;
  cursor: pointer;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 14px;
  font-weight: 900;
  height: 140px;
  width: 140px;
  &:hover {
    transition: 0.75s;
    filter: drop-shadow(8px 5px 5px black);
  }
`

const darken = (color: string, amount: number): string => {
  const match = color.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/)

  if (!match) {
    return color
  }

  const [, hue, saturation, lightness] = match.map(Number)
  const newLightness = Math.max(0, lightness - amount)

  return `hsl(${hue}, ${saturation}%, ${newLightness}%)`
}

const generateRainbowColor = (index: number) => {
  const hues = [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340]
  const lightness = 55
  const hue = hues[index % hues.length]
  return `hsl(${hue}, 100%, ${lightness}%)`
}
