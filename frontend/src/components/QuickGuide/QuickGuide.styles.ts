import styled from '@emotion/styled'
import { StyledQuickGuideTokenProps } from './QuickGuide.types'

type ExpansionTypes = 'Werewolf' | 'Bonus Roles' | 'Daybreak' | 'Vampire' | 'Alien' | 'Super Villains' | 'default'

const colorVariants: Record<ExpansionTypes, string> = {
  Werewolf: '#364C541A',
  'Bonus Roles': '#A12E631A',
  Daybreak: '#CF46311A',
  Vampire: '#48397A1A',
  Alien: '#A4CA631A',
  'Super Villains': '#469FDF1A',
  default: 'rgba(0, 0, 0, 0.3)'
}

export const Guide = styled.div`
  /* Box Model */
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;

  /* Flexbox/Grid */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;

  /* Visuals */
  ::-webkit-scrollbar {
    width: 8px; /* Width of vertical scrollbar */
    height: 8px; /* Height of horizontal scrollbar */
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(150, 146, 144, 0.2); /* Semi-transparent scrollbar thumb */
    border-radius: 10px; /* Rounded corners for the scrollbar thumb */
  }
`

export const Item = styled.div<StyledQuickGuideTokenProps>`
  /* Flexbox/Grid */
  display: flex;
  align-items: center;
  gap: 10px;

  /* Visuals */
  background-color: ${({ expansion }) => colorVariants[expansion as ExpansionTypes] || colorVariants.default};

  &:nth-of-type(odd) {
    width: 100%;
    border-radius: 200px 50px 50px 200px;

    flex-direction: row;

    text-align: left;

    & > img {
      filter: drop-shadow(8px 5px 5px black);
    }
  }

  &:nth-of-type(even) {
    width: 100%;
    border-radius: 50px 200px 200px 50px;

    flex-direction: row-reverse;

    text-align: right;

    & > img {
      /* Visuals */
      filter: drop-shadow(-8px 5px 5px black);
    }
  }
`

export const StyledQuickGuideToken = styled.img<StyledQuickGuideTokenProps>`
  /* Box Model */
  width: 50px;
  height: 50px;

  /* Visuals */
  background-image: ${({ bgImg }) => `url(${bgImg})`};
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50%;
`

export const QuickGuideRule = styled.span`
  /* Typography */
  font-size: 12px;
`
