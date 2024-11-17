import styled from '@emotion/styled'
import { MenuButtonProps } from './MenuButton.types'

export const StyledMenuButton = styled.button<MenuButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  cursor: pointer;
  width: 8.75rem;
  height: 3.125rem;
  border: ${({ isSelected }) => (isSelected ? '0.0625rem solid white' : '0.0625rem solid transparent')};
  background-color: ${({ bgColor }) => bgColor || 'transparent'};
  background-image: url(${({ bgImg }) => bgImg});
  background-size: 102%;
  background-position: center;
  background-repeat: no-repeat;
  transition: 0.75s;
  filter: drop-shadow(0.1875rem 0.1875rem 0.1875rem black);
  opacity: ${({ isSelected }) => (isSelected ? '1' : '0.7')};

  &:hover:not(:disabled) {
    opacity: 1;
  }

  &#active {
    border: 0.0625rem solid white;
    opacity: 1;
  }
`
