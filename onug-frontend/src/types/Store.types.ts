export type SendJsonMessageType<T> = (jsonMessage: T, keep?: boolean) => void

export type WsJsonMessage = {
  path?: string
  type?: string
  message?: string
  errors?: string[]
  room_id?: string
  stage?: string
  title?: string
  player_name?: string
  player_original_id?: number
  player_card_id?: number
  player_role?: string
  player_role_id?: number
  player_team?: string
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
  selectable_cards?: string[]

  selectable_marks?: string[]
  selectable_card_limit?: { player: number; center: number; mark: number }
  shielded_cards?: string[]
  show_cards?: Record<string, number>[]
  viewed_cards?: string[]
  new_role_id?: number
  aliens?: string[]
  artifact?: string[]
  assassin?: string[]
  awesome?: string[]
  babyalien?: string[]
  bat?: string[]
  blob?: string[]
  bulb?: string[]
  clarity?: string[]
  claw?: string[]
  cow?: string[]
  diseased?: string[]
  dreamwolf?: string[]
  dress?: string[]
  drunk?: string[]
  empath?: string[]
  evil?: string[]
  family?: string[]
  fang?: string[]
  fear?: string[]
  friend?: string[]
  jest?: string[]
  like?: string[]
  lovers?: string[]
  masons?: string[]
  mad?: string[]
  mortician?: string[]
  nice?: string[]
  pretty?: string[]
  seer?: string[]
  select?: string[]
  shield?: string[]
  smell?: string[]
  villains?: string[]
  sus?: string[]
  swap?: string[]
  tanner?: string[]
  tapped_player?: string[]
  target?: string[]
  traitor?: string[]
  trophy?: string[]
  ufo?: string[]
  vampires?: string[]
  werewolves?: string[]
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
  card: {
    id: number
    spy: boolean
    selectable: boolean
    aliens: boolean
    artifact: boolean
    assassin: boolean
    awesome: boolean
    babyalien: boolean
    bat: boolean
    blob: boolean
    bulb: boolean
    clarity: boolean
    claw: boolean
    cow: boolean
    diseased: boolean
    dreamwolf: boolean
    dress: boolean
    drunk: boolean
    empath: boolean
    evil: boolean
    family: boolean
    fang: boolean
    fear: boolean
    friend: boolean
    jest: boolean
    like: boolean
    lovers: boolean
    mason: boolean
    mad: boolean
    mortician: boolean
    nice: boolean
    pretty: boolean
    seer: boolean
    select: boolean
    shield: boolean
    smell: boolean
    villains: boolean
    sus: boolean
    swap: boolean
    tanner: boolean
    tap: boolean
    target: boolean
    traitor: boolean
    trophy: boolean
    ufo: boolean
    vampires: boolean
    werewolves: boolean
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
  selectable: boolean
  id?: number
  spy?: boolean
  ready?: boolean
  aliens?: boolean
  artifact?: boolean
  assassin?: boolean
  awesome?: boolean
  babyalien?: boolean
  bat?: boolean
  blob?: boolean
  bulb?: boolean
  clarity?: boolean
  claw?: boolean
  cow?: boolean
  diseased?: boolean
  dreamwolf?: boolean
  dress?: boolean
  drunk?: boolean
  empath?: boolean
  evil?: boolean
  family?: boolean
  fang?: boolean
  fear?: boolean
  friend?: boolean
  jest?: boolean
  like?: boolean
  lovers?: boolean
  masons?: boolean
  mad?: boolean
  mortician?: boolean
  nice?: boolean
  pretty?: boolean
  seer?: boolean
  select?: boolean
  shield?: boolean
  smell?: boolean
  villains?: boolean
  sus?: boolean
  swap?: boolean
  tanner?: boolean
  tap?: boolean
  target?: boolean
  traitor?: boolean
  trophy?: boolean
  ufo?: boolean
  vampires?: boolean
  werewolves?: boolean
}
