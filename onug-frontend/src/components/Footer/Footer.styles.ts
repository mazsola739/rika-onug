import styled from '@emotion/styled'

export const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-top: 2px solid #969290;
  border-radius: 10px 10px 0 0;
  padding: 5px;
  position: relative;
`

export const CopyrightText = styled.div`
  font-size: 9px;
  color: rgba(255, 255, 255, 0.5);
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  width: 100%;
`
