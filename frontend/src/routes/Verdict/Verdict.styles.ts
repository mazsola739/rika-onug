import styled from '@emotion/styled'

//VERDICT
export const StyledVerdict = styled.div`
  /* Flexbox/Grid */
  display: grid;
  grid-template-rows: 70px calc(100vh - 140px) 70px;
  grid-template-columns: 1fr 360px;

  header {
    grid-area: 1 / 1 / 2 / 2;
  }

  main {
    grid-area: 2 / 1 / 3 / 2;
  }

  footer {
    grid-area: 3 / 1 / 4 / 2;
  }

  div {
    grid-area: 1 / 2 / 4 / 3;
  }
`

//HEADER

//MAIN
export const VerdictCenter = styled.div`
  /* Box Model */
  width: 100%;
  height: 100%;

  /* Flexbox/Grid */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

//FOOTER

//VERDICT INFO
