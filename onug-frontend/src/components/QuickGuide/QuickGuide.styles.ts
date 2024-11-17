import styled from '@emotion/styled'
import { StyledQuickGuideTokenProps } from './QuickGuide.types'

type ExpansionTypes = 'Werewolf' | 'Bonus Roles' | 'Daybreak' | 'Vampire' | 'Alien' | 'Super Villains' | 'default'

const colorVariants: Record<ExpansionTypes, string> = {
  Werewolf: '#364C5463',
  'Bonus Roles': '#A12E6363',
  Daybreak: '#CF463163',
  Vampire: '#48397A63',
  Alien: '#A4CA6363',
  'Super Villains': '#469FDF63',
  default: 'rgba(0, 0, 0, 0.3)'
}

export const Guide = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 0.5rem; /* Width of vertical scrollbar */
    height: 0.5rem; /* Height of horizontal scrollbar */
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(150, 146, 144, 0.2); /* Semi-transparent scrollbar thumb */
    border-radius: 0.625rem; /* Rounded corners for the scrollbar thumb */
  }

  /* For Firefox */
  .scrollable {
    scrollbar-width: thin; /* Use 'thin' for thin scrollbar */
    scrollbar-color: rgba(0, 0, 0, 0.3) transparent; /* Thumb color and track color */
  }

  align-items: flex-start;
  gap: 0.3125rem;
`

export const Item = styled.div<StyledQuickGuideTokenProps>`
  display: flex;
  background-color: ${({ expansion }) => colorVariants[expansion as ExpansionTypes] || colorVariants.default};

  &:nth-of-type(odd) {
    flex-direction: row;
    width: 100%;
    border-radius: 200px 50px 50px 200px;
    text-align: left;
    & > img {
      filter: drop-shadow(0.5rem 0.3125rem 0.3125rem black);
    }
  }

  &:nth-of-type(even) {
    flex-direction: row-reverse;
    width: 100%;
    border-radius: 50px 200px 200px 50px;
    text-align: right;
    & > img {
      filter: drop-shadow(-0.5rem 0.3125rem 0.3125rem black);
    }
  }

  gap: 0.625rem;
  align-items: center;
`

export const StyledQuickGuideToken = styled.img<StyledQuickGuideTokenProps>`
  background-image: ${({ bgImg }) => `url(${bgImg})`};
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50%;
  width: 3.75rem;
  height: 3.75rem;
`

export const QuickGuideRule = styled.span`
  font-size: 0.875rem;
`
