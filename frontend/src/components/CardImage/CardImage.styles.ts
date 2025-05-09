import styled from '@emotion/styled'
import { StyledCardImageProps } from './CardImage.types'

export const StyledCardImage = styled.img<StyledCardImageProps>`
  /* Box Model */
  width: ${({ size }) => size}px;
`
