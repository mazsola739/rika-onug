import styled from '@emotion/styled'

export const StyledRuleInfo = styled.div`
  display: grid;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  padding: 0.625rem 0;

  min-height: 95px;
  border-bottom: 0.125rem solid #969290;
  grid-template-columns: 90px calc(100% - 90px);
  grid-template-rows: 30px 1fr;
  grid-template-areas:
    'avatar character'
    'avatar rule';

  img {
    grid-area: avatar;
  }
  h4 {
    grid-area: character;
    margin: 0;
  }
  p {
    grid-area: rule;
  }
`

export const Avatar = styled.img`
  width: 5rem;
  border: 0.0625rem solid yellow;
`
export const Character = styled.h4`
  color: yellow;
  text-align: left;
`

export const Rule = styled.span`
  font-size: 0.875rem;
  text-align: left;
`
