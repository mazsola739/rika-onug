import styled from '@emotion/styled'
import { StyledTokenProps } from './Token.types'

export const StyledToken = styled.img<StyledTokenProps>`
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  opacity: ${({ ready }) => (ready ? 0.6 : 1)};
`
