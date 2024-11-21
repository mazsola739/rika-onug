import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { glowingGreen, glowingVibrantPink } from 'styles'
import { StyledTokenProps } from './Token.types'

export const StyledToken = styled.div<StyledTokenProps>`
  display: flex;
  border-radius: 50%;
  border: ${({ isSelected }) => (isSelected ? '3px solid red' : '3px solid transparent')};
  filter: drop-shadow(3px 3px 3px black);

  ${({ isSelectable, lovers }) => {
    if (isSelectable) {
      return css`
        animation: ${glowingGreen} 0.8s ease-in-out infinite alternate;
      `
    }
    if (lovers) {
      return css`
        animation: ${glowingVibrantPink} 0.8s ease-in-out infinite alternate;
      `
    }
    return null
  }}
`
