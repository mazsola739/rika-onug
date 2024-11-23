import styled from '@emotion/styled'

export const StyledSuspicionPlayers = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 150px;
  padding-bottom: 10px;
  border-bottom: 2px solid #969290;
`

export const StyledAccusedPlayers = styled.div`
  display: flex;
  gap: 3px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`

export const AccusedPlayer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const PlayerPosition = styled.span`
  font-size: 10px;
  font-weight: lighter;
  padding: 5px 0;
`
