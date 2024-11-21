import styled from '@emotion/styled'

//ROOM
export const StyledRoom = styled.div`
  display: grid;
  grid-template-columns: 160px calc(100vw - 680px) 160px 360px;
  grid-template-rows: 70px calc(100vh - 140px) 70px;

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
//HEADER

//MAIN
export const RoomCardList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;

  & > section:last-child {
    min-height: 80vh;
  }
`

//FOOTER

//ROOM INFO
