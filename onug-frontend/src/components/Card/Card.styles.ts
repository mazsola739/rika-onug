import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { glowingBlue, glowingGreen, glowingPurple, glowingRed, glowingVibrantPink } from 'styles'
import { StyledCardProps } from './Card.types'

export const StyledCard = styled.div<StyledCardProps>`
  border-radius: 0.625rem;
  display: flex;
  filter: drop-shadow(0.1875rem 0.1875rem 0.1875rem black);
  border: 5px solid transparent;

  ${({ werewolf, dreamwolf, masons, aliens, vampires, isSelectable }) => {
    if (isSelectable || aliens) {
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
    if (vampires) {
      return css`
        animation: ${glowingPurple} 0.8s ease-in-out infinite alternate;
      `
    }
    return null
  }}
`
