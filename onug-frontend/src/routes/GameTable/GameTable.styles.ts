import styled from '@emotion/styled'

//MAIN
export const StyledGameTable = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  justify-content: space-between;
`

export const OwnCardPlace = styled.div`
  min-width: 200px;
  display: flex;
  align-items: flex-end;
`

export const GameArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

export const Ready = styled.div`
  min-width: 320px;
  display: flex;
  align-items: flex-end;
  padding: 10px;
`

export const Marks = styled.div`
  padding: 20px 0;
  align-content: flex-start;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  min-width: 130px;
  max-width: 130px;
`

//HEADER
export const StyledGameTableHeader = styled.div`
  display: flex;
  font-family: 'Josefin Sans', sans-serif;
  color: white;
  height: 100%;
  justify-content: flex-start;
`

export const PlayerInfo = styled.div`
  width: 200px;
  height: 102px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`

export const PlayerName = styled.span`
  color: white;
`

export const PlayerCardInfo = styled.div`
  display: flex;
  flex-direction: row;
`

export const PlayerCardRule = styled.span`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-left: 10px;
  padding-top: 10px;
  text-align: start;
`

//FOOTER
export const GameTableFooter = styled.div``
