import styled from '@emotion/styled'

export const StyledTokenImage = styled.img<{ size: number; ready: boolean }>`
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  opacity: ${({ ready }) => (ready ? 1 : 0.4)};
`
