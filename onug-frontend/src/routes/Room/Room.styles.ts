import styled from '@emotion/styled'

export const Main = styled.main`
  background-color: transparent;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 120px;
  bottom: 90px;
  left: 130px;
  right: 0px;
  overflow-y: auto;
  overflow-x: hidden;
`

export const StyledRuleInfo = styled.div`
  background: transparent;
  display: flex;
  flex-direction: row;
  position: absolute;
  left: 140px;
`

export const RuleImage = styled.img`
  width: 100px;
`

export const RuleInfoDescription = styled.p`
  font-size: 16px;
  font-weight: 400;
  font-family: 'Josefin Sans', sans-serif;
  margin: 0;
  padding: 5px;
  text-align: left;
  color: black;
`
