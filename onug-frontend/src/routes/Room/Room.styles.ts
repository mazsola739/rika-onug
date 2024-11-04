import styled from '@emotion/styled'

//ROOM
export const StyledRoom = styled.div`
  min-width: 100%;
  display: grid;
  grid-template-columns: 160px calc(100vw - 720px) 160px 400px;
  grid-template-rows: 120px calc(100vh - 200px) 80px;

  nav {
    grid-area: 2 / 1 / 3 / 2;
  }
  header {
    grid-area: 1 / 1 / 2 / 4;
  }
  main {
    grid-area: 2 / 2 / 3 / 3;
  }
  footer {
    grid-area: 3 / 1 / 4 / 4;
  }
  fieldset {
    grid-area: 2 / 3 / 3 / 4;
  }
  & > div:nth-of-type(1) {
    grid-area: 1 / 4 / 4 / 5;
  }
`

//FOOTER
export const StyledInfo = styled.div`
  display: grid;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  gap: 5px;
  min-height: 90px;
  border-bottom: 2px solid #969290;
  padding: 10px 0 5px 0;
  grid-template-columns: 80px 300px;
  grid-template-rows: 20px 60px;
  grid-template-areas:
    'avatar character'
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
  grid-area: title;
  color: yellow;
  padding: 0;
  margin: 0;
  text-align: center;
`

export const Rule = styled.p`
  color: white;
  font-size: 14px;
  margin: 0;
  padding: 0;
  text-align: left;
`

export const StyledPlayerNames = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 180px;

  color: white;
  font-size: 14px;

  border-bottom: 2px solid #969290;
  padding-bottom: 5px;
`

export const Names = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(6, auto);
  gap: 5px;
  align-items: center;
  min-width: 388px;
`

export const Players = styled.h3`
  grid-area: title;
  color: yellow;
  padding: 10px 0;
  margin: 0;
  text-align: center;
`

export const Player = styled.div`
  align-items: center;
  display: flex;
  font-size: 20px;
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
    min-height: 90vh;
  }
`
