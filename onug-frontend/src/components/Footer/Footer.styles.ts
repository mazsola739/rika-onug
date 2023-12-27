import styled from '@emotion/styled'

export const StyledFooter = styled.footer`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const StyledFooterButtons = styled.div`
  width: 100%px;
`

export const ResetButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
  font-weight: 500;
  font-family: 'Josefin Sans', sans-serif;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

export const StartButton = styled.button`
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  font-family: 'Josefin Sans', sans-serif;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

export const StyledSelectedCard = styled.img`
  width: 50px;
`

export const StyledSelectedCardList = styled.div`
  display: flex;
  overflow-y: auto;
  white-space: nowrap;
  height: 50px;
  padding: 5px;
`

export const PauseButton = styled.button`
  padding: 10px 20px;
  background-color: #ff9800;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
  font-weight: 500;
  font-family: 'Josefin Sans', sans-serif;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
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

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`
