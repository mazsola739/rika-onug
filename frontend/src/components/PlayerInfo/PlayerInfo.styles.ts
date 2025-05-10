import styled from '@emotion/styled'
import { StyledPlayerInfoProps } from './PlayerInfo.types'

export const StyledPlayerInfo = styled.div<StyledPlayerInfoProps>`
  /* Flexbox/Grid */
  display: grid;
  justify-content: center;
  align-items: center;
  gap: 3px;
  grid-template-columns: 80px 20px 70px;
  grid-template-rows: 30px 15px 15px 1fr;
  grid-template-areas:
    'card number name'
    'card role role'
    'card team team'
    'card mark artifact';

  /* Visuals */
  background-color: ${({ result }) => (result ? '#28a74580' : '#dc354580')};
  border-radius: 10px;
  overflow: hidden;
  text-overflow: ellipsis;

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
  /* Flexbox/Grid */
  grid-area: name;
  display: inline-flex;
  align-items: center;

  /* Typography */
  font-size: 12px;
`

export const PlayerInfoTeam = styled.span`
  /* Flexbox/Grid */
  grid-area: team;
  display: inline-flex;
  align-items: center;

  /* Typography */
  font-size: 12px;
`

export const PlayerInfoRole = styled.span`
  /* Flexbox/Grid */
  grid-area: role;
  display: inline-flex;
  align-items: center;

  /* Typography */
  font-size: 12px;
`
