import styled from '@emotion/styled'

export const StyledOwnCard = styled.div`
  /* Box Model */
  border-bottom: 2px solid #969290;
  
  /* Flexbox/Grid */
  display: grid;
  justify-content: center;
  grid-template-columns: 100px 20px 1fr;
  grid-template-rows: 36px 20px 20px 20px 1fr auto;
  gap: 10px;
  grid-template-areas:
    'title title title'
    'card number name'
    'card role role'
    'card team team'
    'card cardrule cardrule'
    'token token token';

  & > img:nth-of-type(1) {
    grid-area: number;
    justify-self: end;
  }

  & > img:nth-of-type(2) {
    grid-area: card;
  }

  & > h5:nth-of-type(1) {
    grid-area: title;
    align-content: center;
  }
`

export const OwnCardInfoName = styled.span`
  /* Flexbox/Grid */
  grid-area: name;
  display: inline-flex;
  gap: 5px;
  align-items: center;

  /* Typography */
  font-size: 12px;
`

export const OwnCardInfoTeam = styled.span`
  /* Flexbox/Grid */
  grid-area: team;
  display: inline-flex;
  gap: 5px;
  align-items: center;

  /* Typography */
  font-size: 12px;
`

export const OwnCardInfoRole = styled.span`
  /* Flexbox/Grid */
  grid-area: role;
  display: inline-flex;
  gap: 5px;
  align-items: center;

  /* Typography */
  font-size: 12px;
`

export const CardRule = styled.span`
  /* Flexbox/Grid */
  grid-area: cardrule;

  /* Typography */
  font-size: 12px;
`

export const TokenRule = styled.span`
  /* Typography */
  font-size: 12px;
`

export const TokenContainer = styled.div`
  /* Flexbox/Grid */
  grid-area: token;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const TokenInfo = styled.div`
  /* Flexbox/Grid */
  display: flex;
  gap: 10px;
`
