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
  yellow: '#FFFF00'
}

export const StyledButton = styled.button<StyledButtonProps>`
  background-color: ${({ variant }) => colorVariants[variant as ColorVariant] || colorVariants.default};
  border-radius: 5px;
  cursor: pointer;
  padding: 2px 0 0 0;
  width: ${({ size }) => size ? size : 130}px;
  height: ${({ size }) => size ? size : 35}px;
  transition: 0.75s;
  filter: drop-shadow(3px 3px 3px black);
  font-size: 12px;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:hover:not(:disabled) {
    transition: 0.75s;
    background-color: ${({ variant }) => lightenDarkenColor(colorVariants[variant as ColorVariant] || colorVariants.default, -50)};
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
