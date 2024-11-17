import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { StyledCardProps } from './Card.types'
import { glowingGreen, glowingVibrantPink, glowingRed, glowingBlue } from 'styles'

export const StyledCard = styled.div<StyledCardProps>`
  border-radius: 10px;
  display: flex;
  filter: drop-shadow(3px 3px 3px black);
  border: 5px solid transparent;

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
