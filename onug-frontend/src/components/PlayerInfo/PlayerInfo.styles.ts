import styled from '@emotion/styled'

export const StyledPlayerInfo = styled.div`
  display: grid;
  justify-content: center;
  gap: 5px;

  grid-template-columns: 100px 30px 1fr;
  grid-template-rows: 30px 20px 20px 1fr;
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
  color: white;
  font-size: 14px;
  display: inline-flex;
  gap: 5px;
  align-items: center;
`

export const PlayerInfoTeam = styled.span`
  grid-area: team;
  color: white;
  font-size: 14px;
  display: inline-flex;
  gap: 5px;
  align-items: center;
`
export const PlayerInfoRole = styled.span`
  grid-area: role;
  color: white;
  font-size: 14px;
  display: inline-flex;
  gap: 5px;
  align-items: center;
`
