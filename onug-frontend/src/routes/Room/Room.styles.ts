import styled from '@emotion/styled'

//MAIN
export const StyledRoom = styled.main`
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  gap: 5px;
  background-color: transparent;
  position: absolute;
  top: 170px;
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
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
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

export const StyledRoomHeader = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: 'Josefin Sans', sans-serif;
`

export const CardInformation = styled.div`
  display: flex;
  flex-direction: row;
`

export const YourCard = styled.img`
  width: 100px;
`

export const YourCardRule = styled.span`
  padding-left: 10px;
  padding-top: 10px;
`

export const Player = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-family: 'Josefin Sans', sans-serif;
`

export const PlayerInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 60px;
`

export const YourAvatar = styled.img`
  width: 40px;
  height: 40px;
`

export const YourName = styled.span`
  padding-left: 10px;
  margin: auto 0;
`

//FOOTER

export const RoomFooter = styled.div``

export const Messages = styled.div``
