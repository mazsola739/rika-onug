import styled from '@emotion/styled'
import { StyledTitleProps } from './Title.types'

//TODO type?
export const StyledTitle = styled.h5<StyledTitleProps>`
  /* Box Model */
  width: 100%;

  /* Typography */
  color: yellow;
  text-align: center;

  /* Visuals */
  ${({ yourResult }) => yourResult !== undefined && `background-color: ${yourResult ? '#28a74580' : '#dc354580'};`}
`
