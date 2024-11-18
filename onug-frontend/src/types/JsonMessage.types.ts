import * as messages_text from 'constant/messages'
import * as narration_text from 'constant/narrations'
import * as identifier from 'constant/narrations/identifier'

export type SendJsonMessageType<T> = (jsonMessage: T, keep?: boolean) => void

export type Player = {
  player_card_id?: number
  player_role?: string
  player_team?: string
  player_name: string
  player_number?: CardPosition
  player_mark?: string
  player_artifact?: number
  flag?: boolean
  guess_cards?: number[]
}

export type CenterCard = {
  card_position: CardPosition
  card_id: number
  card_role: string
  card_team: string
  guess_cards?: number[]
}

export type Expansion = 'Werewolf' | 'Daybreak' | 'Vampire' | 'Alien' | 'Super Villains' | 'Bonus Roles'

export type CardPosition =
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

export type GuessToken = {
  image: string
  expansion: string
  id: number
}

export type GuessedCard = {
  position: CardPosition
  guessed_roles: number[]
}

export type TablePlayerCard = {
  aliens?: boolean
  artifact?: boolean
  apprenticeassassins?: boolean
  assassins?: boolean
  card_name?: string
  dreamwolf?: boolean
  groobzerb?: boolean
  lovers?: boolean
  madscientist?: boolean
  mark?: string
  masons?: boolean
  part_of_blob?: boolean
  part_of_family?: boolean
  player_name?: string
  position?: CardPosition
  role?: string
  seers?: boolean
  selectable_card?: boolean
  selectable_mark?: boolean
  selected?: boolean
  shield?: boolean
  tanner?: boolean
  team?: string
  vampires?: boolean
  villains?: boolean
  werewolves?: boolean
}

export type TableCenterCard = {
  card_name?: string
  position?: CardPosition
  role?: string
  selectable_card?: boolean
  selected?: boolean
  team?: string
}

export type ActualScene = {
  scene_number: number
  scene_title: string
}

export type Interaction = {
  aliens?: CardPosition[]
  answer_options?: string[]
  artifacted_cards?: CardPosition[]
  apprenticeassassins?: CardPosition[]
  assassins?: CardPosition[]
  dreamwolf?: CardPosition[]
  groobzerb?: CardPosition[]
  lovers?: CardPosition[]
  madscientist?: CardPosition[]
  masons?: CardPosition[]
  new_role_id?: number
  obligatory?: boolean
  part_of_blob?: CardPosition[]
  part_of_family?: CardPosition[]
  private_message?: string[]
  seers?: CardPosition[]
  scene_end?: boolean
  selectable_card_limit?: {
    player: number
    center: number
  }
  selectable_cards?: CardPosition[]
  selectable_mark_limit?: {
    mark: number
  }
  selectable_marks?: CardPosition[]
  shielded_cards?: CardPosition[]
  show_cards?: Record<CardPosition, number>[]
  show_marks?: Record<CardPosition, string>[]
  tanner?: CardPosition[]
  vampires?: CardPosition[]
  villains?: CardPosition[]
  werewolves?: CardPosition[]
}

export type Result = {
  player_number: CardPosition
  name: string
  voters: CardPosition[] | []
  win: boolean
  survived: boolean
}

export type NarrationType = keyof typeof narration_text

export type MessagesType = keyof typeof messages_text

export type IdentifierType = keyof typeof identifier

export type WsJsonMessage = {
  actual_scene?: ActualScene
  artifacted_cards?: CardPosition[]
  center_cards?: CenterCard[]
  day_mode?: boolean
  errors?: string[]
  guess_cards?: number[]
  guessed_cards?: GuessedCard[]
  interaction?: Interaction
  loser_teams?: string[]
  message?: string
  narration?: NarrationType[]
  narrations?: Record<string, NarrationType[]>[]
  night_mode?: boolean
  path?: string
  player?: Player
  players?: Player[]
  room_id?: string
  scene_end?: boolean
  selectable_card_limit?: {
    player: number
    center: number
  }
  selectable_cards?: CardPosition[]
  selected_cards?: number[]
  selected_expansions?: string[]
  shielded_cards?: CardPosition[]
  show_cards?: Record<CardPosition, number>[]
  stage?: string
  success?: boolean
  title?: string
  token?: string
  type?: string
  update?: boolean
  vote_result?: Result[]
  winner_teams?: string[]
}
