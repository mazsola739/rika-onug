import styled from '@emotion/styled'

export const StyledSuspicionCards = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 150px;
  border-bottom: 2px solid #969290;
`

export const StyledAccusedCards = styled.div`
  display: flex;
  gap: 3px;
  flex-direction: row;
  flex-wrap: wrap;
`

export const AccusedCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const CardPosition = styled.span`
  font-size: 10px;
  font-weight: lighter;
  padding: 5px 0;
`
