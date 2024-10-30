import { Player, CardJson, TokenJson, TablePlayerCard } from "types"

export const default_player: Player = {
    player_name: '',
    player_number: '',
    player_card_id: 0,
    ready: false,
  }
  
  export const default_table_player_card: TablePlayerCard = {
    player_name: '',
    card_name: '',
    mark: '',
    artifact: false,
    shield: false,
    selectable: false,
  }
  
  export const default_card: CardJson = {
    id: 0,
    card_name: '',
    display_name: '',
    rules: '',
    expansion: '',
    team: '',
    wake_up_time: '',
  }
  
  export const default_token: TokenJson = {
    id: 0,
    token_name: '',
    rules: '',
    expansion: '',
  }