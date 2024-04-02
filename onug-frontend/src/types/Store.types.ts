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
  icon?: string
  votes?: string[]

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

  actual_scene?: {
    scene_number: number
    scene_start_time: number
    scene_title: string
    scene_end_time: number
  }

  board?: {
    players?: PlayersType[]
    gamePlayBoardCards?: GamePlayBoardCardType[]
    gameTableBoardCards?: GameTableBoardCardType[]
  }

  narration?: string[]
  interaction?: {
    title?: string
    icon?: string
    private_message?: string[]


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
    viewed_cards?: string[]
    viewed_marks?: string[]
    swapped_cards?: string[]
    swapped_marks?: string[]
    flipped_cards?: string[]
    new_artifact_card?: string[]
    new_shield_card?: string[]
    mark_of_vampire?: string[]
    mark_of_fear?: string[]
    mark_of_bat?: string[]
    mark_of_disease?: string[]
    mark_of_love?: string[]
    mark_of_traitor?: string[]
    mark_of_clarity?: string[]
    mark_of_assassin?: string[]

    aliens?: string[]
    zerb?: string[]
    groob?: string[]
    zerbgroob?: string[]
    alien_neighbor?: []
    vampires?: string[]
    new_vampire?: string[]
    werewolves?: string[]
    dreamwolf?: string[] 
    claw?: string[]
    villains?: string[]
    villain_neighbor?: []
    evilhand?: string[]    
    assassin?: string[]
    tanner?: string[]
    auraseer?: string[]
    seers?: string[]
    blob?: string[]
    family?: string[]
    madscientist?: string[]
    lovers?: string[]
    masons?: string[]
    tapped?: string[]
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
  player_number: string
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
    id: number
    mark: string
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
  selectable_cards: boolean
  selectable_marks?: boolean
  id?: number
  mark?: string
}

export type CenterPositionProperties = {
  position: string
  selectable_cards: boolean
  id?: number
}
