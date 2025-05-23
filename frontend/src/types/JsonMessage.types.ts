import * as narration_text from 'constants/narrations'

export type ActualSceneType = {
  scene_number: number
  scene_title: string
}

export type CardPositionType =
  | 'player_1'
  | 'player_2'
  | 'player_3'
  | 'player_4'
  | 'player_5'
  | 'player_6'
  | 'player_7'
  | 'player_8'
  | 'player_9'
  | 'player_10'
  | 'player_11'
  | 'player_12'
  | 'center_wolf'
  | 'center_left'
  | 'center_middle'
  | 'center_right'
  | 'center_villain'

export type CenterCardType = {
  card_id: number
  card_position: CardPositionType
  card_role: string
  card_team: string
  guess_cards?: number[]
}

export type GuessedCardType = {
  guessed_roles: number[]
  position: CardPositionType
}
export type InteractionType = {
  aliens?: CardPositionType[]
  answer_options?: string[]
  artifacted_cards?: CardPositionType[]
  apprenticeassassins?: CardPositionType[]
  assassins?: CardPositionType[]
  cow?: CardPositionType[]
  current?: CardPositionType[]
  dreamwolf?: CardPositionType[]
  evilometer?: CardPositionType[]
  groobzerb?: CardPositionType[]
  lovers?: CardPositionType[]
  madscientist?: CardPositionType[]
  masons?: CardPositionType[]
  new_role_id?: number
  obligatory?: boolean
  part_of_blob?: CardPositionType[]
  part_of_family?: CardPositionType[]
  private_message?: string[]
  seers?: CardPositionType[]
  scene_end?: boolean
  selectable_card_limit?: {
    player: number
    center: number
  }
  selectable_cards?: CardPositionType[]
  selectable_mark_limit?: {
    mark: number
  }
  selectable_marks?: CardPositionType[]
  shielded_cards?: CardPositionType[]
  show_cards?: Record<CardPositionType, number>[]
  show_marks?: Record<CardPositionType, string>[]
  tanner?: CardPositionType[]
  vampires?: CardPositionType[]
  villains?: CardPositionType[]
  vote?: boolean
  werewolves?: CardPositionType[]
  witness?: CardPositionType[]
}

export type NarrationType = keyof typeof narration_text

export type PlayerType = {
  flag?: boolean
  guess_cards?: number[]
  player_artifact?: number
  player_card_id?: number
  player_mark?: string
  player_name: string
  player_number?: CardPositionType
  player_role?: string
  player_team?: string
}

export type ResultType = {
  player_number: CardPositionType
  name: string
  voters: CardPositionType[] | []
  win: boolean
  survived: boolean
}

export type SendJsonMessageType<T> = (jsonMessage: T, keep?: boolean) => void

export type VoteType = {
  player_1?: CardPositionType[]
  player_2?: CardPositionType[]
  player_3?: CardPositionType[]
  player_4?: CardPositionType[]
  player_5?: CardPositionType[]
  player_6?: CardPositionType[]
  player_7?: CardPositionType[]
  player_8?: CardPositionType[]
  player_9?: CardPositionType[]
  player_10?: CardPositionType[]
  player_11?: CardPositionType[]
  player_12?: CardPositionType[]
}

export type WsJsonMessageType = {
  actual_scene?: ActualSceneType
  alien_votes?: VoteType
  artifacted_cards?: CardPositionType[]
  center_cards?: CenterCardType[]
  day_mode?: boolean
  empath_votes?: VoteType
  errors?: string[]
  guess_cards?: number[]
  guessed_cards?: GuessedCardType[]
  action?: InteractionType
  loser_teams?: string[]
  message?: string
  narration?: NarrationType[]
  narrations?: Record<string, NarrationType[]>[]
  night_mode?: boolean
  nicknames?: string[]
  path?: string
  player?: PlayerType
  players?: PlayerType[]
  player_names?: string[]
  room_id?: string
  scene_end?: boolean
  selectable_card_limit?: {
    player: number
    center: number
  }
  selectable_cards?: CardPositionType[]
  selected_cards?: number[]
  selected_expansions?: string[]
  shielded_cards?: CardPositionType[]
  show_cards?: Record<CardPositionType, number>[]
  stage?: string
  success?: boolean
  title?: string
  token?: string
  total_players?: number
  type?: string
  update?: boolean
  vampire_votes?: VoteType
  vote_result?: ResultType[]
  winner_teams?: string[]
}
