import styled from '@emotion/styled'

//TABLE
export const StyledTable = styled.div`
  min-width: 100%;
  display: grid;
  grid-template-columns: 170px calc(100vw - 740px) 170px 400px;
  grid-template-rows: 80px 130px calc(100vh - 290px) 80px;

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
    grid-area: 4 / 1 / 5 / 4;
  }
`

//HEADER
export const StyledTableHeader = styled.div``

export const Sun = styled.img`
  border-radius: 50%;
  box-shadow:
    0 0 60px 10px #fff,
    0 0 100px 20px red,
    0 0 140px 30px gold;
  width: 35px;
  height: 35px;
`

//MAIN
export const TableCenter = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

//FOOTER

//INFOPANEL
export const ReadyStatus = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
`

export const ReadyTitle = styled.h3`
  grid-area: title;
  color: yellow;
  padding: 0;
  margin: 0;
  padding: 10px 0;
  text-align: center;
`
