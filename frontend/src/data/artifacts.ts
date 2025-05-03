import { EXPANSION, rules_artifact, rules_shield } from 'constants'
import { TokenJson } from 'types'

export const artifacts: TokenJson[] = [
  {
    id: 1,
    expansion: EXPANSION.daybreak,
    token_name: 'shield',
    rules: rules_shield.rules_shield
  },
  {
    id: 2,
    expansion: EXPANSION.daybreak,
    token_name: 'claw_of_the_werewolf',
    rules: rules_artifact.rules_werewolf
  },
  {
    id: 3,
    expansion: EXPANSION.daybreak,
    token_name: 'brand_of_the_villager',
    rules: rules_artifact.rules_villager
  },
  {
    id: 4,
    expansion: EXPANSION.daybreak,
    token_name: 'cudgel_of_the_tanner',
    rules: rules_artifact.rules_tanner
  },
  {
    id: 5,
    expansion: EXPANSION.daybreak,
    token_name: 'void_of_nothingness',
    rules: rules_artifact.rules_nothingness
  },
  {
    id: 6,
    expansion: EXPANSION.daybreak,
    token_name: 'mask_of_muting',
    rules: rules_artifact.rules_muting
  },
  {
    id: 7,
    expansion: EXPANSION.daybreak,
    token_name: 'shroud_of_shame',
    rules: rules_artifact.rules_shame
  },
  {
    id: 8,
    expansion: EXPANSION.bonusroles,
    token_name: 'bow_of_the_hunter',
    rules: rules_artifact.rules_hunter
  },
  {
    id: 9,
    expansion: EXPANSION.bonusroles,
    token_name: 'cloak_of_the_prince',
    rules: rules_artifact.rules_prince
  },
  {
    id: 10,
    expansion: EXPANSION.bonusroles,
    token_name: 'sword_of_the_bodyguard',
    rules: rules_artifact.rules_bodyguard
  },
  {
    id: 11,
    expansion: EXPANSION.bonusroles,
    token_name: 'mist_of_the_vampire',
    rules: rules_artifact.rules_vampire
  },
  {
    id: 12,
    expansion: EXPANSION.bonusroles,
    token_name: 'dagger_of_the_traitor',
    rules: rules_artifact.rules_traitor
  },
  {
    id: 13,
    expansion: EXPANSION.bonusroles,
    token_name: 'alien_artifact',
    rules: rules_artifact.rules_alien
  }
  /*   {
    id: 0,
    expansion: '',
    token_name: '',
    rules: '',
  }, */
]
