import styled from '@emotion/styled'

export const StyledVerdict = styled.div`
  min-width: 100%;
  display: grid;
  grid-template-rows: 80px calc(100vh - 160px) 80px;

  header {
    grid-area: 1 / 1 / 2 / 4;
  }
  main {
    grid-area: 3 / 2 / 4 / 3;
  }
  footer {
    grid-area: 4 / 1 / 4 / 4;
  }
`
