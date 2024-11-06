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
  overflow-x: hidden;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 8px; /* Width of vertical scrollbar */
    height: 8px; /* Height of horizontal scrollbar */
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(150, 146, 144, 0.2); /* Semi-transparent scrollbar thumb */
    border-radius: 10px; /* Rounded corners for the scrollbar thumb */
  }

  /* For Firefox */
  .scrollable {
    scrollbar-width: thin; /* Use 'thin' for thin scrollbar */
    scrollbar-color: rgba(0, 0, 0, 0.3) transparent; /* Thumb color and track color */
  }

  align-items: flex-start;
  gap: 5px;
  color: white;
`

export const StyledQuickGuide = styled.h3`
  color: yellow;
  padding: 10px 0;
  margin: 0;
  text-align: center;
  width: 378px;
`

export const Item = styled.div<StyledQuickGuideTokenProps>`
  display: flex;
  background-color: ${({ expansion }) => colorVariants[expansion as ExpansionTypes] || colorVariants.default};

  &:nth-of-type(odd) {
    flex-direction: row;
    width: 378px;
    border-radius: 200px 50px 50px 200px;
    text-align: left;
    & > img {
      filter: drop-shadow(8px 5px 5px black);
    }
  }

  &:nth-of-type(even) {
    flex-direction: row-reverse;
    width: 378px;
    border-radius: 50px 200px 200px 50px;
    text-align: right;
    & > img {
      filter: drop-shadow(-8px 5px 5px black);
    }
  }

  gap: 10px;
  align-items: center;
`

export const StyledQuickGuideToken = styled.img<StyledQuickGuideTokenProps>`
  background-image: ${({ bgImg }) => `url(${bgImg})`};
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50%;
  width: 75px;
  height: 75px;
`

export const QuickGuideRule = styled.span`
  color: white;
  font-size: 14px;
`
