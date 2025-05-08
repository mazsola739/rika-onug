import styled from '@emotion/styled'

export const StyledRoleCardList = styled.section`
  /* Box Model */
  width: 100%;

  /* Flexbox/Grid */
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const RoleCardListTitle = styled.h2`
  /* Typography */
  text-align: center;
  text-transform: uppercase;

  /* Visuals */
  filter: drop-shadow(3px 3px 3px black);
`

export const RoleCardListGrid = styled.div`
  /* Flexbox/Grid */
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(auto-fill, minmax(110px, 110px));
  justify-content: center;
`
