import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { StyledCardProps } from './Card.types';
import { glowingGreen, glowingVibrantPink, glowingRed } from 'styles';

export const StyledCard = styled.div<StyledCardProps>`
  width: ${({ sizeW }) => sizeW}px;
  border-radius: 15px;
  display: flex;

  ${({ werewolf, dreamwolf, isSelectable }) => {
    if (isSelectable) {
      return css`
        animation: ${glowingGreen} 1s ease-in-out infinite alternate;
      `;
    }
    if (dreamwolf) {
      return css`
        animation: ${glowingVibrantPink} 1s ease-in-out infinite alternate;
      `;
    }
    if (werewolf) {
      return css`
        animation: ${glowingRed} 1s ease-in-out infinite alternate;
      `;
    }
    return null;
  }}
`;