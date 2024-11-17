import styled from '@emotion/styled'

export const StyledSquad = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 180px;
  font-size: 14px;
  border-bottom: 2px solid #969290;
  padding-bottom: 5px;
`

export const SquadMembers = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(6, auto);
  gap: 5px;
  align-items: center;
  min-width: 388px;
`

export const Member = styled.div`
  align-items: center;
  display: flex;
  font-size: 16px;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`

export const MemberName = styled.span`
  text-align: center;
`
