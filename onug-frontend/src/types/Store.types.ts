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
  board?: { players: PlayersType[] }
  selected_cards?: number[]
  success?: boolean
}

export type RoomType = {
  room_id: string
  room_name: string
  selectedCards: number[]
  players: string[]
}

export type PlayersType = {
  player_name: string
  player_number: number
  ready: boolean
  card: {
    id: number
  }
}

export type PlayerType = {
  player_name: string
  player_number: number
  player_card_id: number
  player_card: CardType
}
