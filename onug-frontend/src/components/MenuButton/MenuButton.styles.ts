import styled from "@emotion/styled";
import { StyledMenuButtonProps } from "./MenuButton.types";

type AnchorTypes = 'Village & Hero' | 'Village' | 'Hero' | 'Own' | 'Werewolf' | 'Vampire' | 'Alien' | 'Villain';

const colorVariants: Record<AnchorTypes, string> = {
  'Village & Hero': 'royalblue',
  'Village': 'royalblue',
  'Hero': 'royalblue',
  'Own': 'saddlebrown',
  'Werewolf': 'DarkRed',
  'Vampire': 'DarkSlateBlue',
  'Alien': 'DarkGreen',
  'Villain': 'MediumVioletRed',
};

const imageVariants: Record<AnchorTypes, string> = {
  'Village & Hero': '/assets/cards/villager.png',
  'Village': '/assets/cards/villager.png',
  'Hero': '/assets/cards/innocent_bystander.png',
  'Own': '/assets/cards/tanner.png',
  'Werewolf': '/assets/cards/werewolf.png',
  'Vampire': '/assets/cards/vampire.png',
  'Alien': '/assets/cards/alien.png',
  'Villain': '/assets/cards/dr_peeker.png',
};

export interface NavListItemProps {
  anchor: string;
}

const isAnchorType = (anchor: string): anchor is AnchorTypes => {
  return anchor in colorVariants;
};

const getBackgroundColor = (anchor: string): string => {
  if (isAnchorType(anchor)) {
    return colorVariants[anchor];
  }
  return colorVariants['Village'];
};

const getBackgroundImage = (anchor: string): string => {
  if (isAnchorType(anchor)) {
    return imageVariants[anchor];
  }
  return imageVariants['Village'];
};


export const StyledMenuButton = styled.button<StyledMenuButtonProps>``


/* export const StyledFilterButton = styled.button<FilterButtonProps>`
  filter: drop-shadow(3px 3px 3px black);
  align-items: center;
  align-content: center;
  background-image: ${({ expansion }) =>
    `url(/assets/backgrounds/expansion_${expansion.toLocaleLowerCase().replace(' ', '')}.png)`};
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100% auto;
  border: ${({ isSelected }) =>
    isSelected ? '1px solid white' : '1px solid transparent'};
  color: ${({ isSelected }) =>
    isSelected ? 'white' : 'rgba(255,255,255, 0.4)'};
  text-shadow: ${({ isSelected }) =>
    isSelected ? '-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black' : ''};
  cursor: pointer;
  font-size: 20px;
  justify-content: center;
  margin: 0;
  padding: 0;
  opacity: ${({ isSelected }) => (isSelected ? '1' : '0.5')};
  display: flex;
  transition: 0.75s;
  height: 50px;
  width: 140px;

  &:hover:not(:disabled) {
    transition: 0.75s;
    color: rgba(234,239,44, 1);
    opacity: 1;
  }
`

export const ListItem = styled.li<NavListItemProps>`
  width: 140px;

  & > button {
    display: flex;
    align-items: center;
    text-decoration: none;
    margin: 0 0 10px 0;
    height: 48.4px;
    color: white;
    text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black;
    width: 138.4px;
    cursor: pointer;
    font-size: 20px;
    justify-content: center;
    border: 1px solid white;
    filter: drop-shadow(3px 3px 3px black);
    background-color: ${({ anchor }) => getBackgroundColor(anchor)};
    background-image: url(${({ anchor }) => getBackgroundImage(anchor)});
    background-size: cover;
    background-position: center;
  }
`;
 */