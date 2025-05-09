export type ColorVariant = keyof typeof buttonColorvariants
export const buttonColorvariants = {
  default: '#ffea00',
  red: '#f44336',
  magenta: '#ff00ff',
  purple: '#8e44ad',
  green: '#28a745',
  blue: '#007bff',
  crimson: '#dc3545',
  orange: '#ff9800',
  yellow: '#FFFF00'
}

export type ExpansionTypes = 'Werewolf' | 'Bonus Roles' | 'Daybreak' | 'Vampire' | 'Alien' | 'Super Villains' | 'default'
export const expansionColorVariants: Record<ExpansionTypes, string> = {
  Werewolf: '#364C541A',
  'Bonus Roles': '#A12E631A',
  Daybreak: '#CF46311A',
  Vampire: '#48397A1A',
  Alien: '#A4CA631A',
  'Super Villains': '#469FDF1A',
  default: 'rgba(0, 0, 0, 0.3)'
}

export type AnchorTypes = 'Village & Hero' | 'Village' | 'Hero' | 'Own' | 'Werewolf' | 'Vampire' | 'Alien' | 'Villain'
export const anchorColorVariants: Record<AnchorTypes, string> = {
  'Village & Hero': 'royalblue',
  Village: 'royalblue',
  Hero: 'royalblue',
  Own: 'saddlebrown',
  Werewolf: 'DarkRed',
  Vampire: 'DarkSlateBlue',
  Alien: 'DarkGreen',
  Villain: 'MediumVioletRed'
}
export const imageVariants: Record<AnchorTypes, string> = {
  'Village & Hero': '/assets/playingcards/troublemaker_2.webp',
  Village: '/assets/playingcards/troublemaker_2.webp',
  Hero: '/assets/playingcards/innocent_bystander.webp',
  Own: '/assets/playingcards/tanner_2.webp',
  Werewolf: '/assets/playingcards/werewolf_2.webp',
  Vampire: '/assets/playingcards/the_count.webp',
  Alien: '/assets/playingcards/alien_female.webp',
  Villain: '/assets/playingcards/henchman_7.webp'
}
