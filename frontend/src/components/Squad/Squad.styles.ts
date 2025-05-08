import styled from '@emotion/styled'

export const StyledSquad = styled.div`
  /* Box Model */
  min-height: 180px;
  border-bottom: 2px solid #969290;
  padding: 5px 0;

  /* Flexbox/Grid */
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const SquadMembers = styled.div`
  /* Box Model */
  min-width: 100%;
  padding: 5px 0;

  /* Flexbox/Grid */
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(6, auto);
  gap: 5px;
  align-items: center;
`

export const Member = styled.div`
  /* Flexbox/Grid */
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`

export const MemberName = styled.span`
  /* Typography */
  text-align: center;
  font-size: 14px;
`
