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

export type SendJsonMessageType<T> = (jsonMessage: T, keep?: boolean) => void
