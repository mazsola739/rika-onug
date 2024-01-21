import styled from '@emotion/styled'
import { ReadyType } from './GameTable.types'

//MAIN
export const StyledGameTable = styled.main`
  align-content: center;
  align-items: center;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  gap: 5px;
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  bottom: 90px;
  left: 0px;
  right: 0px;
  top: 120px;
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
  flex-direction: row;
  gap: 5px;
`

export const PlayerReadyNumber = styled.img<ReadyType>`
  height: 25px;
  width: 25px;
  ${({ ready }) =>
    ready
      ? `
        opacity: 0.6;
      `
      : `
        opacity: 0.6;
      `}
`

export const PlayerReadyName = styled.span<ReadyType>`
  ${({ ready }) =>
    ready
      ? `
        color: black;
      `
      : `
        color: black;
        opacity: 0.6;
      `}
`

export const CardContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`

export const CenterCardContainer = styled.div`
  align-items: flex-end;
  display: flex;
  flex-direction: row;
  gap: 5px;
`

export const CardTitle = styled.div``

export const Shield = styled.img`
  height: 50px;
  width: 50px;
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

export const CenterCards = styled.div`
  display: flex;
  flex-direction: row;
`

export const Marks = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding: 10px;
`

//HEADER
export const StyledGameTableHeader = styled.div`
  display: flex;
  font-family: 'Josefin Sans', sans-serif;
  height: 100%;
  justify-content: flex-start;
`

export const PlayerInfo = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  width: 100px;
`

export const PlayerAvatar = styled.img`
  height: 50px;
  width: 50px;
`

export const PlayerName = styled.span`
  margin: auto 0;
  text-align: left;
`

export const PlayerCardInformation = styled.div`
  display: flex;
  flex-direction: row;
`

export const PlayerCard = styled.img`
  width: 100px;
`

export const PlayerCardRule = styled.span`
  padding-left: 10px;
  padding-top: 10px;
`

//FOOTER

export const GameTableFooter = styled.div``
