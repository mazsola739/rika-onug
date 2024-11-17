import styled from '@emotion/styled'

export const StyledTitle = styled.h3<{ yourResult?: boolean }>`
  color: yellow;
  padding: 10px 0;
  text-align: center;
  width: 100%;
  ${({ yourResult }) => yourResult !== undefined && `background-color: ${yourResult ? '#28a74580' : '#dc354580'};`}
`
