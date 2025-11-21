import styled from '@emotion/styled'
import { buttonColorVariants, ColorVariant } from 'types'
import { lightenDarkenColor } from 'utils'
import { StyledButtonProps } from './Button.types'

export const StyledButton = styled.button<StyledButtonProps>`
  background-color: ${({ variant }) => buttonColorVariants[variant as ColorVariant] || buttonColorVariants.default};
  border-radius: 5px;
  cursor: pointer;
  padding: 2px 0 0 0;
  width: ${({ size }) => (size ? size : 130)}px;
  height: ${({ size }) => (size ? size : 35)}px;
  transition: 0.75s;
  filter: drop-shadow(3px 3px 3px black);
  font-size: 12px;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:hover:not(:disabled) {
    transition: 0.75s;
    background-color: ${({ variant }) => lightenDarkenColor(buttonColorVariants[variant as ColorVariant] || buttonColorVariants.default, -50)};
  }
`
