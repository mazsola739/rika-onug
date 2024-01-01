import {
  CardType,
  ExpansionType,
  ExpansionsType,
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

export const BASE_TIME = 3
export const ACTION_TIME = 6
export const VOTING_TIME = 240

export const doppelganger_nightaction: Record<string, number> = {
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

export const doppelgangerActionsIds: number[] = [
  9, 8, 11, 2, 25, 17, 22, 18, 23, 27, 26, 32, 31, 34, 85,
]

export const alienTeam: number[] = [42, 43, 47, 54, 74]
export const wolfTeam: number[] = [7, 15, 16, 17, 21, 22, 83]
export const vampireTeam: number[] = [38, 39, 40, 41]
export const assassinTeam: number[] = [29]
export const tannerTeam: number[] = [10, 71]
export const syntheticTeam: number[] = [53]
export const blobTeam: number[] = [44]
export const morticianTeam: number[] = [49]
export const apprenticeassassinTeam: number[] = [28]
export const doppelgangerTeam: number[] = [1]

export const wolfIds: number[] = [15, 16, 17, 22, 21]
export const wolfIdsToCheck: number[] = [15, 16, 21, 22]
export const alienIds: number[] = [42, 43, 47, 53, 54, 74]
export const supervillainIds: number[] = [57, 60, 65, 69]
export const supervillainIdsToCheck: number[] = [57, 60, 65]

export const alienStoreAnyKeys: string[] = [
  'identifier_any_text',
  'identifier_anyeven_text',
  'identifier_anyodd_text',
  'activePlayers',
]

export const alienStoreAllKeys: string[] = [
  'identifier_everyone_text',
  'identifier_oddplayers_text',
  'identifier_evenplayers_text',
]

export const bodysnatcherStoreKeys: string[] = [
  'identifier_any_text',
  'identifier_anyeven_text',
  'identifier_anyodd_text',
  'identifier_leftneighbor_text',
  'identifier_rightneighbor_text',
  'identifier_bothneighbors_text',
]

export const empathStoreAllKeys: string[] = [
  'identifier_everyone_text',
  'identifier_oddplayers_text',
  'identifier_evenplayers_text',
  'activePlayers',
]

export const morticianStoreAllKeys: string[] = [
  'identifier_leftneighbor_text',
  'identifier_rightneighbor_text',
  'identifier_oneneighbor_text',
  'identifier_yourself_text',
]

export const oracleResultKeys = [
  'oracle_viewplayer_result_text',
  'oracle_viewplayer_result2_text',
]

export const psychicStoreKeys: string[] = [
  'identifier_anyeven_text',
  'identifier_anyodd_text',
]

export const rascalStoreAnyOneKeys: string[] = [
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

export const rascalStoreAnyTwoKeys: string[] = [
  'identifier_any2_text',
  'identifier_any2even_text',
  'identifier_any2odd_text',
  'identifier_any2higher_text',
  'identifier_any2lower_text',
  'identifier_2leftneighbors_text',
  'identifier_2rightneighbors_text',
]
