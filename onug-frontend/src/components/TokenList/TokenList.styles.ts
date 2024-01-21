import styled from '@emotion/styled'

export const StyledTokenList = styled.section`
  background-color: transparent;
  padding: 10px;
`

export const TokenListTitle = styled.p`
  color: white;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 1px;
  margin-bottom: 20px;
  padding-bottom: 10px;
  text-align: center;
  text-transform: uppercase;
`

export const TokenListGrid = styled.div`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
`
