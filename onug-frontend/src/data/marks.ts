import { expansion, rules_mark } from 'constant'
import { TokenType } from 'types'

export const marks: TokenType[] = [
  {
    id: 300,
    expansion: expansion.vampire,
    card_name: 'mark_of_vampire',
    rules: rules_mark.rules_vampire,
  },
  {
    id: 301,
    expansion: expansion.vampire,
    card_name: 'mark_of_fear',
    rules: rules_mark.rules_fear,
  },
  {
    id: 302,
    expansion: expansion.vampire,
    card_name: 'mark_of_the_bat',
    rules: rules_mark.rules_bat,
  },
  {
    id: 303,
    expansion: expansion.vampire,
    card_name: 'mark_of_disease',
    rules: rules_mark.rules_disease,
  },
  {
    id: 304,
    expansion: expansion.vampire,
    card_name: 'mark_of_love',
    rules: rules_mark.rules_love,
  },
  {
    id: 305,
    expansion: expansion.vampire,
    card_name: 'mark_of_traitor',
    rules: rules_mark.rules_traitor,
  },
  {
    id: 306,
    expansion: expansion.vampire,
    card_name: 'mark_of_clarity',
    rules: rules_mark.rules_clarity,
  },
  {
    id: 307,
    expansion: expansion.vampire,
    card_name: 'mark_of_assassin',
    rules: rules_mark.rules_assassin,
  },
  /*   {
    id: 0,
    expansion: '',
    card_name: '',
    rules: '',
  }, */
]
