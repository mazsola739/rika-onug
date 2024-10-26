export type PlayersType = {
  player_name: string
  player_number?: string
  ready?: boolean  
  voted?: boolean
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

type PlayerPosition = 'player_1' | 'player_2' | 'player_3' | 'player_4' | 'player_5' | 'player_6' | 'player_7' | 'player_8' | 'player_9' | 'player_10' | 'player_11' | 'player_12'

export type InteractionType = {
  title?: string
  private_message?: string[],
  shielded_cards?: string[],
  artifacted_cards?: string[],
  show_cards?: Record<PlayerPosition, number>[],
  show_marks?: Record<PlayerPosition, string>[],
  selectable_cards?: string[],
  selectable_card_limit?: {
    player: number,
    center: number
  },
  selectable_mark_limit?: {
    mark: number
},
  player?: PlayerType

  new_role_id?: number

  answer_options?: string[]
}

export type SendJsonMessageType<T> = (jsonMessage: T, keep?: boolean) => void

export type WsJsonMessage = {
  type?: string,
  update?: boolean,
  message?: string,
  path?: string
  success?: boolean
  errors?: string[]
  token?: string

  room_id?: string
  stage?: string

  selected_cards?: number[]
  selected_expansions?: string[]

  players?: PlayersType[]
  player?: PlayerType

  title?: string

  votes?: Record<string, number[]>

  actual_scene?: ActualSceneType
  
  interaction?: InteractionType
}
