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
  actions: string[]
  action_log: string[]
  players: string[]
  turn: number
  closed: boolean
}

export type RoleActionType = {
  text: string
  time: number
  image: string
}

export type RoleActionStoreType = {
  generateActions(): RoleActionType[]
}

export type RepeatroleType = {
  name: string
  isExist: boolean
  specialCondition?: () => boolean
}

export type PlayersType = {
  player_name: string
  player_number: number
  ready: boolean
  card: {
    id: number
  }
}
