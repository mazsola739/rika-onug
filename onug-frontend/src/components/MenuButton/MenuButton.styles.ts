import styled from '@emotion/styled'
import { MenuButtonProps } from './MenuButton.types'

export const StyledMenuButton = styled.button<MenuButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
  width: 140px;
  height: 50px;
  border: ${({ isSelected }) => (isSelected ? '1px solid white' : '1px solid transparent')};
  background-color: ${({ bgColor }) => bgColor || 'transparent'};
  background-image: url(${({ bgImg }) => bgImg});
  background-size: 102%;
  background-position: center;
  background-repeat: no-repeat;
  transition: 0.75s;
  filter: drop-shadow(3px 3px 3px black);
  opacity: ${({ isSelected }) => (isSelected ? '1' : '0.7')};

  &:hover:not(:disabled) {
    opacity: 1;
  }

   &#active {
    border: 1px solid white;
    opacity: 1;
  }
`
