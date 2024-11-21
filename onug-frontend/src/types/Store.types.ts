import * as messages_text from 'constant/messages'
import * as identifier from 'constant/narrations/identifier'
import { CardPosition } from './JsonMessage.types'

export type RoomType = {
  room_id: string
  room_name: string
  selectedCards: number[]
  players: string[]
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
  selected_card?: boolean
  selected_mark?: boolean
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
  selected_card?: boolean
  team?: string
}

export type MessagesType = keyof typeof messages_text

export type IdentifierType = keyof typeof identifier
