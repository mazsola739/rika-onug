import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { GameProps } from './Game.types'

//NIGHTMODE
const fadeOutSun = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`

const fadeInMoon = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const darkenBackground = keyframes`
  from { background-color: transparent; }
  to { background-color: rgba(0, 0, 0, 0.65); }
`

//DAYMODE
const fadeInSun = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const fadeOutMoon = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`

const lightenBackground = keyframes`
  from { background-color: rgba(0, 0, 0, 0.65); }
  to { background-color: transparent; }
`

//GAME //TODO set 1s to desired long sun rise or night fall!!!!
export const StyledGame = styled.div<GameProps>`
  animation: ${({ nightfall, sunrise }) => (nightfall && !sunrise ? darkenBackground : lightenBackground)} 1s forwards;

  > header {
    > div {
      > img:first-of-type {
        animation: ${({ nightfall, sunrise }) => (nightfall && !sunrise ? fadeOutSun : fadeInSun)} 1s forwards;
      }

      > img:nth-of-type(2) {
        animation: ${({ nightfall, sunrise }) => (nightfall && !sunrise ? fadeInMoon : fadeOutMoon)} 1s forwards;
      }

      > span:first-of-type {
        animation: ${({ nightfall, sunrise }) => (nightfall && !sunrise ? fadeInMoon : fadeOutMoon)} 1s forwards;
      }

      > span:nth-of-type(2) {
        animation: ${({ nightfall, sunrise }) => (nightfall && !sunrise ? fadeOutSun : fadeInSun)} 1s forwards;
      }
    }
  }

  display: grid;
 grid-template-columns: 150px 1fr 150px 360px;
  grid-template-rows: 70px 200px calc(100vh - 340px) 70px;;

  header {
    grid-area: 1 / 1 / 2 / 4;
  }
  & > div:nth-of-type(1) {
    grid-area: 2 / 1 / 4 / 2;
  }
  & > div:nth-of-type(2) {
    grid-area: 2 / 2 / 3 / 3;
  }
  & > div:nth-of-type(3) {
    grid-area: 2 / 3 / 4 / 4;
  }
  & > div:nth-of-type(4) {
    grid-area: 1 / 4 / 5 / 5;
  }
  main {
    grid-area: 3 / 2 / 4 / 3;
  }
  footer {
    grid-area: 4 / 1 / 4 / 4;
  }
`

//HEADER

//MAIN
export const GameCenter = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

//FOOTER

//INFOPANEL
