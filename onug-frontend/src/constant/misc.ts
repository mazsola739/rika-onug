import { CardType, ExpansionType, ExpansionsType, TeamNames as TeamNamesTypes, TeamType, TeamsType, TokenType, WakeType } from 'types'

export const TEAMS: TeamsType = {
  village: 0,
  hero: 1,
  own: 2,
  werewolf: 3,
  vampire: 4,
  alien: 5,
  villain: 6,
}

export const EXPANSIONS: ExpansionsType = {
  werewolf: 'Werewolf',
  daybreak: 'Daybreak',
  vampire: 'Vampire',
  alien: 'Alien',
  supervillains: 'Super Villains',
  bonusroles: 'Bonus Roles',
}

export const TEAM_NAMES: TeamNamesTypes = {
  werewolf: 'Werewolf',
  vampire: 'Vampire',
  alien: 'Alien',
  villain: 'Villain',
  villager: 'Villager',
  hero: 'Heroes',
  synthetic: 'Synthetic',
  tanner: 'Tanner',
  assassin: 'Assassin',
  apprenticeassassin: 'Apprentice Assassin',
  blob: 'Blob',
  mortician: 'Mortician',
  nostradamus: 'Nostradamus',
  mad: 'Mad',
  family: 'Family',
  traitor: 'Traitor',
}

export const EMPTY_CARD: CardType = {
  id: 0,
  card_name: '',
  display_name: '',
  rules: '',
  expansion: '',
  team: '',
  wake_up_time: '',
}

export const EMPTY_TOKEN: TokenType = {
  id: 0,
  token_name: '',
  rules: '',
  expansion: '',
}

export const WAKE: WakeType = {
  day: 'day',
  twilight: 'twilight',
  dusk: 'dusk',
  night: 'night',
}

export const EXPANSION: ExpansionType = {
  werewolf: 'werewolf',
  daybreak: 'daybreak',
  vampire: 'vampire',
  alien: 'alien',
  supervillains: 'supervillains',
  bonusroles: 'bonusroles',
}

export const TEAM: TeamType = {
  village: 'village',
  hero: 'hero',
  own: 'own',
  werewolf: 'werewolf',
  vampire: 'vampire',
  alien: 'alien',
  villain: 'villain',
}

export const conjunction_and = 'and'
export const conjunction_or = 'or'

export const direction_left = 'left'
export const direction_right = 'right'

export const evils = ['vampire', 'alien', 'werewolf', 'supervillain']
