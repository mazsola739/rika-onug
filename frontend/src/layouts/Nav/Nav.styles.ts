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
  /* Box Model */
  padding: 0.625rem;

  /* Flexbox/Grid */
  display: flex;
  flex-direction: column;

  /* Typography */
  text-align: start;
`

export const NavButtons = styled.div`
  /* Box Model */
  width: 100%;

  /* Flexbox/Grid */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 0.625rem;
`
