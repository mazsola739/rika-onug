import styled from '@emotion/styled'
import { StyledLobbyProps } from './Lobby.types'

export const StyledLobby = styled.div`
  height: 100%;
  margin: auto;
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const StyledRoomButton = styled.button<StyledLobbyProps>`
  background: ${({ index }) => generateRainbowColor(index)};
  border: 5px solid ${({ index }) => generateRainbowColor(index)};
  border-radius: 50%;
  color: black;
  cursor: pointer;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 14px;
  font-weight: 900;
  height: 120px;
  position: absolute;
  text-transform: uppercase;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%)
    rotate(${({ index }) => index * (360 / 12)}deg) translate(250px)
    rotate(-${({ index }) => index * (360 / 12)}deg);

  width: 120px;
  transition: 0.75s;

  &:hover {
    transition: 0.75s;
    background: ${({ index }) => darken(generateRainbowColor(index), 15)};
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
  const hues = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]
  const lightness = 55
  const hue = hues[index % hues.length]
  return `hsl(${hue}, 100%, ${lightness}%)`
}
