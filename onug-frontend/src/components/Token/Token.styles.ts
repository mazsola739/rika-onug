import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { glowingBlue, glowingGreen, glowingOrange, glowingPurple, glowingRed, glowingVibrantPink, glowingLightBlue } from 'styles'
import { StyledTokenProps } from './Token.types'

export const StyledToken = styled.div<StyledTokenProps>`
  display: flex;
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
  filter: drop-shadow(3px 3px 3px black);
  ${({ werewolf, dreamwolf, masons, aliens, vampires, groobzerb, cow, lovers, part_of_blob, part_of_family }) => {
    if (aliens || groobzerb || part_of_blob) {
      return css`
        animation: ${glowingGreen} 0.8s ease-in-out infinite alternate;
      `
    }
    if (dreamwolf || lovers) {
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
    if (part_of_family) {
      return css`
        animation: ${glowingLightBlue} 0.8s ease-in-out infinite alternate;
      `
    }
    if (vampires) {
      return css`
        animation: ${glowingPurple} 0.8s ease-in-out infinite alternate;
      `
    }
    if (cow) {
      return css`
        animation: ${glowingOrange} 0.8s ease-in-out infinite alternate;
      `
    }
    return null
  }}
`
