import styled from '@emotion/styled'

export const StyledCardList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const CardListTitle = styled.p`
  color: white;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 1px;
  margin: 10px 0 10px 0;
  text-align: center;
  text-transform: uppercase;
`

export const CardListGrid = styled.div`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
`
