import styled from '@emotion/styled'

export const StyledRoleCardList = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
`

export const RoleCardListTitle = styled.h2`
  filter: drop-shadow(0.1875rem 0.1875rem 0.1875rem black);
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: 0.0625rem;
  text-align: center;
  text-transform: uppercase;
`

export const RoleCardListGrid = styled.div`
  display: grid;
  gap: 0.3125rem;
  grid-template-columns: repeat(auto-fill, minmax(110px, 110px));
  justify-content: center;
`
