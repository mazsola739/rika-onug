import styled from '@emotion/styled'

export const StyledSuspicionPlayers = styled.div`
  /* Box Model */
  min-height: 150px;
  padding-bottom: 10px;
  border-bottom: 2px solid #969290;

  /* Flexbox/Grid */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const StyledAccusedPlayers = styled.div`
  /* Flexbox/Grid */
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 3px;
`

export const AccusedPlayer = styled.div`
  /* Flexbox/Grid */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
