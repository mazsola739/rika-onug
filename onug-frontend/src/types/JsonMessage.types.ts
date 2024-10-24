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

export type InteractionType = {
  private_message?: string[],
  shielded_cards?: [],
  artifacted_cards?: [],
  show_cards?: [],
  show_marks?: [],
  selectable_cards?: string[],
  selectable_card_limit?: {
      player?: number,
      center?: number
  },
  player?: PlayerType
}

export type SendJsonMessageType<T> = (jsonMessage: T, keep?: boolean) => void

export type WsJsonMessage = {
  type: string,
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
  narration?: string[]


  votes?: Record<string, number[]>

  actual_scene?: ActualSceneType
  
  interaction?: InteractionType
}
