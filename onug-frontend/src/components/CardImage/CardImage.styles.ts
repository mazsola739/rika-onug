import styled from '@emotion/styled'
import { StyledCardImageProps } from './CardImage.types'

export const StyledCardImage = styled.img<StyledCardImageProps>`
  width: ${({ size }) => size}px;
`
