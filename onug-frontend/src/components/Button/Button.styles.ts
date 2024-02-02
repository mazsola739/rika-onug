import styled from '@emotion/styled'
import { StyledButtonProps } from './Button.types'

type ColorVariant = keyof typeof colorVariants
const colorVariants = {
  default: '#ffea00',
  red: '#f44336',
  magenta: '#ff00ff',
  purple: '#8e44ad',
  green: '#28a745',
  blue: '#007bff',
  crimson: '#dc3545',
  orange: '#ff9800',
}

export const StyledButton = styled.button<StyledButtonProps>`
  background-color: ${({ variant }) =>
    colorVariants[variant as ColorVariant] || colorVariants.default};
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  font-family: 'Josefin Sans', sans-serif;
  font-weight: 500;
  padding: 0;
  padding-top: 2px;
  width: 130px;
  height: 35px;
  transition: 2s;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:hover:not(:disabled) {
    transition: 2s;
    background-color: ${({ variant }) =>
      lightenDarkenColor(
        colorVariants[variant as ColorVariant] || colorVariants.default,
        -50
      )};
  }
`

const lightenDarkenColor = (color: string, amount: number) => {
  const hex = color.replace('#', '')
  const rgb = parseInt(hex, 16)

  let r = (rgb >> 16) + amount
  let g = ((rgb >> 8) & 0xff) + amount
  let b = (rgb & 0xff) + amount

  r = Math.min(255, Math.max(0, r))
  g = Math.min(255, Math.max(0, g))
  b = Math.min(255, Math.max(0, b))

  const newHex = ((r << 16) + (g << 8) + b).toString(16)
  const newColor = `#${newHex.padStart(6, '0')}`
  return newColor
}
