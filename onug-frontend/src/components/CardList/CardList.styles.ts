import styled from '@emotion/styled'

export const StyledCardList = styled.section`
  background-color: transparent;
  padding: 10px;
`

export const CardListTitle = styled.p`
  font-size: 24px;
  font-family: 'Josefin Sans', sans-serif;
  font-weight: bold;
  color: black;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-align: center;
  margin: 0px 0px 10px;
`

export const CardListGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 5px 5px;
`
