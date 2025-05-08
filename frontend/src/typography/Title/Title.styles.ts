import styled from '@emotion/styled'

export const StyledTitle = styled.h5<{ yourResult?: boolean }>`
  /* Box Model */
  width: 100%;

  /* Typography */
  color: yellow;
  text-align: center;

  /* Visuals */
  ${({ yourResult }) => yourResult !== undefined && `background-color: ${yourResult ? '#28a74580' : '#dc354580'};`}
`
