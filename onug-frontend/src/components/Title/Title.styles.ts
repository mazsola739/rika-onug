import styled from '@emotion/styled'

export const StyledTitle = styled.h3<{ yourResult?: boolean }>`
  grid-area: title;
  color: yellow;
  margin: 0;
  padding: 0;
  text-align: center;
  width: 100%;
  background-color: ${({ yourResult }) => (yourResult ? '#28a74580' : '#dc354580')};
`
