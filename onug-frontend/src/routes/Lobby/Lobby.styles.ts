import styled from '@emotion/styled'
import { StyledLobbyProps } from './Lobby.types'

export const StyledLobby = styled.div`
  background-color: transparent;
  display: grid;
  grid-template-columns: repeat(3, 180px);
  grid-template-rows: repeat(4, 120px);
  gap: 16px;
  margin: auto;
  height: 100%;
  align-items: center;
  justify-items: center;
  justify-content: center;
  align-content: center;
`

export const StyledRoomButton = styled.button<StyledLobbyProps>`
  background: ${({ index }) => generatePastelRainbowColor(index)};
  color: black;
  font-family: 'Josefin Sans', sans-serif;
  text-transform: uppercase;
  font-size: 16px;
  width: 150px;
  height: 100px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background: ${({ index }) => darken(generatePastelRainbowColor(index), 15)};
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

const generatePastelRainbowColor = (index: number) => {
  const hues = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]
  const lightness = 70
  const hue = hues[index % hues.length]
  return `hsl(${hue}, 100%, ${lightness}%)`
}
