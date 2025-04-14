import styled from '@emotion/styled'

export const StyledSquad = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 180px;
  border-bottom: 2px solid #969290;
  padding: 5px 0;
`

export const SquadMembers = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(6, auto);
  gap: 5px;
  align-items: center;
  min-width: 100%;
  padding: 5px 0;
`

export const Member = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: 10px;
`

export const MemberName = styled.span`
  text-align: center;
  font-size: 14px;
`
