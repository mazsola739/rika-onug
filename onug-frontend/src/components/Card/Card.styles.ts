import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { StyledCardProps } from './Card.types'
import { glowingGreen, glowingVibrantPink, glowingRed, glowingBlue } from 'styles'

export const StyledCard = styled.div<StyledCardProps>`
  border-radius: 0.625rem;
  display: flex;
  filter: drop-shadow(0.1875rem 0.1875rem 0.1875rem black);
  border: 0.3125rem solid transparent;

  ${({ werewolf, dreamwolf, masons, isSelectable }) => {
    if (isSelectable) {
      return css`
        animation: ${glowingGreen} 0.8s ease-in-out infinite alternate;
      `
    }
    if (dreamwolf) {
      return css`
        animation: ${glowingVibrantPink} 0.8s ease-in-out infinite alternate;
      `
    }
    if (werewolf) {
      return css`
        animation: ${glowingRed} 0.8s ease-in-out infinite alternate;
      `
    }
    if (masons) {
      return css`
        animation: ${glowingBlue} 0.8s ease-in-out infinite alternate;
      `
    }
    return null
  }}
`
