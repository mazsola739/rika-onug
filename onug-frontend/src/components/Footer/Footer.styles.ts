import styled from '@emotion/styled'

export const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-top: 0.125rem solid #969290;
  border-radius: 0.625rem 0.625rem 0 0;
  padding: 0.3125rem;
  margin: 0.3125rem;
  position: relative;
`

export const CopyrightText = styled.div`
  font-size: 0.6rem;
  color: rgba(255, 255, 255, 0.5);
  position: absolute;
  bottom: 0.1875rem;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  width: 100%;
`
