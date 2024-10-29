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
  grid-template-columns: 170px calc(100vw - 740px) 170px 400px;
  grid-template-rows: 80px 130px calc(100vh - 460px) 250px;

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
  & > div:nth-of-type(4) {
    grid-area: 1 / 4 / 5 / 5;
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
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5px;
`

//FOOTER
export const StyledGameFooter = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  & > :first-of-type {
    grid-column: 2;
  }
  padding-bottom: 10px;
`

export const Tokens = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

//INFOPANEL

export const Placeholder = styled.div`
  min-height: 300px;
`

export const StyledInterAction = styled.div`
  display: flex;
  min-height: 300px;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 20px;
/*   box-shadow: 0px 0px 50px 0px rgba(255,255,0,0.9); */
  padding: 10px;
`

export const Narration = styled.span`
  color: white;
`

export const Message = styled.p`
  color: white;
`
