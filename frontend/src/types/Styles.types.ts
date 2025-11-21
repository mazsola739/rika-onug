export type ColorVariant = keyof typeof buttonColorVariants
export const buttonColorVariants = {
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

//TODO BETTER TYPES!!!!!!!!!!!!!!!!!!

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

export type AnchorTypes = 'Village' | 'Hero' | 'Own' | 'Werewolf' | 'Vampire' | 'Alien' | 'Villain'
export const anchorColorVariants: Record<AnchorTypes, string> = {
  //TODO do i need color?
  Village: 'RoyalBlue',
  Hero: 'RoyalBlue',
  Own: 'SaddleBrown',
  Werewolf: 'DarkRed',
  Vampire: 'DarkSlateBlue',
  Alien: 'DarkGreen',
  Villain: 'MediumVioletRed'
}
export const imageVariants: Record<AnchorTypes, string> = {
  Village: '/assets/playingcards/troublemaker_2.webp',
  Hero: '/assets/playingcards/innocent_bystander.webp', //TODO change image
  Own: '/assets/playingcards/tanner_2.webp',
  Werewolf: '/assets/playingcards/werewolf_2.webp',
  Vampire: '/assets/playingcards/the_count.webp',
  Alien: '/assets/playingcards/alien_female.webp',
  Villain: '/assets/playingcards/henchman_7.webp'
}
