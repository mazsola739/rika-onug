import styled from '@emotion/styled'

export const StyledGamePlayHeader = styled.div`
  filter: drop-shadow(3px 3px 3px black);
  height: 100%;
  display: flex;
  flex-direction: row;
  min-width: 100%;
  justify-content: space-between;
`

export const NarrationImage = styled.div`
  display: flex;
  justify-content: flex-end;
  min-width: 260px;
`

export const Narration = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 20px;
  padding: 10px;
`

export const TimerContainer = styled.div`
  min-width: 130px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-family: 'Josefin Sans', sans-serif;
  padding: 10px;
  margin-left: auto;
  filter: drop-shadow(3px 3px 3px black);
`

export const StyledGamePlay = styled.div`
  display: flex;
  flex-direction: column;
`

export const GamePlayContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 100%;
  min-height: 100%;
  justify-content: space-between;
`

export const PlayerHand = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 100%;
`

export const OwnCardPlace = styled.div`
  max-width: 260px;
  display: flex;
  align-items: flex-end;
`

export const GameArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  overflow: hidden;
`
