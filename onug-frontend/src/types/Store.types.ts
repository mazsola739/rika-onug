export type SendJsonMessageType<T> = (jsonMessage: T, keep?: boolean) => void

export type WsJsonMessage = {
  path?: string
  errors?: string[]
  success?: boolean

  type?: string
  room_id?: string
  stage?: string
  title?: string
  message?: string[]
  votes?: Record<string, number[]>
  players?: PlayersType[]

  selected_cards?: number[]
  selected_expansions?: string[]

  player_name?: string
  player_number?: number
  player_original_id?: number
  player_card_id?: number
  player_role?: string
  player_role_id?: number
  player_team?: string
  player_mark?: string
  player_history?: unknown // TODO type: swapped cards, viewed cards, etc...

  actual_scene?: {
    scene_number: number
    scene_start_time: number
    scene_title: string
    scene_end_time: number
    remaining_time: number
  }

  board?: {
    players?: PlayersType[]
    gamePlayBoardCards?: GamePlayBoardCardType[]
    gameTableBoardCards?: GameTableBoardCardType[]
  }

  narration?: string[]
  interaction?: {
    title?: string
    private_message?: string[]
    new_role_id?: number

    player_name?: string
    player_number?: number
    player_original_id?: number
    player_card_id?: number
    player_role?: string
    player_role_id?: number
    player_team?: string
    player_mark?: string

    selectable_card_limit?: { player: number; center: number }
    selectable_mark_limit?: { mark: number }
    selectable_cards?: string[]
    selectable_marks?: string[]
    shielded_cards: string[]
    artifacted_cards?: string[]
    show_cards?: Record<string, number>[]
    show_marks?: Record<string, string>[]
    
    //unique informations
    answer_options?: string[]

    mark_of_vampire?: string[]
    mark_of_fear?: string[]
    mark_of_bat?: string[]
    mark_of_disease?: string[]
    mark_of_love?: string[]
    mark_of_traitor?: string[]
    mark_of_clarity?: string[]
    mark_of_assassin?: string[]

    shield?: string[]
    artifact?: string[]

    aliens?: string[]
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
  selectable_cards?: boolean
  selectable_marks?: boolean
  ready?: boolean
}

export type PlayersType = {
  player_name: string
  player_number?: string
  ready?: boolean  
  voted?: boolean
}

export type GameTableBoardCardType = {
  position: string
  ready: boolean
  card: { id: number }
}

export type GamePlayBoardCardType = {
  position: string
  card: { 
    id: number,
    cardId: number,
    mark: string,
    selectable_cards?: boolean
    selectable_marks?: boolean
    shield?: boolean
    artifact?: boolean
  }
}

export type PlayerType = {
  player_name: string
  player_number: number
  player_card_id: number
  player_original_id: number
  player_role: string
  player_role_id: number
  player_team: string
  player_mark: string
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

export type PlayerPositionProperties = {
  position: string
  ready?: boolean
  selectable_cards?: boolean
  selectable_marks?: boolean
  id?: number
  cardId?: number
  mark?: string

  shield?: boolean
  artifact?: boolean
}

export type CenterPositionProperties = {
  position: string
  selectable_cards?: boolean
  id?: number
}
