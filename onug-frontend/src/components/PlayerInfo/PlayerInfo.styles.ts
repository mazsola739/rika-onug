import styled from '@emotion/styled'

export const StyledPlayerInfo = styled.div<{ result?: boolean }>`
  display: grid;
  justify-content: center;
  gap: 5px;
  max-width: 48%;

  background-color: ${({ result }) => (result ? '#28a74580' : '#dc354580')};
  border-radius: 10px;

  grid-template-columns: 80px 25px 1fr;
  grid-template-rows: 25px 15px 15px 1fr;
  grid-template-areas:
    'card number name'
    'card role role'
    'card team team'
    'card mark artifact';

  & > img:nth-of-type(1) {
    grid-area: card;
  }

  & > img:nth-of-type(2) {
    grid-area: number;
  }

  & > img:nth-of-type(3) {
    grid-area: mark;
  }

  & > img:nth-of-type(4) {
    grid-area: artifact;
  }
`

export const PlayerInfoName = styled.span`
  grid-area: name;
  font-size: 12px;
  display: inline-flex;
  gap: 5px;
  align-items: center;
`

export const PlayerInfoTeam = styled.span`
  grid-area: team;
  font-size: 12px;
  display: inline-flex;
  gap: 5px;
  align-items: center;
`
export const PlayerInfoRole = styled.span`
  grid-area: role;
  font-size: 12px;
  display: inline-flex;
  gap: 5px;
  align-items: center;
`
