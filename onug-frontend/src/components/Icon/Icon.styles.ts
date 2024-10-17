import styled from 'styled-components'
import { StyledIconProps } from './Icon.types'

export const StyledIcon = styled.svg<StyledIconProps>`
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;

  fill: currentColor;
`
