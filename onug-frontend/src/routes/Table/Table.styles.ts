import styled from '@emotion/styled'

export const StyledTable = styled.div`
  min-width: 100%;
  display: grid;
  grid-template-columns: 200px calc(100vw - 400px) 200px;
  grid-template-rows: 140px calc(100vh - 370px) 220px;

  nav {
    grid-area: 1 / 1 / 4 / 2;
  }
  header {
    grid-area: 1 / 2 / 2 / 3;
  }
  main {
     grid-area: 2 / 2 / 3 / 3;
  }
  footer {
    grid-area: 3 / 2 / 4 / 3;
  }
  fieldset {
     grid-area: 1 / 3 / 4 / 4;
  }
`

export const GameArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const Ready = styled.div`
  display: flex;
  align-items: flex-end;
`

export const Marks = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 5px;
  align-content: center;
  justify-content: center;
`

export const StyledTableFooter = styled.div`
  display: grid;
  grid-template-columns: 1fr 140px 1fr;
  grid-template-rows: 1fr;
  align-items: center;
  justify-items: center;
`

export const PlayerName = styled.span`
  color: white;
  font-size: 20px;
  display: inline-flex;
  gap: 5px;
  align-items: center;
`

export const PlayerCardRule = styled.span`
  color: white;
`

export const StyledSide = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
`
