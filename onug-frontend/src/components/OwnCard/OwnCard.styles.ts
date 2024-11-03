import styled from '@emotion/styled'

export const StyledOwnCard = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: 100px 270px;
  grid-template-rows: 30px 20px 20px 77px 55px;
  gap: 10px;
  border-bottom: 2px solid #969290;

  grid-template-areas:
    'number name'
    'card team'
    'card role'
    'card cardrule'
    'token tokenrule';

  & > img:nth-of-type(1) {
    grid-area: number;
    justify-self: end;
  }

  & > img:nth-of-type(2) {
    grid-area: card;
  }

  & > img:nth-of-type(3) {
    grid-area: token;
    justify-self: end;
  }

`

export const OwnCardInfoName = styled.span`
  grid-area: name;
  color: white;
  font-size: 14px;
  display: inline-flex;
  gap: 5px;
  align-items: center;
`

export const OwnCardInfoTeam = styled.span`
  grid-area: team;
  color: white;
  font-size: 14px;
  display: inline-flex;
  gap: 5px;
  align-items: center;
`
export const OwnCardInfoRole = styled.span`
 grid-area: role;
  color: white;
  font-size: 14px;
  display: inline-flex;
  gap: 5px;
  align-items: center;
`

export const CardRule = styled.span`
  grid-area: cardrule;
  color: white;
  font-size: 14px;
`

export const TokenRule = styled.span`
  grid-area: tokenrule;
  color: white;
  font-size: 14px;
`
