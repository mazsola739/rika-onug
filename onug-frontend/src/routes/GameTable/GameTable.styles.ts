import styled from '@emotion/styled'
import { ReadyType } from './GameTable.types'

//MAIN
export const StyledGameTable = styled.main`
  display: flex;
  flex-direction: row;
  gap: 5px;
  justify-content: center;
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  bottom: 90px;
  top: 120px;
  width: 100%;
`

export const OwnKnownCardContainer = styled.div`
  align-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 5px;
  border: 1px solid black;
  border-radius: 4px;
  padding: 10px;
  justify-content: flex-end;
  max-height: 200px;
  margin: 20px;
`

export const OwnKnownCardText = styled.span`
  font-family: 'Josefin Sans', sans-serif;
  color: #bfefff;
`

export const OwnKnownCardImage = styled.img`
  width: 120px;
`

export const Players = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 280px;
  max-height: 355px;
  margin: 20px;
`

export const Player = styled.div`
  align-items: center;
  display: flex;
  font-family: 'Josefin Sans', sans-serif;
  color: #bfefff;
  flex-direction: row;
  gap: 5px;
`

export const PlayerReadyNumber = styled.img<ReadyType>`
  height: 25px;
  width: 25px;
  opacity: ${({ ready }) => (ready ? 0.6 : 1)};
`

export const PlayerReadyName = styled.span<ReadyType>`
  color: ${({ ready }) => (ready ? 'white' : 'rgba(255, 255, 255, 0.6)')};
  opacity: ${({ ready }) => (ready ? 1 : 0.6)};
`

export const CardContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

export const CenterCardContainer = styled.div`
  align-items: flex-end;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
`

export const CardTitle = styled.div`
  color: #bfefff;
  font-family: 'Josefin Sans', sans-serif;
`

export const Shield = styled.img`
  height: 70px;
  width: 70px;
`

export const PlayersCards = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: center;
  width: 100%;
`

export const CenterCards = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2px;
`

export const Marks = styled.div`
  align-content: flex-start;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  max-width: 130px;
`

//HEADER
export const StyledGameTableHeader = styled.div`
  display: flex;
  font-family: 'Josefin Sans', sans-serif;
  color: #bfefff;
  height: 100%;
  justify-content: flex-start;
`

export const PlayerInfo = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  width: 100px;
  padding: 10px;
  align-items: center;
`

export const PlayerAvatar = styled.img`
  height: 50px;
  width: 50px;
`

export const PlayerName = styled.span`
  margin: auto 0;
  text-align: left;
  color: #bfefff;
`

export const PlayerCardInformation = styled.div`
  display: flex;
  flex-direction: row;
`

export const PlayerCard = styled.img`
  width: 100px;
`

export const PlayerCardRule = styled.span`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-left: 10px;
  padding-top: 10px;
  text-align: start;
`

//FOOTER
export const GameTableFooter = styled.div``
