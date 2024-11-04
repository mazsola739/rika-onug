import * as messages_text from 'constant/messages'
import * as narration_text from 'constant/narrations'
import * as identifier from 'constant/narrations/identifier'

export type SendJsonMessageType<T> = (jsonMessage: T, keep?: boolean) => void

export type Player = {
  player_card_id?: number
  player_role?: string
  player_team?: string
  player_mark?: string
  player_name: string
  player_number?: CardPosition
  flag?: boolean
}

export type CenterCard = {
  card_position: CardPosition,
  card_id: number,
  card_role: string,
  card_team: string
}

export type Expansion = "Werewolf" | "Daybreak" | "Vampire" | "Alien" | "Super Villains" | "Bonus Roles"

export type CardPosition = 'player_1' | 'player_2' | 'player_3' | 'player_4' | 'player_5' | 'player_6' | 'player_7' | 'player_8' | 'player_9' | 'player_10' | 'player_11' | 'player_12' | 'center_wolf' | 'center_left' | 'center_middle' | 'center_right' | 'center_villain'

export type TablePlayerCard = {
  artifact?: boolean
  card_name?: string
  dreamwolf?: boolean
  mark?: string
  player_name?: string
  position?: CardPosition
  role?: string
  selectable_card?: boolean
  selectable_mark?: boolean
  selected?: boolean
  shield?: boolean
  team?: string
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

export type ActualSceneType = {
  scene_number: number
  scene_title: string
}

export type InteractionType = {
  answer_options?: string[]
  artifacted_cards?: CardPosition[]
  dreamwolf?: CardPosition[]
  masons?: CardPosition[]
  new_role_id?: number
  obligatory?: boolean
  private_message?: string[]
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
  werewolves?: CardPosition[]
}

export type NarrationType = keyof typeof narration_text

export type MessagesType = keyof typeof messages_text

export type IdentifierType = keyof typeof identifier

export type WsJsonMessage = {
  actual_scene?: ActualSceneType
  center_cards?: CenterCard[]
  day_mode?: boolean
  errors?: string[]
  interaction?: InteractionType
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
  stage?: string
  success?: boolean
  title?: string
  token?: string
  type?: string
  update?: boolean
}
