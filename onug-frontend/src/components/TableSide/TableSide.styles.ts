import styled from '@emotion/styled'

export const StyledTableSide = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(8, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  color: white;

  & > div:nth-of-type(1) {
    grid-row: span 2 / span 2;
  }

  & > div:nth-of-type(2) {
    grid-row: span 2 / span 2;
    grid-column-start: 2;
    grid-row-start: 2;
  }

  & > div:nth-of-type(3) {
    grid-row: span 2 / span 2;
    grid-row-start: 3;
  }

  & > div:nth-of-type(4) {
    grid-row: span 2 / span 2;
    grid-column-start: 2;
    grid-row-start: 4;
  }

  & > div:nth-of-type(5) {
    grid-row: span 2 / span 2;
    grid-row-start: 5;
  }

  & > div:nth-of-type(6) {
    grid-row: span 2 / span 2;
    grid-column-start: 2;
    grid-row-start: 6;
  }

  & > div:nth-of-type(7) {
    grid-row: span 2 / span 2;
    grid-row-start: 7;
  }
`

export const CardContainer = styled.div`
  min-height: 200px;
`
