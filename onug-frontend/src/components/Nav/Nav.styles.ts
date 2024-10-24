import styled from '@emotion/styled';

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

export const StyledNav = styled.nav`
  display: flex;
  text-align: start;
  width: 150px;
  margin: 10px;
`

export const UnorderedLists = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  width: 150px;
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
