import styled from '@emotion/styled'
import { StyledRoleTokenProps } from './RoleToken.types'

//TODO type
export const StyledRoleToken = styled.img<StyledRoleTokenProps>`
  /* Positioning */
  z-index: 20;

  /* Box Model */
  width: ${({ size }) => size}px;

  /* Visuals */
  opacity: ${({ isSelected }) => (isSelected ? '1' : '0.8')};
  background-image: ${({ bgImg }) => `url(${bgImg})`};
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50%;
  border: 3px solid white;
  filter: drop-shadow(3px 3px 3px black);
  transition: 0.75s;

  &:hover {
    transition: 0.75s;
    transform: scale(1.1);
    opacity: 1;
  }
`
