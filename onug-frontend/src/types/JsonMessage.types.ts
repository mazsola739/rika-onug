import * as narration_text from 'constant/narrations'
import * as messages_text from 'constant/messages'

export type PlayersType = {
  player_name: string
  player_number?: string
  ready?: boolean
}

export type PlayerPosition = 'player_1' | 'player_2' | 'player_3' | 'player_4' | 'player_5' | 'player_6' | 'player_7' | 'player_8' | 'player_9' | 'player_10' | 'player_11' | 'player_12'

export type TablePlayerType = {
  player_name: string
  player_number?: PlayerPosition | ''
  player_card_id?: number
  player_mark?: string
  artifact?: boolean
  shield?: boolean
}

export type PlayerType = {
  player_name: string
  player_number?: number
  player_card_id?: number
  player_original_id?: number
  player_role?: string
  player_role_id?: number
  player_team?: string
  player_mark?: string
  player_history?: unknown // TODO type: swapped cards, viewed cards, etc...
}

export type ActualSceneType = {
  scene_number: number
  scene_title: string
}


export type InteractionType = {
  answer_options?: string[]
  artifacted_cards?: string[],
  new_role_id?: number
  player?: PlayerType
  private_message?: string[],
  selectable_card_limit?: {
    player: number,
    center: number
  },
  selectable_cards?: string[],
  selectable_mark_limit?: {
    mark: number
  },
  shielded_cards?: string[],
  show_cards?: Record<PlayerPosition, number>[],
  show_marks?: Record<PlayerPosition, string>[],
}

export type NarrationType = keyof typeof narration_text
export type MessagesType = keyof typeof messages_text

export type SendJsonMessageType<T> = (jsonMessage: T, keep?: boolean) => void

export type WsJsonMessage = {
  actual_scene?: ActualSceneType
  errors?: string[]
  interaction?: InteractionType
  message?: string
  narration?: NarrationType[]
  path?: string
  player?: PlayerType
  players?: PlayersType[]
  room_id?: string
  selected_cards?: number[]
  selected_expansions?: string[]
  stage?: string
  success?: boolean
  title?: string
  token?: string
  type?: string,
  update?: boolean,
}
