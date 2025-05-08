import styled from '@emotion/styled'
import { StyledIconProps } from './Icon.types'

export const StyledIcon = styled.svg<StyledIconProps>`
  /* Box Model */
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;

  /* Visuals */
  fill: currentColor;
`
