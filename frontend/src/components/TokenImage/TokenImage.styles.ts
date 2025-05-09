import styled from '@emotion/styled'
import { StyledTokenImageProps } from './TokenImage.types'

export const StyledTokenImage = styled.img<StyledTokenImageProps>`
  /* Box Model */
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;

  /* Visuals */
  opacity: ${({ ready }) => (ready ? 1 : 0.5)};
`
