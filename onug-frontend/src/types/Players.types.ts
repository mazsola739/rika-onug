export type PlayerCardType = {
  card_name: string
  team: string
  artifact: string
  shield: boolean
  mark: string

  display_name: string
  rules: string
}

export type GameplayChangesType = {
  new_card_name: string
  new_team: string
  new_artifact: string
  new_shield: boolean
  new_mark: string
}

export type EndOfGameType = {
  received_votes: string[]
  given_votes: string[]
}

export type PlayerType = {
  player_name: string
  player_number: number
  player_card: PlayerCardType
  gameplay_changes: GameplayChangesType[]
  end_of_game: EndOfGameType
}
