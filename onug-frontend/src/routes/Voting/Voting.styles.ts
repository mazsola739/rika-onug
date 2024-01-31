import styled from '@emotion/styled'

export const Main = styled.main`
  background-color: transparent;
  bottom: 90px;
  display: flex;
  flex-direction: column;
  left: 130px;
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  left: 0px;
  top: 120px;
  width: 100%;
`

export const Players = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: fixed;
  right: 0;
  top: 245px;
  width: 280px;
`

export const Player = styled.div`
  align-items: center;
  display: flex;
  font-family: 'Josefin Sans', sans-serif;
  color: #bfefff;
  flex-direction: row;
  gap: 5px;
`

export const PlayerNumber = styled.img`
  height: 25px;
  width: 25px;
`

export const PlayerName = styled.span`
  font-family: 'Josefin Sans', sans-serif;
  color: #bfefff;
`

export const CardContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`

export const PlayersCards = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  height: 120px;
  width: 100%;
`
