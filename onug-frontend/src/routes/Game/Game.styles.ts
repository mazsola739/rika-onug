import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { GameProps } from './Game.types'

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

//GAME
export const StyledGame = styled.div<GameProps>`
  animation: ${({ animate }) => (animate ? darkenBackground : 'none')} 3s
    forwards;

  > header {
    > div {
      > img:first-of-type {
        animation: ${({ animate }) => (animate ? fadeOutSun : 'none')} 3s
          forwards;
      }

      > img:nth-of-type(2) {
        animation: ${({ animate }) => (animate ? fadeInMoon : 'none')} 3s
          forwards;
      }

      > span {
        animation: ${({ animate }) => (animate ? fadeInMoon : 'none')} 3s
          forwards;
      }
    }
  }

  min-width: 100%;
  display: grid;
  grid-template-columns: 170px calc(100vw - 340px) 170px;
  grid-template-rows: 80px 170px calc(100vh - 470px) 220px;

  header {
    grid-area: 1 / 1 / 2 / 4;
  }
  & > div:nth-of-type(1) {
    grid-area: 2 / 1 / 5 / 2;
  }
  & > div:nth-of-type(2) {
    grid-area: 2 / 2 / 3 / 3;
  }
  & > div:nth-of-type(3) {
    grid-area: 2 / 3 / 5 / 4;
  }
  main {
    grid-area: 3 / 2 / 4 / 3;
  }
  footer {
    grid-area: 4 / 2 / 5 / 3;
  }
`

//HEADER
export const StyledGameHeader = styled.div`
  display: flex;
  flex-direction: row;
  color: white;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 100%;
  width: 100%;
`

export const Sun = styled.img`
  border-radius: 50%;
  box-shadow: 0 0 60px 10px #fff, 0 0 100px 20px red, 0 0 140px 30px gold;
  width: 35px;
  height: 35px;
  position: absolute;
  top: 15%;
  opacity: 1;
`

export const Moon = styled.img`
  border-radius: 50%;
  box-shadow: 0 0 60px 10px #000, 0 0 100px 20px blue, 0 0 140px 30px silver;
  width: 35px;
  height: 35px;
  position: absolute;
  top: 15%;
  opacity: 0;
`

export const Text = styled.span`
  color: white;
  position: absolute;
  opacity: 0;
  bottom: 10%;
`

//MAIN
export const TableCenter = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
`

//FOOTER
export const StyledGameFooter = styled.div`
  display: grid;
  grid-template-columns: 1fr 140px 1fr;
  grid-template-rows: 1fr;
  align-items: center;
  justify-items: stretch;
  gap: 10px;
`

export const PlayerInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: flex-end;
`

export const Player = styled.span`
  color: white;
  font-size: 24px;
  display: inline-flex;
  gap: 5px;
  align-items: center;
`

export const Tokens = styled.div`
  display: flex;
`

export const GameContainer = styled.div`
  display: flex;
  flex-direction: row;
`
