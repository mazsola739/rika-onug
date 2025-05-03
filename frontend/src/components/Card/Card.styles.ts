import styled from '@emotion/styled'
import { StyledCardProps } from './Card.types'

export const StyledCard = styled.div<StyledCardProps>`
  border-radius: 15px;
  display: flex;
  filter: drop-shadow(3px 3px 3px black);
  border: ${({ isSelected, isSelectable }) => {
    if (isSelected) {
      return '5px solid yellow'
    }
    if (isSelectable) {
      return '5px solid green'
    }
    return '5px solid transparent'
  }};
`
