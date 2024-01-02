import { expansion, rules_artifact } from 'constant'
import { TokenType } from 'types'

export const artifacts: TokenType[] = [
  {
    id: 200,
    expansion: expansion.daybreak,
    token_name: 'shield',
    rules: rules_artifact.rules_shield,
  },
  {
    id: 201,
    expansion: expansion.daybreak,
    token_name: 'claw_of_the_werewolf',
    rules: rules_artifact.rules_werewolf,
  },
  {
    id: 202,
    expansion: expansion.daybreak,
    token_name: 'brand_of_the_villager',
    rules: rules_artifact.rules_villager,
  },
  {
    id: 203,
    expansion: expansion.daybreak,
    token_name: 'cudgel_of_the_tanner',
    rules: rules_artifact.rules_tanner,
  },
  {
    id: 204,
    expansion: expansion.daybreak,
    token_name: 'void_of_nothingness',
    rules: rules_artifact.rules_nothingness,
  },
  {
    id: 205,
    expansion: expansion.daybreak,
    token_name: 'mask_of_muting',
    rules: rules_artifact.rules_muting,
  },
  {
    id: 206,
    expansion: expansion.daybreak,
    token_name: 'shroud_of_shame',
    rules: rules_artifact.rules_shame,
  },
  {
    id: 207,
    expansion: expansion.bonusroles,
    token_name: 'bow_of_the_hunter',
    rules: rules_artifact.rules_hunter,
  },
  {
    id: 208,
    expansion: expansion.bonusroles,
    token_name: 'cloak_of_the_prince',
    rules: rules_artifact.rules_prince,
  },
  {
    id: 209,
    expansion: expansion.bonusroles,
    token_name: 'sword_of_the_bodyguard',
    rules: rules_artifact.rules_bodyguard,
  },
  {
    id: 210,
    expansion: expansion.bonusroles,
    token_name: 'mist_of_the_vampire',
    rules: rules_artifact.rules_vampire,
  },
  {
    id: 211,
    expansion: expansion.bonusroles,
    token_name: 'dagger_of_the_traitor',
    rules: rules_artifact.rules_traitor,
  },
  {
    id: 212,
    expansion: expansion.bonusroles,
    token_name: 'alien_artifact',
    rules: rules_artifact.rules_alien,
  },
  /*   {
    id: 0,
    expansion: '',
    token_name: '',
    rules: '',
  }, */
]
