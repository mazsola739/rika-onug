import styled from '@emotion/styled'

//TABLE
export const StyledTable = styled.div`
  min-width: 100%;
  display: grid;
  grid-template-columns: 170px calc(100vw - 740px) 170px 400px;
  grid-template-rows: 80px 130px calc(100vh - 460px) 250px;
  
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
  & > div:nth-of-type(4) {
    grid-area: 1 / 4 / 5 / 5;
  }
  main {
    grid-area: 3 / 2 / 4 / 3;
  }
  footer {
    grid-area: 4 / 2 / 5 / 3;
  }
`

//HEADER
export const StyledTableHeader = styled.div``

export const Sun = styled.img`
  border-radius: 50%;
  box-shadow: 0 0 60px 10px #fff, 0 0 100px 20px red, 0 0 140px 30px gold;
  width: 35px;
  height: 35px;
`

//MAIN
export const TableCenter = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5px;
`

//FOOTER
export const StyledTableFooter = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  & > :first-child {
    grid-column: 2;
  }
  padding-bottom: 20px;
`

export const Tokens = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

//INFOPANEL
export const ReadyStatus = styled.div`
  display: flex;

`

export const StyledOwnCard = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: 100px 270px;
  grid-template-rows: 30px 20px 20px 77px 55px;
  gap: 10px;
  border-bottom: 2px solid #969290;

  grid-template-areas: 
    "number name"
    "card team"
    "card role"
    "card rulez"
    "token rule";

  & > :nth-child(1) {
    grid-area: number;
    justify-self: end;
  }

  & > :nth-child(2) {
    grid-area: name;
  }

  & > :nth-child(3) {
    grid-area: card;
  }

  & > :nth-child(4) {
    grid-area: team;
  }

  & > :nth-child(5) {
    grid-area: role;
  }

  & > :nth-child(6) {
    grid-area: rulez;
  }

  & > :nth-child(7) {
    grid-area: token;
    justify-self: end;
  }

  & > :nth-child(8) {
    grid-area: rule;
  }
`

export const OwnCardInfo = styled.span`
  color: white;
  font-size: 14px;
  display: inline-flex;
  gap: 5px;
  align-items: center;
`

export const Rule = styled.span`
  color: white;
  font-size: 14px;
`
