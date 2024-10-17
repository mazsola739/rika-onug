import styled from 'styled-components'
import { StyledCardImageProps } from './CardImage.types'

export const StyledCardImage = styled.img<StyledCardImageProps>`
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
`
