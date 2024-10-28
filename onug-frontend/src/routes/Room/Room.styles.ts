import styled from '@emotion/styled'

//ROOM
export const StyledRoom = styled.div`
  min-width: 100%;
  display: grid;
  grid-template-columns: 160px calc(100vw - 670px) 160px 350px;
  grid-template-rows: 120px calc(100vh - 200px) 80px;

  nav {
    grid-area: 2 / 1 / 3 / 2;
  }
  header {
    grid-area: 1 / 1 / 2 / 5;
  }
  main {
    grid-area: 2 / 2 / 3 / 3;
  }
  footer {
    grid-area: 3 / 1 / 4 / 5;
  }
  fieldset {
    grid-area: 2 / 3 / 3 / 4;
  }
  & > div:nth-of-type(1) {
    grid-area: 2 / 4 / 3 / 5;
  }
`

//FOOTER
export const StyledInfo = styled.div`
  display: grid;
  flex-direction: column;
  gap: 5px;
  min-height: 105px;
  align-items: center;
  grid-template-areas:
    '. character'
    'avatar rule';

  img {
    grid-area: avatar;
  }
  h4 {
    grid-area: character;
  }
  p {
    grid-area: rule;
  }
`

export const Avatar = styled.img`
  width: 80px;
  border: 1px solid yellow;
`

export const Character = styled.h4`
  color: yellow;
  font-size: 14px;
  margin: 0;
  padding: 0;
  text-align: center;
  text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black,
    1px 1px 0 black;
`

export const Rule = styled.p`
  color: yellow;
  font-size: 14px;
  margin: 0;
  padding: 0;
  text-align: left;
  text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black,
    1px 1px 0 black;
`

export const StyledPlayerNames = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  color: white;
  font-size: 14px;
`

export const Names = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 3px;
  flex-wrap: wrap;
`

export const Players = styled.h4`
  text-align: center;
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

//INFOPANEL
export const StyledRoomInfoPanel = styled.div``
