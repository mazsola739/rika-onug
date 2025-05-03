import * as messages_text from 'constants/messages'
import { CardPositionType } from './JsonMessage.types'

export type GuessTokenType = {
  expansion: string
  id: number
  image: string
}

export type MessagesType = keyof typeof messages_text

export type RoomType = {
  room_id: string
  room_name: string
}

export type PresetType = {
  description: string
  cards: string
}

export type RoleKeys = 'werewolves' | 'dreamwolf' | 'masons' | 'aliens' | 'cow' | 'evilometer' | 'groobzerb' | 'vampires' | 'part_of_blob'

export type TableCenterCard = {
  card_name?: string
  position?: CardPositionType
  role?: string
  selectable_card?: boolean
  selected_card?: boolean
  team?: string
}

export type TablePlayerCard = {
  aliens?: boolean
  artifact?: boolean
  apprenticeassassins?: boolean
  assassins?: boolean
  card_name?: string
  cow?: boolean
  current?: boolean
  dreamwolf?: boolean
  evilometer?: boolean
  groobzerb?: boolean
  lovers?: boolean
  madscientist?: boolean
  mark?: string
  masons?: boolean
  part_of_blob?: boolean
  part_of_family?: boolean
  player_name?: string
  position?: CardPositionType
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
  witness?: boolean
}
