import { EXPANSION, rules_mark } from 'constants'
import { TokenJson } from 'types'

export const marks: TokenJson[] = [
  {
    id: 1,
    expansion: EXPANSION.vampire,
    token_name: 'mark_of_vampire',
    rules: rules_mark.rules_vampire
  },
  {
    id: 2,
    expansion: EXPANSION.vampire,
    token_name: 'mark_of_fear',
    rules: rules_mark.rules_fear
  },
  {
    id: 3,
    expansion: EXPANSION.vampire,
    token_name: 'mark_of_the_bat',
    rules: rules_mark.rules_bat
  },
  {
    id: 4,
    expansion: EXPANSION.vampire,
    token_name: 'mark_of_disease',
    rules: rules_mark.rules_disease
  },
  {
    id: 5,
    expansion: EXPANSION.vampire,
    token_name: 'mark_of_love',
    rules: rules_mark.rules_love
  },
  {
    id: 6,
    expansion: EXPANSION.vampire,
    token_name: 'mark_of_love',
    rules: rules_mark.rules_love
  },
  {
    id: 7,
    expansion: EXPANSION.vampire,
    token_name: 'mark_of_traitor',
    rules: rules_mark.rules_traitor
  },
  {
    id: 8,
    expansion: EXPANSION.vampire,
    token_name: 'mark_of_clarity',
    rules: rules_mark.rules_clarity
  },
  {
    id: 9,
    expansion: EXPANSION.vampire,
    token_name: 'mark_of_clarity',
    rules: rules_mark.rules_clarity
  },
  {
    id: 10,
    expansion: EXPANSION.vampire,
    token_name: 'mark_of_assassin',
    rules: rules_mark.rules_assassin
  }
  /*   {
    id: 0,
    expansion: '',
    token_name: '',
    rules: '',
  }, */
]
