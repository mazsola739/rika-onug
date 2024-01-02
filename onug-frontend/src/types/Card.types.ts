export type CardType = {
  id: number
  expansion: string
  display_name: string
  team: string
  wake_up_time: string
  card_name: string
  order: number
  rules: string
}

export type ActionCardType = {
  id: number
  team: string
  wake_up_time: string
  expansion: string
  card_name: string
}
