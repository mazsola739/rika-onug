import styled from 'styled-components'
import { StyledDealtTokenProps } from './DealtToken.types'

export const StyledDealtToken = styled.img<StyledDealtTokenProps>`
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  opacity: ${({ ready }) => (ready ? 0.6 : 1)};
  filter: drop-shadow(1px 1px 1px black);
`
