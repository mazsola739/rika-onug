import {
  CardType,
  ExpansionType,
  ExpansionsType,
  TeamNames as TeamNamesTypes,
  TeamType,
  TeamsType,
  TokenType,
  WakeType,
} from 'types'

export const teams: TeamsType = {
  village: 0,
  hero: 1,
  own: 2,
  werewolf: 3,
  vampire: 4,
  alien: 5,
  villain: 6,
}

export const expansions: ExpansionsType = {
  onuw: 'Werewolf',
  onud: 'Daybreak',
  onuv: 'Vampire',
  onua: 'Alien',
  onus: 'Super Villians',
  onub: 'Bonus Roles',
}

export const teamNames: TeamNamesTypes = {
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

export const emptyCard: CardType = {
  id: 0,
  card_name: '',
  display_name: '',
  rules: '',
  expansion: '',
  team: '',
  wake_up_time: '',
}

export const emptyToken: TokenType = {
  id: 0,
  token_name: '',
  rules: '',
  expansion: '',
}

export const wake: WakeType = {
  day: 'day',
  twilight: 'twilight',
  dusk: 'dusk',
  night: 'night',
}

export const expansion: ExpansionType = {
  werewolf: 'onuw',
  daybreak: 'onud',
  vampire: 'onuv',
  alien: 'onua',
  supervillains: 'onus',
  bonusroles: 'onub',
}

export const team: TeamType = {
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

export const evils = ['vampire', 'alien', 'werewolf', 'supervillain']
