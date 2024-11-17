import styled from '@emotion/styled'

export const StyledRoleCardList = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const RoleCardListTitle = styled.span`
  filter: drop-shadow(3px 3px 3px black);
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 1px;
  text-align: center;
  text-transform: uppercase;
`

export const RoleCardListGrid = styled.div`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(auto-fill, minmax(110px, 110px));
  justify-content: center;
`
