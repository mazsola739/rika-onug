import styled from '@emotion/styled'

export const StyledSquad = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 180px;
  font-size: 0.875rem;
  border-bottom: 0.125rem solid #969290;
  padding-bottom: 0.3125rem;
`

export const SquadMembers = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(6, auto);
  gap: 0.3125rem;
  align-items: center;
    min-width: 100%;
`

export const Member = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.625rem;
`

export const MemberName = styled.span`
  text-align: center;
`
