import styled from '@emotion/styled'

export const StyledSuspicionCards = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 150px;
  border-bottom: 0.125rem solid #969290;
`

export const StyledAccusedCards = styled.div`
  display: flex;
  gap: 0.1875rem;
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
  font-size: 0.625rem;
  font-weight: lighter;
  padding: 0.3125rem 0;
`
