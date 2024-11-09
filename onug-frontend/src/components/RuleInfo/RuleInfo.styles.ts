import styled from '@emotion/styled'

export const StyledRuleInfo = styled.div`
  display: grid;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  gap: 5px;
  min-height: 90px;
  border-bottom: 2px solid #969290;
  padding: 5px 0;
  grid-template-columns: 80px 300px;
  grid-template-rows: 20px 60px;
  grid-template-areas:
    'avatar character'
    'avatar rule';

  img {
    grid-area: avatar;
  }
  h4 {
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

export const Character = styled.h4`
  grid-area: title;
  color: yellow;
  padding: 0;
  margin: 0;
  text-align: left;
`

export const Rule = styled.span`
  color: white;
  font-size: 14px;
  margin: 0;
  padding: 0;
  text-align: left;
`
