export interface StartingCardType {
  name: string
  team: string
  artifact: string
  shield: boolean
  mark: string
}

export interface ChangedCardType {
  new_name: string
  new_team: string
  new_artifact: string
  new_shield: boolean
  new_mark: string
}

export interface EndOfGameType {
  votes: number
  pointed_at_who: string
}

export interface PlayerType {
  starting_card: StartingCardType
  gameplay_changes: ChangedCardType[]
  end_of_game: EndOfGameType
}
