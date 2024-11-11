import { Player, CardJson, TokenJson, TablePlayerCard } from 'types'

export const default_player: Player = {
  player_name: '',
  player_number: null,
  player_card_id: 0,
  player_mark: '',
  player_artifact: 0,
  player_role: '',
  player_team: '',
  flag: false
}

export const default_table_player_card: TablePlayerCard = {
  artifact: false,
  card_name: '',
  dreamwolf: false,
  mark: '',
  player_name: '',
  position: null,
  selectable_card: false,
  selectable_mark: false,
  shield: false,
  werewolves: false
}

export const default_card: CardJson = {
  id: 0,
  card_name: '',
  display_name: '',
  rules: '',
  expansion: '',
  team: '',
  wake_up_time: ''
}

export const default_token: TokenJson = {
  id: 0,
  token_name: '',
  rules: '',
  expansion: ''
}
