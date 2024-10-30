import * as messages_text from 'constant/messages'
import * as narration_text from 'constant/narrations'

export type SendJsonMessageType<T> = (jsonMessage: T, keep?: boolean) => void

export type Player = {
  player_name: string
  player_number?: string
  player_card_id?: number
  ready?: boolean
}

export type Expansion = "Werewolf" | "Daybreak" | "Vampire" | "Alien" | "Super Villains" | "Bonus Roles"

export type CardPosition = 'player_1' | 'player_2' | 'player_3' | 'player_4' | 'player_5' | 'player_6' | 'player_7' | 'player_8' | 'player_9' | 'player_10' | 'player_11' | 'player_12' | 'center_wolf' | 'center_left' | 'center_middle' | 'center_right' | 'center_villain'

export type TablePlayerCard = {
  player_name?: string
  position?: CardPosition
  card_name?: string
  mark?: string
  artifact?: boolean
  shield?: boolean
  selectable?: boolean
}

export type TableCenterCard = { 
  position?: CardPosition
  card_name?: string
  selectable?: boolean
}

export type ActualSceneType = {
  scene_number: number
  scene_title: string
}

export type InteractionType = {
  answer_options?: string[]
  artifacted_cards?: string[]
  new_role_id?: number,
  private_message?: string[]
  selectable_card_limit?: {
    player: number
    center: number
  }
  selectable_cards?: string[]
  selectable_mark_limit?: {
    mark: number
  }
  shielded_cards?: string[]
  show_cards?: Record<CardPosition, number>[]
  show_marks?: Record<CardPosition, string>[]
}

export type NarrationType = keyof typeof narration_text

export type MessagesType = keyof typeof messages_text

export type WsJsonMessage = {
  actual_scene?: ActualSceneType
  errors?: string[]
  interaction?: InteractionType
  message?: string
  narration?: NarrationType[]
  path?: string
  player?: Player
  players?: Player[]
  room_id?: string
  selected_cards?: number[]
  selected_expansions?: string[]
  stage?: string
  success?: boolean
  title?: string
  token?: string
  type?: string
  update?: boolean
}
