import styled from '@emotion/styled'

type AnchorTypes = 'Village & Hero' | 'Village' | 'Hero' | 'Own' | 'Werewolf' | 'Vampire' | 'Alien' | 'Villain'

const colorVariants: Record<AnchorTypes, string> = {
  'Village & Hero': 'royalblue',
  Village: 'royalblue',
  Hero: 'royalblue',
  Own: 'saddlebrown',
  Werewolf: 'DarkRed',
  Vampire: 'DarkSlateBlue',
  Alien: 'DarkGreen',
  Villain: 'MediumVioletRed'
}

const imageVariants: Record<AnchorTypes, string> = {
  'Village & Hero': '/assets/playingcards/troublemaker_2.webp',
  Village: '/assets/playingcards/troublemaker_2.webp',
  Hero: '/assets/playingcards/innocent_bystander.webp',
  Own: '/assets/playingcards/tanner_2.webp',
  Werewolf: '/assets/playingcards/werewolf_2.webp',
  Vampire: '/assets/playingcards/the_count.webp',
  Alien: '/assets/playingcards/alien_female.webp',
  Villain: '/assets/playingcards/henchman_7.webp'
}

export interface NavListItemProps {
  anchor: string
}

const isAnchorType = (anchor: string): anchor is AnchorTypes => {
  return anchor in colorVariants
}

export const getBackgroundColor = (anchor: string): string => {
  if (isAnchorType(anchor)) {
    return colorVariants[anchor]
  }
  return colorVariants['Village']
}

export const getBackgroundImage = (anchor: string): string => {
  if (isAnchorType(anchor)) {
    return imageVariants[anchor]
  }
  return imageVariants['Village']
}

export const StyledNav = styled.nav`
  display: flex;
  text-align: start;
  width: 150px;
  margin: 10px;
  flex-direction: column;
`

export const NavButtons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
  width: 100%;
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
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 -30px;
  }
`
