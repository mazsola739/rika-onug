import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { StyledGlowingBorderProps } from './GlowingBorder.types'

const rotate = keyframes`
  100% {
    transform: translate(-50%, -50%) rotate(1turn);
  }
`

export const OuterGlow = styled.div<StyledGlowingBorderProps>`
    width: ${({ sizeW }) => sizeW+10}px;
    height: ${({ sizeH }) => sizeH+10}px;

    position: absolute;
    overflow: hidden; 
    z-index: 0;
    border-radius: ${({ radius }) => radius || '15px'};

    filter: blur(20px);

  &::before {
    content: '';
    z-index: -2;
    position: absolute;
    text-align: center;
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
    width: ${({ sizeW }) => sizeW+10}px;
    height: ${({ sizeH }) => sizeH+10}px;

    position: absolute;
    overflow: hidden; 
    z-index: 0;
    border-radius: ${({ radius }) => radius || '15px'};

  &::before {
    content: '';
    z-index: -2;
    position: absolute;
    text-align: center;
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

  & > img {
    position: absolute;
    left: 5px;
    top: 5px;
  }
`

export const StyledGlowingBorder = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`
