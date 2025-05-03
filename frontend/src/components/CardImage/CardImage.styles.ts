import styled from '@emotion/styled'

export const StyledCardImage = styled.img<{ size: number }>`
  width: ${({ size }) => size}px;
`
