import styled from '@emotion/styled'

export const StyledTable = styled.div`
  min-width: 100%;
  display: grid;
  grid-template-columns: 170px calc(100vw - 340px) 170px;
  grid-template-rows: 80px 170px calc(100vh - 470px) 220px;

  header {
    grid-area: 1 / 1 / 2 / 4;
  }
  & > div:nth-of-type(1) {
    grid-area: 2 / 1 / 5 / 2;
  }
  & > div:nth-of-type(2) {
    grid-area: 2 / 2 / 3 / 3;
  }
  & > div:nth-of-type(3) {
    grid-area: 2 / 3 / 5 / 4;
  } 
  main {
    grid-area: 3 / 2 / 4 / 3;
  }
  footer {
    grid-area: 4 / 2 / 5 / 3;
  }
`

export const TableCenter = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
`

export const Ready = styled.div`
  display: flex;
  align-items: flex-end;
`

export const CenterTokens = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  align-content: center;
  justify-content: center;
  max-width: 500px;
`

export const StyledTableFooter = styled.div`
  display: grid;
  grid-template-columns: 1fr 140px 1fr;
  grid-template-rows: 1fr;
  align-items: center;
  justify-items: stretch;
  gap: 10px;
`

export const PlayerInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: flex-end;
`

export const Player = styled.span`
  color: white;
  font-size: 24px;
  display: inline-flex;
  gap: 5px;
  align-items: center;
`

export const PlayerCardRule = styled.span`
  color: white;
  font-size: 18px;
  max-width: 300px;
`

export const Tokens = styled.div`
  display: flex; 
`