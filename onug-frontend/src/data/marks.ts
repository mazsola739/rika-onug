import { expansion, rules_mark } from 'constant'
import { TokenType } from 'types'

export const marks: TokenType[] = [
  {
    id: 1,
    expansion: expansion.vampire,
    token_name: 'mark_of_vampire',
    rules: rules_mark.rules_vampire,
    is_in_deck: false,
  },
  {
    id: 2,
    expansion: expansion.vampire,
    token_name: 'mark_of_fear',
    rules: rules_mark.rules_fear,
    is_in_deck: false,
  },
  {
    id: 3,
    expansion: expansion.vampire,
    token_name: 'mark_of_the_bat',
    rules: rules_mark.rules_bat,
    is_in_deck: false,
  },
  {
    id: 4,
    expansion: expansion.vampire,
    token_name: 'mark_of_disease',
    rules: rules_mark.rules_disease,
    is_in_deck: false,
  },
  {
    id: 5,
    expansion: expansion.vampire,
    token_name: 'mark_of_love',
    rules: rules_mark.rules_love,
    is_in_deck: false,
  },
  {
    id: 6,
    expansion: expansion.vampire,
    token_name: 'mark_of_love',
    rules: rules_mark.rules_love,
    is_in_deck: false,
  },
  {
    id: 7,
    expansion: expansion.vampire,
    token_name: 'mark_of_traitor',
    rules: rules_mark.rules_traitor,
    is_in_deck: false,
  },
  {
    id: 8,
    expansion: expansion.vampire,
    token_name: 'mark_of_clarity',
    rules: rules_mark.rules_clarity,
    is_in_deck: false,
  },
  {
    id: 9,
    expansion: expansion.vampire,
    token_name: 'mark_of_clarity',
    rules: rules_mark.rules_clarity,
    is_in_deck: false,
  },
  {
    id: 10,
    expansion: expansion.vampire,
    token_name: 'mark_of_assassin',
    rules: rules_mark.rules_assassin,
    is_in_deck: false,
  },
  /*   {
    id: 0,
    expansion: '',
    token_name: '',
    rules: '',
  }, */
]
