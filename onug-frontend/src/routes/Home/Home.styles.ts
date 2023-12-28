import styled from '@emotion/styled'

export const StyledMain = styled.main`
  background-color: transparent;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 200px;
  bottom: 100px;
  left: 0px;
  right: 0px;
  overflow-y: auto;
  overflow-x: hidden;
`

export const StyledGameButtons = styled.div`
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

export const StyledLogo = styled.img`
  height: 50px;
  width: 248px;
`

export const StyledRuleInfo = styled.div`
  background: transparent;
  display: flex;
  flex-direction: row;
`

export const RuleInfoDescription = styled.p`
  font-size: 14px;
  font-weight: 400;
  font-family: 'Josefin Sans', sans-serif;
  margin: 0;
  padding: 5px;
  color: black;
`
