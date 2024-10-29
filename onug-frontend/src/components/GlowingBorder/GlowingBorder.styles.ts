import { keyframes } from "@emotion/react"
import styled from "@emotion/styled"

const rotate = keyframes`
  100% {
    transform: translate(-50%, -50%) rotate(1turn);
  }
`

export const OuterGlow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
  filter: blur(20px);
  z-index: 0;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(0deg);
    width: 400%; /* Large enough for conic gradient */
    height: 400%;
    background-image: conic-gradient(rgba(0, 0, 0, 0), #1976ed, rgba(0, 0, 0, 0) 25%);
    animation: ${rotate} 4s linear infinite;
  }
`

export const InnerContainer = styled.div`
  position: relative;
  width: 250px; /* Adjust as needed */
  height: 200px; /* Adjust as needed */
  background: #292a2e;
  border-radius: 10px;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: '';
    position: absolute;
    top: 5px;
    left: 5px;
    width: calc(100% - 10px);
    height: calc(100% - 10px);
    background: #292a2e;
    border-radius: 7px;
    z-index: -1;
  }
`


export const StyledGlowingBorder = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`