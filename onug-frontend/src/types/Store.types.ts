import { CardType } from './Card.types'

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
  board?: { players: PlayersType[]; boardCards: BoardCardType[] }
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

export type PlayersType = {
  player_name: string
  player_number: string
  ready: boolean
}

export type BoardCardType = {
  position: string
  card: { id: number; artifact: boolean; shield: boolean }
}

export type PlayerType = {
  player_name: string
  player_number: number
  player_card_id: number
  player_card: CardType
}
