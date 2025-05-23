import styled from '@emotion/styled'
import { StyledRoleImageProps } from './RoleImage.types'

export const StyledRoleImage = styled.img<StyledRoleImageProps>`
  /* Box Model */
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
`
