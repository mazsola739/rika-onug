import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { glowingGreen, glowingVibrantPink } from 'styles'
import { StyledTokenProps } from './Token.types'

export const StyledToken = styled.div<StyledTokenProps>`
  display: flex;
  border-radius: 50%;
    border: ${({ isSelected, isSelectable }) => {
    if (isSelected) {
      return '5px solid yellow'
    }
    if (isSelectable) {
      return '5px solid green'
    }
    return '5px solid transparent'
  }};
  filter: drop-shadow(3px 3px 3px black);

  ${({ lovers }) => {
    if (lovers) {
      return css`
        animation: ${glowingVibrantPink} 0.8s ease-in-out infinite alternate;
      `
    }
    return null
  }}
`
