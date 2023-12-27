import styled from '@emotion/styled'

export const StyledTokenList = styled.section`
  background-color: transparent;
  padding: 10px;
`

export const TokenListTitle = styled.p`
  font-size: 24px;
  font-family: 'Josefin Sans', sans-serif;
  font-weight: bold;
  color: black;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding-bottom: 10px;
  text-align: center;
`

export const TokenListGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 5px 5px;
`

export const TokenImage = styled.img`
  width: 100px;
`
