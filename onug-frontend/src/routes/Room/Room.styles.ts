import styled from '@emotion/styled'

export const StyledRoom = styled.div`
  min-width: 100%;
  bottom: 90px;
  display: flex;
  flex-direction: column;
`

export const Hello = styled.div`
  color: white;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 18px;
  margin: 10px 0 10px 10px;
  width: 140px;
  height: 92px;
  display: flex;
  text-align: center;
  align-items: center;
  filter: drop-shadow(5px 5px 5px black);
`

export const StyledRuleInfo = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  left: 150px;
  top: 0px;
  padding-right: 10px;
  position: absolute;
`

export const RuleImage = styled.img`
  border: 1px solid white;
  width: 100px;
`

export const RuleInfoDescription = styled.p`
  filter: drop-shadow(5px 5px 5px black);
  color: white;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 16px;
  margin: 0;
  padding: 5px;
  text-align: left;
`

export const RoomCardList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
`
