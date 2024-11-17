import styled from '@emotion/styled'

export const StyledOwnCard = styled.div`
  display: grid;
  justify-content: center;
  border-bottom: 0.125rem solid #969290;
  grid-template-columns: 100px 20px 1fr;
  grid-template-rows: 40px 20px 20px 20px 1fr 70px;
  gap: 0.625rem;

  grid-template-areas:
    'title title title'
    'card number name'
    'card role role'
    'card team team'
    'card cardrule cardrule'
    'token tokenrule tokenrule';

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

  & > h4:nth-of-type(1) {
    grid-area: title;
  }
`

export const OwnCardInfoName = styled.span`
  grid-area: name;
  font-size: 0.875rem;
  display: inline-flex;
  gap: 0.3125rem;
  align-items: center;
`

export const OwnCardInfoTeam = styled.span`
  grid-area: team;
  font-size: 0.875rem;
  display: inline-flex;
  gap: 0.3125rem;
  align-items: center;
`
export const OwnCardInfoRole = styled.span`
  grid-area: role;
  font-size: 0.875rem;
  display: inline-flex;
  gap: 0.3125rem;
  align-items: center;
`

export const CardRule = styled.span`
  grid-area: cardrule;
  font-size: 0.875rem;
`

export const TokenRule = styled.span`
  grid-area: tokenrule;
  font-size: 0.875rem;
`
