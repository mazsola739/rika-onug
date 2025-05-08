import styled from '@emotion/styled'
import { StyledCardProps } from './Card.types'

export const StyledCard = styled.div<StyledCardProps>`
  /* Box Model */
  border-radius: 15px;
  border: ${({ isSelected, isSelectable }) => (isSelected ? '5px solid yellow' : isSelectable ? '5px solid green' : '5px solid transparent')};

  /* Flexbox/Grid */
  display: flex;

  /* Visuals */
  filter: drop-shadow(3px 3px 3px black);
`
