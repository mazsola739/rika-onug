import styled from '@emotion/styled'
import { RoleTokenProps } from './RoleToken.types'

export const StyledRoleToken = styled.img<{bgImg: string, isSelected: boolean}>`
  opacity: ${({ isSelected }) => (isSelected ? '1' : '0.8')};
  background-image: ${({ bgImg }) => `url(${bgImg})`};
  transition: 0.75s;
  width: 50px;
  border-radius: 50%;
  border: 1px solid white;
  filter: drop-shadow(3px 3px 3px black);

  &:hover {
    transition: 0.75s;
    transform: scale(1.1);
    opacity: 1;
  }
`


