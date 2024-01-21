import styled from '@emotion/styled'

//MAIN
export const StyledGameTable = styled.main`
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  gap: 5px;
  background-color: transparent;
  position: absolute;
  top: 120px;
  bottom: 90px;
  left: 0px;
  right: 0px;
  overflow-y: auto;
  overflow-x: hidden;
`

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
`

export const CenterCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: flex-end;
`

export const CardTitle = styled.div``

export const Shield = styled.img`
  width: 50px;
  height: 50px;
`

export const PlayersCards = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  width: 90px;
  height: 120px;
  gap: 10px;
`

export const CenterCards = styled.div`
  display: flex;
  flex-direction: row;
`

export const Marks = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`

//HEADER

export const StyledGameTableHeader = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  font-family: 'Josefin Sans', sans-serif;
`

export const PlayerInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  width: 100px;
`

export const PlayerAvatar = styled.img`
  width: 50px;
  height: 50px;
`

export const PlayerName = styled.span`
  padding-left: 10px;
  margin: auto 0;
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
