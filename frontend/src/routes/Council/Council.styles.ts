import styled from '@emotion/styled'

//COUNCIL
export const StyledCouncil = styled.div`
  /* Flexbox/Grid */
  display: grid;
  grid-template-columns: 150px 1fr 150px 360px;
  grid-template-rows: 70px 200px calc(100vh - 340px) 70px;

  header {
    grid-area: 1 / 1 / 2 / 4;
  }

  & > div:nth-of-type(1) {
    grid-area: 2 / 1 / 4 / 2;
  }

  & > div:nth-of-type(2) {
    grid-area: 2 / 2 / 3 / 3;
  }

  & > div:nth-of-type(3) {
    grid-area: 2 / 3 / 4 / 4;
  }

  & > div:nth-of-type(4) {
    grid-area: 1 / 4 / 5 / 5;
  }

  main {
    grid-area: 3 / 2 / 4 / 3;
  }

  footer {
    grid-area: 4 / 1 / 4 / 4;
  }
`

//HEADER

//MAIN
export const CouncilCenter = styled.div`
  /* Box Model */
  width: 100%;
  height: 100%;

  /* Flexbox/Grid */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

//FOOTER

//COUNCIL INFO
