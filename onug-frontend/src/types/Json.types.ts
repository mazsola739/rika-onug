export type CardType = {
  id: number
  expansion: string
  display_name: string
  team: string
  wake_up_time: string
  card_name: string
  rules: string
}

export type TokenType = {
  id: number
  expansion: string
  token_name: string
  rules: string
  is_in_deck?: boolean
}

export type ScriptType = {
  scene_title: string
  scene_img: string
  scene_number: number
}
