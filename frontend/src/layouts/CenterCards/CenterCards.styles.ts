import styled from '@emotion/styled'

export const StyledCenterCards = styled.div`
  /* Box Model */
  padding: 5px;
  height: 100%;

  /* Flexbox/Grid */
  display: flex;
  align-items: flex-end;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
`

export const CardGroup = styled.div`
  /* Flexbox/Grid */
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Cards = styled.div`
  /* Flexbox/Grid */
  display: flex;
  gap: 0.4375rem;
`
