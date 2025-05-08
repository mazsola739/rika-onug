import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { glowingBlue, glowingGreen, glowingLightBlue, glowingOrange, glowingPurple, glowingRed, glowingVibrantPink } from 'styles'
import { StyledTokenProps } from './Token.types'

export const StyledToken = styled.div<StyledTokenProps>`
  /* Box Model */
  border-radius: 50%;
  border: ${({ isSelected, isSelectable }) => {
    if (isSelected) {
      return '3px solid yellow'
    }
    if (isSelectable) {
      return '3px solid green'
    }
    return '3px solid transparent'
  }};

  /* Flexbox/Grid */
  display: flex;

  /* Visuals */
  filter: drop-shadow(3px 3px 3px black);

  /* Animation/Transition */
  ${({ aliens, cow, current, dreamwolf, evilometer, groobzerb, lovers, masons, part_of_blob, part_of_family, vampires, werewolf, witness }) => {
    if (masons || evilometer) {
      return css`
        animation: ${glowingBlue} 0.8s ease-in-out infinite alternate;
      `
    }
    if (aliens || groobzerb || part_of_blob) {
      return css`
        animation: ${glowingGreen} 0.8s ease-in-out infinite alternate;
      `
    }
    if (current || part_of_family) {
      return css`
        animation: ${glowingLightBlue} 0.8s ease-in-out infinite alternate;
      `
    }
    if (cow || witness) {
      return css`
        animation: ${glowingOrange} 0.8s ease-in-out infinite alternate;
      `
    }
    if (vampires) {
      return css`
        animation: ${glowingPurple} 0.8s ease-in-out infinite alternate;
      `
    }
    if (werewolf) {
      return css`
        animation: ${glowingRed} 0.8s ease-in-out infinite alternate;
      `
    }
    if (dreamwolf || lovers) {
      return css`
        animation: ${glowingVibrantPink} 0.8s ease-in-out infinite alternate;
      `
    }
    return null
  }}
`
