import styled from '@emotion/styled'

export const StyledRuleInfo = styled.div`
  display: grid;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  padding: 10px 0;
  gap: 5px;
  min-height: 90px;
  border-bottom: 2px solid #969290;
  grid-template-columns: 80px 1fr;
  grid-template-rows: 20px 1fr;
  grid-template-areas:
    'avatar character'
    'avatar rule';

  img {
    grid-area: avatar;
  }
  h3 {
    grid-area: character;
  }
  p {
    grid-area: rule;
  }
`

export const Avatar = styled.img`
  width: 80px;
  border: 1px solid yellow;
`
export const Character = styled.h3`
  color: yellow;
  text-align: left;
`

export const Rule = styled.span`
  font-size: 14px;
  text-align: left;
`
