import styled from '@emotion/styled'

export const StyledCardImage = styled.img<{ size: number }>`
  /* Box Model */
  width: ${({ size }) => size}px;
`
