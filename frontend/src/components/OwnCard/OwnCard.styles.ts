import styled from '@emotion/styled'

export const StyledOwnCard = styled.div`
  display: grid;
  justify-content: center;
  border-bottom: 2px solid #969290;
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
  grid-area: name;
  font-size: 12px;
  display: inline-flex;
  gap: 5px;
  align-items: center;
`

export const OwnCardInfoTeam = styled.span`
  grid-area: team;
  font-size: 12px;
  display: inline-flex;
  gap: 5px;
  align-items: center;
`
export const OwnCardInfoRole = styled.span`
  grid-area: role;
  font-size: 12px;
  display: inline-flex;
  gap: 5px;
  align-items: center;
`

export const CardRule = styled.span`
  grid-area: cardrule;
  font-size: 12px;
`

export const TokenRule = styled.span`
  font-size: 12px;
`

export const TokenContainer = styled.div`
  grid-area: token;
  display: flex;
  flex-direction: column;
  gap: 10px;
`
export const TokenInfo = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`
