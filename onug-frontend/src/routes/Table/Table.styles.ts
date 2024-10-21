import styled from '@emotion/styled'

export const StyledTable = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  justify-content: space-between;
`

export const GameArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

export const Ready = styled.div`
  min-width: 320px;
  display: flex;
  align-items: flex-end;
  padding: 10px;
`

export const Marks = styled.div`
  padding: 20px 10px;
  align-content: flex-start;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  min-width: 130px;
  max-width: 130px;
`

export const StyledGameTableHeader = styled.div`
  display: flex;
  font-family: 'Josefin Sans', sans-serif;
  color: white;
  height: 100%;
  justify-content: flex-start;
`

export const PlayerInfo = styled.div`
  width: 140px;
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  filter: drop-shadow(8px 5px 5px black);
`

export const PlayerName = styled.span`
  color: white;
  text-align: center;
  margin: 0 10px;
`

export const PlayerCardInfo = styled.div`
  filter: drop-shadow(8px 5px 5px black);
  display: flex;
  flex-direction: row;
`

export const PlayerCardRule = styled.span`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 10px;
  text-align: start;
`
