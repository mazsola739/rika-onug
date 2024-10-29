import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { StyledGlowingBorderProps } from './GlowingBorder.types'

const rotate = keyframes`
  100% {
    transform: translate(-50%, -50%) rotate(1turn);
  }
`

export const OuterGlow = styled.div<StyledGlowingBorderProps>`
  position: absolute;
  overflow: hidden;
  border-radius: ${({ radius }) => radius || '15px'};
  z-index: 0;
  filter: blur(20px);

  &::before {
    content: '';
    z-index: -2;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(0deg);
    width: 99999px;
    height: 99999px;
    background-repeat: no-repeat;
    background-position: 0 0;
    background-image: ${({ glowColor }) => `
      conic-gradient(rgba(0, 0, 0, 0), ${glowColor || '#1976ed'}, rgba(0, 0, 0, 0) 25%)`};
    animation: ${rotate} 4s linear infinite;
  }
`

export const InnerContainer = styled.div<StyledGlowingBorderProps>`
  position: absolute;
  overflow: hidden;
  border-radius: ${({ radius }) => radius || '15px'};
  z-index: 0;

  &::before {
    content: '';
    z-index: -2;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(0deg);
    width: 99999px;
    height: 99999px;
    background-repeat: no-repeat;
    background-position: 0 0;
    background-image: ${({ glowColor }) => `
      conic-gradient(rgba(0, 0, 0, 0), ${glowColor || '#1976ed'}, rgba(0, 0, 0, 0) 25%)`};
    animation: ${rotate} 4s linear infinite;
  }

  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    left: 5px;
    top: 5px;
    width: calc(100% - 10px);
    height: calc(100% - 10px);
    background: #292a2e;
    border-radius: ${({ radius }) => radius || '15px'};
  }
`

export const StyledGlowingBorder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40%;
`
