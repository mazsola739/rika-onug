import styled from '@emotion/styled'
import { StyledQuickGuideTokenProps } from './QuickGuide.types'

type ExpansionTypes =
  | 'Werewolf'
  | 'Bonus Roles'
  | 'Daybreak'
  | 'Vampire'
  | 'Alien'
  | 'Super Villains'
  | 'default'

const colorVariants: Record<ExpansionTypes, string> = {
  Werewolf: '#364C5463',
  'Bonus Roles': '#A12E6363',
  Daybreak: '#CF463163',
  Vampire: '#48397A63',
  Alien: '#A4CA6363',
  'Super Villains': '#469FDF63',
  default: 'rgba(0, 0, 0, 0.3)',
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
    background-color: rgba(
      150,
      146,
      144,
      0.2
    ); /* Semi-transparent scrollbar thumb */
    border-radius: 10px; /* Rounded corners for the scrollbar thumb */
  }

  /* For Firefox */
  .scrollable {
    scrollbar-width: thin; /* Use 'thin' for thin scrollbar */
    scrollbar-color: rgba(0, 0, 0, 0.3) transparent; /* Thumb color and track color */
  }

  align-items: center;
  gap: 5px;
  color: white;
  font-size: 14px;
`

export const StyledQuickGuide = styled.h3`
  text-align: center;
  border-bottom: 1px solid #969290;
`

export const Item = styled.div<StyledQuickGuideTokenProps>`
  display: flex;
  background-color: ${({ expansion }) =>
    colorVariants[expansion as ExpansionTypes] || colorVariants.default};

  &:nth-of-type(odd) {
    flex-direction: row;
    width: 100%;
    border-radius: 200px 100px 100px 200px;
    text-align: left;
  }

  &:nth-of-type(even) {
    flex-direction: row-reverse;
    width: 100%;
    border-radius: 100px 200px 200px 100px;
    text-align: right;
  }

  gap: 10px;
  align-items: center;
`

export const StyledQuickGuideToken = styled.img<StyledQuickGuideTokenProps>`
  background-image: ${({ backgroundImage }) => `url(${backgroundImage})`};
  border-radius: 50%;
  width: 50px;
  height: 50px;
  filter: drop-shadow(8px 5px 5px black);
`

export const QuickGuideRule = styled.span`
  color: white;
  font-size: 14px;
`
