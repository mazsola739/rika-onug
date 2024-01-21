import styled from '@emotion/styled'

export const StyledGameToken = styled.div`
  display: flex;
  flex-direction: column;
`

export const Marks = styled.div`
  background: linear-gradient(
    to bottom,
    transparent 0%,
    transparent 40%,
    #000000 40%,
    #000000 100%
  );
  display: flex;
  flex-direction: column;
  padding: 0 10px;
`

export const DopplegangerMarks = styled.div`
  background: linear-gradient(
    to bottom,
    #000000 0%,
    #000000 50%,
    transparent 50%,
    transparent 100%
  );
  display: flex;
  flex-direction: row;
  justify-content: center;
`

export const TokenImage = styled.img`
  width: 50px;
`

export const TokenName = styled.span`
  color: #5e17eb;
  font-family: 'Josefin Sans', sans-serif;
  padding: 10px 0;
  text-align: center;
`
