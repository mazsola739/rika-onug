import styled from '@emotion/styled'

export const StyledTokenImage = styled.img<{ size: number; ready: boolean }>`
  /* Box Model */
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;

  /* Visuals */
  opacity: ${({ ready }) => (ready ? 1 : 0.5)};
`
