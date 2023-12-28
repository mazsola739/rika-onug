import styled from '@emotion/styled'

export const StyledRoom = styled.section`
  display: flex;
  flex-direction: column;
`
export const PlayersCards = styled.div`
  display: flex;
  flex-directiom: row;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: center;
  margin-bottom: 50px;
`
export const CenterCards = styled.div`
  display: flex;
  flex-directiom: row;
  justify-content: center;
  margin: 2.5px 0;
  gap: 5px;
`

export const StyledFooterButtons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
`

export const PauseButton = styled.button`
  padding: 10px 20px;
  background-color: #ff9800;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  font-family: 'Josefin Sans', sans-serif;
`

export const StopButton = styled.button`
  padding: 10px 20px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  font-family: 'Josefin Sans', sans-serif;
`

export const StartButton = styled.button`
  padding: 10px 20px;
  background-color: #8e44ad;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  font-family: 'Josefin Sans', sans-serif;
`
