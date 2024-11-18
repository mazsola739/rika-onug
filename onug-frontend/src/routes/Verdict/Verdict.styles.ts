import styled from '@emotion/styled'

//VERDICT
export const StyledVerdict = styled.div`
  display: grid;
  grid-template-rows: 5rem calc(100vh - 10rem) 5rem;
  grid-template-columns: calc(100vw - 400px) 400px;

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
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

//FOOTER

//VERDICT INFO
