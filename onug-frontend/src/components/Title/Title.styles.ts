import styled from '@emotion/styled'

export const StyledTitle = styled.h5<{ yourResult?: boolean }>`
  color: yellow;
  text-align: center;
  width: 100%;
  ${({ yourResult }) => yourResult !== undefined && `background-color: ${yourResult ? '#28a74580' : '#dc354580'};`}
`
