import styled from '@emotion/styled'

export const StyledGameCard = styled.div`
  position: relative;
  background-color: transparent;
  border: 1px solid #000000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 75px;
  height: 75px;
  font-size: 10px;
  font-weight: 500;
  font-family: 'Josefin Sans', sans-serif;
`

export const GameCardImage = styled.img`
  width: 75px;
  height: 75px;
`

export const TokenImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 30px;
  height: 30px;
  z-index: 1;
`
