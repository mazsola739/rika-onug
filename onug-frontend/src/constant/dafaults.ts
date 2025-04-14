import { PlayerType, CardJson, TokenJson } from 'types'

export const default_player: PlayerType = {
  player_name: '',
  player_number: null,
  player_card_id: 0,
  player_mark: '',
  player_artifact: 0,
  player_role: '',
  player_team: '',
  flag: false
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
