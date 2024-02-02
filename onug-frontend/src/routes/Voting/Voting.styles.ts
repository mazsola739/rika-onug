import styled from '@emotion/styled'

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  left: 130px;
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
`

export const Players = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 280px;
`

export const Player = styled.div`
  align-items: center;
  display: flex;
  font-family: 'Josefin Sans', sans-serif;
  color: white;
  flex-direction: row;
  gap: 5px;
`

export const PlayerNumber = styled.img`
  height: 25px;
  width: 25px;
`

export const PlayerName = styled.span`
  font-family: 'Josefin Sans', sans-serif;
  color: white;
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
