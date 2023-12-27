import { CardType, ExpansionsType, TeamsType, TokenType } from 'types'

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

export const emptyCard: CardType = {
  id: 0,
  card_name: '',
  display_name: '',
  rules: '',
  expansion: '',
  team: '',
  wake_up_time: '',
  order: 0,
}

export const emptyToken: TokenType = {
  id: 0,
  card_name: '',
  rules: '',
  expansion: '',
}

export const wake = {
  day: 'day',
  twilight: 'twilight',
  dusk: 'dusk',
  night: 'night',
}

export const expansion = {
  werewolf: 'onuw',
  daybreak: 'onud',
  vampire: 'onuv',
  alien: 'onua',
  supervillains: 'onus',
  bonusroles: 'onub',
}

export const team = {
  village: 'village',
  hero: 'hero',
  own: 'own',
  werewolf: 'werewolf',
  vampire: 'vampire',
  alien: 'alien',
  villain: 'villain',
}

export const BASE_TIME = 5

export const doppelganger_nightaction = {
  role_alphawolf: 17,
  role_apprenticeseer: 18,
  role_cupid: 31,
  role_diseased: 32,
  role_drunk: 2,
  role_instigator: 34,
  role_mysticwolf: 22,
  role_paranormalinvestigator: 23,
  role_robber: 8,
  role_sentinel: 25,
  role_seer: 9,
  role_thing: 85,
  role_troublemaker: 11,
  role_villageidiot: 26,
  role_witch: 27,
}
export const doppelgangerActionsIds = [
  9, 8, 11, 2, 25, 17, 22, 18, 23, 27, 26, 32, 31, 34, 85,
]
export const wolfIds = [15, 16, 17, 22, 21]
export const wolfIdsToCheck = [15, 16, 21, 22]
export const alienIds = [42, 43, 47, 53, 54, 74]
export const supervillainIds = [57, 60, 65, 69]
export const supervillainIdsToCheck = [57, 60, 65]

export const alienStoreAnyKeys = [
  'identifier_any_text',
  'identifier_anyeven_text',
  'identifier_anyodd_text',
  'activePlayers',
]
export const alienStoreAllKeys = [
  'identifier_everyone_text',
  'identifier_oddplayers_text',
  'identifier_evenplayers_text',
]
export const bodysnatcherStoreKeys = [
  'identifier_any_text',
  'identifier_anyeven_text',
  'identifier_anyodd_text',
  'identifier_leftneighbor_text',
  'identifier_rightneighbor_text',
  'identifier_bothneighbors_text',
]
export const empathStoreAllKeys = [
  'identifier_everyone_text',
  'identifier_oddplayers_text',
  'identifier_evenplayers_text',
  'activePlayers',
]

export const morticianStoreAllKeys = [
  'identifier_leftneighbor_text',
  'identifier_rightneighbor_text',
  'identifier_oneneighbor_text',
  'identifier_yourself_text',
]

export const psychicStoreKeys = [
  'identifier_anyeven_text',
  'identifier_anyodd_text',
]
export const rascalStoreAnyOneKeys = [
  'identifier_higher_text',
  'identifier_lower_text',
  'identifier_any_text',
  'identifier_anyeven_text',
  'identifier_anyodd_text',
  'identifier_oneneighbor_text',
  'identifier_center_text',
  'identifier_leftneighbor_text',
  'identifier_rightneighbor_text',
]
export const rascalStoreAnyTwoKeys = [
  'identifier_any2_text',
  'identifier_any2even_text',
  'identifier_any2odd_text',
  'identifier_any2higher_text',
  'identifier_any2lower_text',
  'identifier_2leftneighbors_text',
  'identifier_2rightneighbors_text',
]
