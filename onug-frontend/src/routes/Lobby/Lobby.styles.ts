import styled from '@emotion/styled'
import { PropsNoName, StyledLobbyProps } from './Lobby.types'

export const StyledLobby = styled.div`
  background-color: transparent;
  position: relative;
  width: 100%;
  height: 100%;
  margin: auto;
`

export const StyledRoomButton = styled.button<StyledLobbyProps>`
  background: ${({ index }) => generateRainbowColor(index)};
  border: 5px solid ${({ index }) => generateRainbowColor(index)};
  color: black;
  font-family: 'Josefin Sans', sans-serif;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 900;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%)
    rotate(${({ index }) => index * (360 / 12)}deg) translate(250px)
    rotate(-${({ index }) => index * (360 / 12)}deg);
  transition: background-color 0.3s;

  &:hover {
    border: 5px solid ${({ index }) => darken(generateRainbowColor(index), 20)};
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

/* @media (max-width: 768px) {
  width: 100%;
  height: auto;
  border-radius: 10px;
  margin: 10px;
  transform: none;
  position: relative;
} */

export const Slaves = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'Josefin Sans', sans-serif;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 900;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
//every code need a lowphas :)
export const LowPhas = styled.div<PropsNoName>`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ color }) => color};
  font-size: 12px;
  font-weight: bold;
  color: black;
`
