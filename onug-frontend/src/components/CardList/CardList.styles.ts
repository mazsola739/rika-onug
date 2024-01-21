import styled from '@emotion/styled'

export const StyledCardList = styled.section`
  background-color: transparent;
  padding: 10px;
`

export const CardListTitle = styled.p`
  color: black;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 1px;
  margin: 0px 0px 10px;
  text-align: center;
  text-transform: uppercase;
`

export const CardListGrid = styled.div`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
`
