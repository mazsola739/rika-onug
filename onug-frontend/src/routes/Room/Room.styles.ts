import styled from '@emotion/styled'

//ROOM
export const StyledRoom = styled.div`
  min-width: 100%;
  display: grid;
  grid-template-columns: 160px calc(100vw - 330px) 160px;
  grid-template-rows: 160px calc(100vh - 330px) 160px;

  nav {
    grid-area: 2 / 1 / 4 / 2;
  }
  header {
    grid-area: 1 / 1 / 2 / 4;
  }
  main {
     grid-area: 2 / 2 / 3 / 3;
  }
  footer {
    grid-area: 3 / 2 / 4 / 3;
  }
  fieldset {
     grid-area: 2 / 3 / 4 / 4;
  }
`

//FOOTER
export const StyledInfo  = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const RuleInfo = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  height: 75px;
`

export const RuleImage = styled.img`
  width: 75px;
  border: 1px solid yellow;
`

export const RuleInfoDescription = styled.p`
  color: yellow;
  font-size: 20px;
  margin: 0;
  padding: 5px;
  text-align: left;
  text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black;
`

export const StyledPlayerNames = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  color: white;
  font-size: 14px;
  margin-top: 10px;
`

export const Player = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`

export const PlayerName = styled.span`
  text-align: center;
`

//MAIN
export const RoomCardList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;

  & > section:last-child {
    min-height: 100%;
  }
`
