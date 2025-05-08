import styled from '@emotion/styled'

//ROOM
export const StyledRoom = styled.div`
  /* Flexbox/Grid */
  display: grid;
  grid-template-columns: 160px 1fr 160px 360px;
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
  /* Box Model */
  width: 100%;

  /* Flexbox/Grid */
  display: flex;
  flex-direction: column;
  gap: 10px;

  & > section:last-child {
    min-height: 80vh;
  }
`

//FOOTER

//ROOM INFO
