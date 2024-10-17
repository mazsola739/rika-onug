import styled from '@emotion/styled'

export const StyledCardList = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const CardListTitle = styled.p`
  filter: drop-shadow(3px 3px 3px black);
  color: white;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 1px;
  text-align: center;
  text-transform: uppercase;
  margin: 0;
`

export const CardListGrid = styled.div`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(auto-fill, minmax(100px, 100px));
`
