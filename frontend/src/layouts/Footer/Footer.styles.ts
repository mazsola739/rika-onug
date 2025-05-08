import styled from '@emotion/styled'

export const StyledFooter = styled.footer`
  /* Positioning */
  position: relative;

  /* Box Model */
  border-top: 2px solid #969290;
  border-radius: 10px 10px 0 0;
  padding: 5px;

  /* Flexbox/Grid */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const CopyrightText = styled.div`
  /* Positioning */
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);

  /* Box Model */
  width: 100%;

  /* Typography */
  font-size: 9px;
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
`
