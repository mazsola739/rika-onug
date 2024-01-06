export type TokenType = {
  id: number
  expansion: string
  token_name: string
  rules: string
}

export type MarkType = {
  id: number
  display_name: string
  token_name: string
  is_in_deck: boolean
}
