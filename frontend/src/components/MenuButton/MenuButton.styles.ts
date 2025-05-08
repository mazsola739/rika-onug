import styled from '@emotion/styled'
import { MenuButtonProps } from './MenuButton.types'

export const StyledMenuButton = styled.button<MenuButtonProps>`
  /* Box Model */
  width: 8.75rem;
  height: 3.125rem;
  border: ${({ isSelected }) => (isSelected ? '0.0625rem solid white' : '0.0625rem solid transparent')};

  /* Flexbox/Grid */
  display: flex;
  align-items: center;
  justify-content: center;

  /* Visuals */
  background-color: ${({ bgColor }) => bgColor || 'transparent'};
  background-image: url(${({ bgImg }) => bgImg});
  background-size: 102%;
  background-position: center;
  background-repeat: no-repeat;
  filter: drop-shadow(3px 3px 3px black);

  /* Animation/Transition */
  transition: 0.75s;

  /* Interaction */
  cursor: pointer;
  opacity: ${({ isSelected }) => (isSelected ? '1' : '0.7')};

  &:hover:not(:disabled) {
    opacity: 1;
  }
`
