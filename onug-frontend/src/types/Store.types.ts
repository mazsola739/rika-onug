import { CardType } from './Json.types'

export type SendJsonMessageType<T> = (jsonMessage: T, keep?: boolean) => void

export type WsJsonMessage = {
  path?: string
  type?: string
  message?: string
  errors?: string[]
  room_id?: string
  stage?: string
  player_name?: string
  player_card_id?: number
  player_number?: number
  board?: {
    players?: PlayersType[]
    gamePlayBoardCards?: GamePlayBoardCardType[]
    gameTableBoardCards?: GameTableBoardCardType[]
  }
  selected_cards?: number[]
  success?: boolean
  actual_scene?: {
    scene_number: number
    scene_start_time: number
    scene_title: string
    narration?: string[]
  }
}

export type RoomType = {
  room_id: string
  room_name: string
  selectedCards: number[]
  players: string[]
}

export type PositionType = {
  position: string
  id?: number
  artifact?: boolean
  shield?: boolean
  mark?: string
  selectable?: boolean
  ready?: boolean
}

export type PlayersType = {
  player_name: string
  player_number: string
  ready: boolean
}

export type GameTableBoardCardType = {
  position: string
  ready: boolean
  card: { id: number }
}

export type GamePlayBoardCardType = {
  position: string
  card: { id: number; artifact: boolean; shield: boolean; selectable: boolean }
}

export type PlayerType = {
  player_name: string
  player_number: number
  player_card_id: number
  player_card: CardType
}

export type PositionKeys =
  | 'center_left'
  | 'center_middle'
  | 'center_right'
  | 'center_wolf'
  | 'center_villain'
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

export type PositionProperties = {
  position: string
  id?: number
  artifact?: boolean
  shield?: boolean
  ready?: boolean
}
