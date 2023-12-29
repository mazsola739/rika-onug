export type StartingCardType = {
  card_name: string
  display_name: string
  team: string
  artifact: string
  shield: boolean
  mark: string
  rules: string
}

export type ChangedCardType = {
  new_name: string
  new_team: string
  new_artifact: string
  new_shield: boolean
  new_mark: string
}

export type EndOfGameType = {
  votes: number
  pointed_at_who: string
}

export type PlayerType = {
  player_name: string
  avatar: string
  starting_card: StartingCardType
  gameplay_changes: ChangedCardType[]
  end_of_game: EndOfGameType
}
